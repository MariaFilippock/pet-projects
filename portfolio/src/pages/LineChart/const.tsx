import React from 'react';
import {IoMoonOutline, IoSunnyOutline} from 'react-icons/io5';
import {EChartTheme, IThemeOption} from 'pages/LineChart/Model';

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
    ]
};

export const ThemeList: IThemeOption[] = [
    {
        value: EChartTheme.Light,
        label: 'Light theme',
        background: '#fff',
        icon: <IoSunnyOutline/>,
    },
    {
        value: EChartTheme.Dark,
        label: 'Dark theme',
        background: '#232222',
        icon: <IoMoonOutline/>,
    }
]