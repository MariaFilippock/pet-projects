import React, {useState} from 'react';
import {LineChartData} from './Data';
import {LineChartPoint} from 'pages/LineChart/Model';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';
import CustomTooltip from 'pages/LineChart/CustomTooltip';
import {Select} from 'antd';
import {Text} from './const';
import styles from './LineChartReact.module.scss';

/** Функция по преобразованию исходных данных для отрисовки графика.
 * Создаем объект с ключами:
 * formattedData - массив точек в формате для Recharts,
 * variationKeys - массив ключей,
 * variationNameByKey - объект, представляющий мэппинг id и name,
 **/
const formatLineChartData = (chart: typeof LineChartData) => {
    const variationNameByKey: Record<string, string> = {};
    const variationKeys: string[] = [];
    const linesConfig: Record<string, string> = {
        '0': '#8884d8',
        '10001': '#82ca9d',
        '10002': '#3f69bc',
        '10003': '#ecbf12'
    };

    //создаем массив ключей и мэппинг id-name
    chart.variations.forEach((variation) => {
        const key = variation.id !== undefined ? variation.id.toString() : '0'; //преобразовываем в строчку, тк ключи в visits и conversions в формате строки
        variationKeys.push(key);
        variationNameByKey[key] = variation.name;
    })

    //преобразовываем в формат для Recharts
    const formattedData: LineChartPoint[] = chart.data.map((item) => {
        const row: LineChartPoint = {date: item.date};
        //находим по ключам и добавляем новые значения
        variationKeys.forEach((key) => {
            // @ts-ignore
            const visit = item.visits[key];
            // @ts-ignore
            const conversion = item.conversions[key];

            if (visit === undefined || conversion === undefined) {
                row[key] = null; //при отсутствии данных для построения графика ставим null, а не 0, иначе упадет до оси X вместо плавного перехода из одной точки в другую
            } else if (visit === 0) {
                row[key] = 0;
            } else {
                row[key] = ((conversion / visit) * 100).toFixed(2);
            }
        });

        return row;
    })

    return {formattedData, variationKeys, variationNameByKey, linesConfig};
};

const ALL_VARIATIONS_ID = Text.allVariations.value;

const LineChartReact = () => {
    const {formattedData, variationKeys, variationNameByKey, linesConfig} = formatLineChartData(LineChartData);
    const [selectedVariations, setSelectedVariations] = useState<string[]>([ALL_VARIATIONS_ID]);
    const realSelected = selectedVariations[0] === ALL_VARIATIONS_ID ? variationKeys : selectedVariations;

    const handleSelectVariations = (values: string[]) => {
        if (values.length === 0) {
            return
        }

        if (values.length === variationKeys.length || values[values.length - 1] === ALL_VARIATIONS_ID) {
            setSelectedVariations([ALL_VARIATIONS_ID]);
        } else if (values[0] === ALL_VARIATIONS_ID) {
            const filteredVariations = values.filter((value) => value !== ALL_VARIATIONS_ID)
            setSelectedVariations(filteredVariations);
        } else {
            setSelectedVariations(values);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <Select
                mode="multiple"
                className={styles.variationsSelector}
                defaultValue={[ALL_VARIATIONS_ID]}
                options={[
                    Text.allVariations,
                    ...variationKeys.map((key) => ({
                        value: key,
                        label: variationNameByKey[key],
                    }))
                ]}
                onChange={handleSelectVariations}
                value={selectedVariations}
            />

            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart className={styles.lineChart} data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis width="auto" tickFormatter={value => `${value}%`}/>
                        <Tooltip content={<CustomTooltip/>}/>

                        {realSelected.map((key) => (
                            <Line key={key} dataKey={key} name={variationNameByKey[key]} type="monotone" dot={false}
                                  stroke={linesConfig[key]}/>
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export default LineChartReact;

