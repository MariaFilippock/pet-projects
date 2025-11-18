import React from 'react';
import {IoColorPaletteOutline, IoChevronDownOutline, IoFilmOutline, IoVideocamOutline} from 'react-icons/io5';

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST'; // для списка фильмов в выпадающем списке
export const SET_MOVIE = 'SET_MOVIE'; // получение данных по фильму
export const DROPDOWN_QUANTITY_OF_MOVIES = 10; // количество фильмов, отображаемых в выпадающем списке поиска
export const SET_MOVIE_FILTER = 'SET_MOVIE_FILTER'; // установка фильтра по типам для списка фильмов
export const SET_MOVIES = 'SET_MOVIES'; // установка списка фильмов с кол-вом страниц и выбранной страницей
export const TOGGLE_FAVORITE_MOVIE = 'TOGGLE_FAVORITE_MOVIE'; // добавление фильма в список избранного
export const SET_START_MOVIE_LIST = 'SET_START_MOVIE_LIST'; // переключение на стартовую страницу со списком топ-250 фильмов
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const PERSON_PROFESSION_TYPE = {
    actor: 'actor',
}

export const MAX_PAGES_COUNT = 8; // максимально допустимое количество страниц в пагинации при отображении
export const CORNER_PAGE_COUNT = 5; // номер крайней страницы, при нажатии на которую должны увидеть следующте страницы для нажатия
export const ELLIPSIS = '...';
export const EVERY_YEAR = 'all';
export const LIMIT = 7; // количество фильмов в списке на странице
export const MAX_ELEMENT_COUNT = 5; // максимальное количество элементов в списке в карточке фильма



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

export const ROUTES = {
    FILMOPOISK: '/filmopoisk_react',
    MOVIE_CARD: '/filmopoisk_react/movie_card',
    START_LIST: '/filmopoisk_react/start_movie_list',
    FILTERED_LIST: '/filmopoisk_react/filtered_movie_list',
};

export const buttonType = {
        visibilityIcon: () => <IoChevronDownOutline/>,

    };
