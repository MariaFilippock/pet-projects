import React from 'react';
import {IoCalendarOutline, IoDownloadOutline, IoTrophyOutline} from 'react-icons/io5';

//иконки
export const buttonType = {
    trophyIcon: () => <IoTrophyOutline/>,
    calendarIcon: () => <IoCalendarOutline/>,
    downloadIcon: () => <IoDownloadOutline/>,
};

export const Text = {
    allVariations: {
        value: 'all',
        label: 'All variations selected'
    },
    periods: [
        {
            value: 'Day',
            label: 'Day',
        },
        {
            value: 'Week',
            label: 'Week',
        }
    ],
    lineType: [
        {
            value: 'linear',
            label: 'Linear',
        },
        {
            value: 'monotone',
            label: 'Smooth',
        },
        {
            value: 'area',
            label: 'Area',
        }
    ],
};

