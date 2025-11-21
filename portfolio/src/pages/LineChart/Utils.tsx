import {LineChartData} from 'pages/LineChart/Data';
import {LineChartPoint} from 'pages/LineChart/Model';

/** Функции по преобразованию исходных данных для отрисовки графика.
 * Создаем объект с ключами:
 * formatDailyData - массив точек в формате для Recharts,
 * variationKeys - массив ключей,
 * variationNameByKey - объект, представляющий мэппинг id и name,
 **/


/** по ДНЯМ.**/
export const formatDailyLineChartData = (chart: typeof LineChartData) => {
    const variationNameByKey: Record<string, string> = {};
    const variationKeys: string[] = [];

    //создаем массив ключей и мэппинг id-name
    chart.variations.forEach((variation) => {
        const key = variation.id !== undefined ? variation.id.toString() : '0'; //преобразовываем в строчку, тк ключи в visits и conversions в формате строки
        variationKeys.push(key);
        variationNameByKey[key] = variation.name;
    })

    //преобразовываем в формат для Recharts по дням
    const formattedData: LineChartPoint[] = chart.data.map((item) => {
        const row: LineChartPoint = {date: item.date};
        //находим по ключам и добавляем новые значения
        variationKeys.forEach((key) => {
            // @ts-ignore
            const visit = item.visits[key];
            // @ts-ignore
            const conversion = item.conversions[key];

            if (visit === undefined || conversion === undefined) {
                row[key] = null;
            } else if (visit === 0) {
                row[key] = 0;
            } else {
                row[key] = ((conversion / visit) * 100).toFixed(2);
            }
        });

        return row;
    })

    return {formattedData, variationKeys, variationNameByKey};
};

/** по НЕДЕЛЯМ.**/
export const formatWeeklyLineChartData = (chart: typeof LineChartData) => {
    const variationNameByKey: Record<string, string> = {};
    const variationKeys: string[] = [];
    const weeklyData: Record<string, any> = {};

    chart.variations.forEach((variation) => {
        const key = variation.id !== undefined ? variation.id.toString() : '0';
        variationKeys.push(key);
        variationNameByKey[key] = variation.name;
    })

    chart.data.forEach(day => {
        const date = new Date(day.date);

        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const week = Math.ceil((((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000) + new Date(year, 0, 1).getDay() + 1) / 7);
        const weekKey = `${year}-${month}-W${week}`;

        if (!weeklyData[weekKey]) {
            weeklyData[weekKey] = {visits: {}, conversions: {}};
        }

        variationKeys.forEach(key => {
            // @ts-ignore
            const v = day.visits[key];
            // @ts-ignore
            const c = day.conversions[key];

            weeklyData[weekKey].visits[key] = (weeklyData[weekKey].visits[key] || 0) + (v ?? 0);
            weeklyData[weekKey].conversions[key] = (weeklyData[weekKey].conversions[key] || 0) + (c ?? 0);
        });
    });

    const formattedData = Object.entries(weeklyData).map(([weekKey, data]) => {
        const row: any = {date: weekKey};

        variationKeys.forEach(key => {
            const visits = data.visits[key];
            const conv = data.conversions[key];

            if (visits === 0) {
                return row[key] = 0;
            } else {
                row[key] = +((conv / visits) * 100).toFixed(2);
            }
        });

        return row;
    });

    return {formattedData, variationKeys, variationNameByKey};
};
