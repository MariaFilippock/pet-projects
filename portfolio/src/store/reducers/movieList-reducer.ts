import {AnyAction} from 'redux';
import {SET_IS_LOADING, SET_MOVIE_FILTER, SET_MOVIES} from 'pages/FilmopoiskReact/const';
import {ThunkAction} from 'redux-thunk';
import {IAppState} from '../index';
import {Dispatch} from 'redux';
import {ApiClient} from 'pages/FilmopoiskReact/api/apiFilmopoisk';
import {IMovie, IMovieListState, ISideBarFilter} from 'pages/FilmopoiskReact/Models';

export const setMovieFilterAC = (filters: ISideBarFilter) => ({
    type: SET_MOVIE_FILTER,
    filters,
});

export const setMoviesAC = (moviesList: IMovie[], pages: number, chosenPage: number) => ({
    type: SET_MOVIES,
    moviesList,
    pages: pages ?? 1,
    chosenPage: chosenPage ?? 1,
});

export const setIsLoadingAC = (isLoading: boolean) => ({type: SET_IS_LOADING, isLoading});

export const setMovieFilter = (
    filters: ISideBarFilter,
    page: number
): ThunkAction<any, IAppState, unknown, any> => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setIsLoadingAC(true));

            const movieListResponse = await ApiClient.getMovieListByFilter(
                filters,
                page
            );

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
        } finally {
            dispatch(setIsLoadingAC(false));
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
    isLoading: false,
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
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading,
            }
        }
        default:
            return state;
    }
};
