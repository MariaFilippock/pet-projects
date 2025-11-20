//общая структура данных графика
export interface ILineChartData {
    variations: IVariation[];
    data: IDataPerDay[];
}

//базовая структура каждого варианта, по которому отрисовывается кривая на графике
export interface IVariation {
    id?: number;
    name: string;
}

/**Данные по дням
 * @param date - дата в формате 'YYYY-MM-DD'
 * @param visits - кол-во посещений в виде объекта с ключами: '0', '10001', '10002', '10003' и числовыми значениями
 * @param conversions - конверсия в виде объекта с ключами: '0', '10001', '10002', '10003' и числовыми значениями
**/
export interface IDataPerDay {
    date: string;
    visits: Record<string, number>;
    conversions: Record<string, number>;
}

/** тип точки для отрисовки данных по дням с помощью Recharts
* {date: 'YYYY-MM-DD',
* '0': (conversions / visits) * 100,
* '10002': (conversions / visits) * 100,
* '10003': (conversions / visits) * 100 }
 * пример на выходе   { date: "2025-01-01", "0": 8.2, "10001": null,"10002": 12.3,"10003": 14.1},
 **/

export type LineChartPoint = {
  date: string;
  [variationKey: string]: number | null | string;
};

export interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        name?: string;
        value?: number;
        color?: string;
        dataKey?: string;
    }[];
    label?: string | number;
}
