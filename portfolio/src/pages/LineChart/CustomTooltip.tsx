import React from 'react';
import type {TooltipProps} from "recharts/types/component/Tooltip";
import {CustomTooltipProps} from 'pages/LineChart/Model';
import styles from './CustomTooltip.module.scss';
import {buttonType} from 'pages/LineChart/const';


const CustomTooltip = (props: TooltipProps<any, any> & CustomTooltipProps) => {
    const {active, payload, label} = props;

    if (!active || !payload) {
        return null
    }

    const sortedData = [...payload].sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    return (
        <div className={styles.tooltipContainer}>
            <div className={styles.labelTitle}>
                <buttonType.calendarIcon/>
                {label}</div>
            <div className={styles.tooltipWrapper}>
                {sortedData.map((item, index) => (
                    <div className={styles.tooltipItem} key={item.dataKey}>

                        <div className={styles.variation}>
                            <div className={styles.colorCircle} style={{backgroundColor: item.color}}/>
                            <span>{item.name}</span>
                            {index === 0 && <span><buttonType.trophyIcon/></span>}
                        </div>

                        <div key={item.dataKey}>{item.value}%</div>

                    </div>
                ))}
            </div>
        </div>


    )
};

export default CustomTooltip;
