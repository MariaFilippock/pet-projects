import React from 'react';
import {LineChartData} from './Data';
import {LineChartPoint} from 'pages/LineChart/Model';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts';
import CustomTooltip from 'pages/LineChart/CustomTooltip';

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

const LineChartReact = () => {
    const {formattedData, variationKeys, variationNameByKey, linesConfig} = formatLineChartData(LineChartData);

    return (
        <div style={{display:'flex', justifyItems: 'center', flex: '1', width: "100%", height: "70vh", maxWidth: "1100px", margin: "100px 50px", fontSize: "14px"}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart style={{minWidth: '100%'}}
                           data={formattedData}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis width="auto" tickFormatter={value => `${value}%`}/>
                    <Tooltip content={<CustomTooltip/>} />

                    {variationKeys.map((key) => (
                        <Line key={key} dataKey={key} name={variationNameByKey[key]} type="monotone" dot={false} stroke={linesConfig[key]}/>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};


export default LineChartReact;

