import React, {useRef, useState} from 'react';
import {LineChartData} from './Data';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart} from 'recharts';
import CustomTooltip from 'pages/LineChart/CustomTooltip';
import {Select} from 'antd';
import {Text, ThemeList} from './const';
import styles from './LineChartReact.module.scss';
import {exportChartToPNG, formatDailyLineChartData, formatWeeklyLineChartData} from 'pages/LineChart/Utils';
import {IoDownloadOutline, IoMoonOutline, IoSunnyOutline} from 'react-icons/io5';
import {IThemeOption} from 'pages/LineChart/Model';

const linesConfig: Record<string, string> = {
    '0': '#8884d8',
    '10001': '#82ca9d',
    '10002': '#3f69bc',
    '10003': '#ecbf12'
};

const ALL_VARIATIONS_ID = Text.allVariations.value;



const LineChartReact = () => {
    const [chartTheme, setChartTheme] = useState<IThemeOption>(ThemeList[0]);
    const [lineType, setLineType] = useState<'monotone' | 'area' | 'linear'>('linear');
    const [selectedVariations, setSelectedVariations] = useState<string[]>([ALL_VARIATIONS_ID]);
    const [selectedPeriod, setSelectedPeriod] = useState<'Day' | 'Week'>('Day');
    const {
        formattedData,
        variationKeys,
        variationNameByKey
    } = selectedPeriod === 'Day' ? formatDailyLineChartData(LineChartData) : formatWeeklyLineChartData(LineChartData);

    const realSelected = selectedVariations[0] === ALL_VARIATIONS_ID ? variationKeys : selectedVariations;
    const chartRef = useRef<SVGSVGElement | null>(null);

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

    const handleExportToPNG = () => {
        exportChartToPNG(chartRef.current);
    };

    const handleThemeChange = (_value: string, selectedOption?: IThemeOption | IThemeOption[]) => {
        if (selectedOption && !Array.isArray(selectedOption)) {
            setChartTheme(selectedOption);
        }
    }

    return (
        <div className={styles.mainContainer}>

            <div className={styles.headerActions}>
                <div className={styles.selectorsContainer}>
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
                    <Select
                        className={styles.periodsSelector}
                        options={Text.periods}
                        onChange={setSelectedPeriod}
                        value={selectedPeriod}
                    />
                </div>
                <div className={styles.rightGroupActions}>
                    <Select
                        className={styles.lineTypeSelector}
                        onChange={setLineType}
                        options={Text.lineType}
                        value={lineType}
                    />

                    <button className={styles.downloadBtn} onClick={handleExportToPNG}>
                        <IoDownloadOutline/>
                    </button>

                    <Select
                        className={styles.themeSelector}
                        onChange={handleThemeChange}
                        options={ThemeList}
                        optionRender={(option) => (
                            <div className={styles.themeOption}>
                                {option.data.icon}
                                <span>{option.data.label}</span>
                            </div>
                        )}
                        value={chartTheme.value}
                    />

                </div>
            </div>

            <h3 style={{textAlign: "center", marginBottom: 12}}>
                Conversion Rate by Variations
            </h3>
            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    {lineType === 'area' ? (

                            <AreaChart key={realSelected.join('-') + lineType} style={{backgroundColor: chartTheme.background}} className={styles.lineChart} ref={chartRef} data={formattedData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis width="auto" tickFormatter={value => `${value}%`}/>
                                <Tooltip content={<CustomTooltip/>}/>

                                {realSelected.map((key) =>
                                    <Area key={key} dataKey={key} name={variationNameByKey[key]} stroke={linesConfig[key]}
                                          fill={linesConfig[key] + "33"} isAnimationActive={true}/>)}
                            </AreaChart>)
                        : (
                            <LineChart style={{backgroundColor: chartTheme.background}} key={realSelected.join('-') + lineType} className={styles.lineChart} ref={chartRef}
                                       data={formattedData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis width="auto" tickFormatter={value => `${value}%`}/>
                                <Tooltip content={<CustomTooltip/>}/>
                                {realSelected.map((key) => (
                                    <Line key={key} dataKey={key} name={variationNameByKey[key]} type={lineType} dot={false}
                                          stroke={linesConfig[key]} isAnimationActive={true}/>)
                                )}
                            </LineChart>)

                    }
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export default LineChartReact;
