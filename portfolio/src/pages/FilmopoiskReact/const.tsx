import React from 'react';
import {IoColorPaletteOutline, IoFilmOutline, IoVideocamOutline} from 'react-icons/io5';

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST'; // для списка фильмов в выпадающем списке
export const SET_MOVIE = 'SET_MOVIE'; // получение данных по фильму
export const DROPDOWN_QUANTITY_OF_MOVIES = 10; // количество фильмов, отображаемых в выпадающем списке поиска
export const SET_MOVIE_FILTER = 'SET_MOVIE_FILTER'; // установка фильтра по типам для списка фильмов
export const SET_MOVIES = 'SET_MOVIES'; // установка списка фильмов с кол-вом страниц и выбранной страницей
export const TOGGLE_FAVORITE_MOVIE = 'TOGGLE_FAVORITE_MOVIE'; // добавление фильма в список избранного
export const SET_PAGE_TYPE = 'SET_PAGE_TYPE'; // определение типа страницы (список фильмов или карточка фильма и тд)

export const MAX_PAGES_COUNT = 8; // максимально допустимое количество страниц в пагинации при отображении
export const CORNER_PAGE_COUNT = 5; // номер крайней страницы, при нажатии на которую должны увидеть следующте страницы для нажатия
export const ELLIPSIS = '...';


const getYearsArray = () => {
    let arr = [];
    let nowYear = new Date().getFullYear();

    while (nowYear > 1990) {
        arr.push(nowYear.toString());
        nowYear--;
    }
    return arr;
};

export const Text = {
    GenresMap: {
        adventure: 'приключения',
        cartoons: 'мультфильм',
        fantasy: 'фантастика',
        criminal: 'криминал',
        thriller: 'триллер',
        detective: 'детектив',
        drama: 'драма',
        comedy: 'комедия',
        horror: 'ужасы',
        action: 'боевик',
        sport: 'спорт',
        shortFilm: 'короткометражка',
    } as const,

    FilmTypes: [
        {
            id: 'movie',
            text: ' фильмы',
            icon: () => <IoFilmOutline/>,
        },

        {
            id: 'tv-series',
            text: ' сериалы',
            icon: () => <IoVideocamOutline/>,
        },

        {
            id: 'cartoon',
            text: ' мультифильмы',
            icon: () => <IoColorPaletteOutline/>,
        },
    ],

    years: getYearsArray(),
};
