import {IMovie} from './movieCard-reducer';
import {AnyAction} from 'redux';
import {FilmList, SET_MOVIE_FILTER, SET_MOVIES} from '../../const';
import {ThunkAction} from 'redux-thunk';
import {IAppState} from '../index';
import {Dispatch} from 'redux';
import {moviesListAPI} from '../../api/apiFilmopoisk';
import {setPageTypeAC} from './pageType-reducer';

export interface IMovieListState {
    moviesList: IMovie[];
    sideBarFilter: ISideBarFilter;
    pagination: IPagination;
}

export interface IPagination {
    chosenPage: number;
    pages: number;
}

export interface ISideBarFilter {
    genre?: string;
    type?: string;
    year?: string;
}

export const setMovieFilterAC = (filters: ISideBarFilter) => ({
    type: SET_MOVIE_FILTER,
    filters,
});

export const setMoviesAC = (
    moviesList: IMovie[],
    pages: number,
    chosenPage: number
) => ({
    type: SET_MOVIES,
    moviesList,
    pages: pages ?? 1,
    chosenPage: chosenPage ?? 1,
});

export const setMovieFilter = (
    filters: ISideBarFilter,
    page: number
): ThunkAction<any, IAppState, unknown, any> => {
    return async (dispatch: Dispatch) => {
        try {
            //получаю с сервера данные со списком фильмов по фильтрам
            const movieListResponse = await moviesListAPI.getMovieListByFilter(
                filters,
                page
            );

            dispatch(setPageTypeAC(FilmList));
            dispatch(setMovieFilterAC(filters));
            dispatch(
                setMoviesAC(
                    movieListResponse.docs,
                    movieListResponse.pages,
                    movieListResponse.page
                )
            );
        } catch (error) {
            console.error('Ошибка при попытке фильтрации', error);
        }
    };
};

const initialState: IMovieListState = {
    moviesList: [],
    sideBarFilter: {
        genre: 'приключения',
        type: 'movie',
        year: 'all',
    },
    pagination: {
        chosenPage: 1,
        pages: 1,
    },
};

export const movieListReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_MOVIE_FILTER: {
            return {
                ...state,
                sideBarFilter: action.filters,
            };
        }
        case SET_MOVIES: {
            return {
                ...state,
                moviesList: action.moviesList,
                pagination: {
                    ...state.pagination,
                    pages: action.pages,
                    chosenPage: action.chosenPage,
                },
            };
        }
        default:
            return state;
    }
};
