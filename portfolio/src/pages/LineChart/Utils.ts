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
        const row: LineChartPoint = {
            date: item.date,
            timestamp: new Date(item.date).getTime()
        };

        //находим по ключам и добавляем новые значения
        variationKeys.forEach((key) => {
            const visit = (item as any).visits[key];
            const conversion = (item as any).conversions[key];

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
    });

    let startDate = new Date(chart.data[0].date); //Wed Jan 01 2025 02:00:00 GMT+0200 (Восточная Европа, стандартное время)
    let startKey = startDate.toISOString().split('T')[0]; //'2025-01-01'
    weeklyData[startKey] = {visits: {}, conversions: {}};

    chart.data.forEach(day => {
        const date = new Date(day.date);
        const diffDays = Math.floor((date.getTime() - startDate.getTime()) / 86400000);

        if (diffDays > 6) {
            //начинаем новую неделю
            startDate = date;
            startKey = startDate.toISOString().split('T')[0];
            weeklyData[startKey] = {visits: {}, conversions: {}};
        }

        variationKeys.forEach(key => {
            const v = (day as any).visits[key];
            const c = (day as any).conversions[key];

            weeklyData[startKey].visits[key] = (weeklyData[startKey].visits[key] || 0) + (v ?? 0);
            weeklyData[startKey].conversions[key] = (weeklyData[startKey].conversions[key] || 0) + (c ?? 0);
        });
    });

    const formattedData = Object.entries(weeklyData).map(([weekKey, data]) => {
        const start = new Date(weekKey);
        const timestamp = start.getTime();
        const row: LineChartPoint = {
            date: weekKey,
            timestamp
        };

        variationKeys.forEach(key => {
            const visits = data.visits[key];
            const conv = data.conversions[key];

            if (visits === 0) {
                return row[key] = 0;
            } else if (visits > 0) {
                row[key] = +((conv / visits) * 100).toFixed(2);
            } else {
                row[key] = null;
            }
        });

        return row;
    });

    return {formattedData, variationKeys, variationNameByKey};
};


/**
 * Экспорт стилей для картинки PNG
 */
function getAllCSS() {
    let css = "";
    for (const sheet of document.styleSheets) {
        try {
            for (const rule of sheet.cssRules) {
                css += rule.cssText;
            }
        } catch {
        }
    }
    return css;
}

/**
 * Функция по экспорту графика в PNG-формат.
 */
export const exportChartToPNG = (svgElement: SVGSVGElement | null) => {
    if (!svgElement) return;

    //добавляем стиль
    const styleTag = document.createElement('style');
    styleTag.textContent = getAllCSS();
    svgElement.prepend(styleTag);

    const svgData = new XMLSerializer().serializeToString(svgElement);

    styleTag.remove();

    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);


    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = "#ffffff"; // фон (можно изменить)
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        }

        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = pngUrl;
        link.click();

        URL.revokeObjectURL(url);
    };
    img.src = url;
};


