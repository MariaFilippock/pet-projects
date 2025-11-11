import {IMovie, IStartMoviesListState} from 'pages/FilmopoiskReact/Models';
import {AnyAction, Dispatch} from 'redux';
import {SET_START_MOVIE_LIST} from 'pages/FilmopoiskReact/const';
import {ThunkAction} from 'redux-thunk';
import {IAppState} from 'store/index';
import {setMovieFilterAC} from 'store/reducers/movieList-reducer';
import {ApiClient} from 'pages/FilmopoiskReact/api/apiFilmopoisk';

const initialState: IStartMoviesListState = {
    startMoviesList: [],
    pagination: {
        chosenPage: 1,
        pages: 1,
    },
};

export const setStartMoviesListAC = (
    startMoviesList: IMovie[],
    pages: number,
    chosenPage: number) => ({
    type: SET_START_MOVIE_LIST,
    startMoviesList,
    pages: pages ?? 1,
    chosenPage: chosenPage ?? 1,
});

export const setStartMovieList = (page: number): ThunkAction<any, IAppState, unknown, any> => {
    return async (dispatch: Dispatch) => {
        try {
            const startMovieListResponse = await ApiClient.getTop250MoviesList(page);
            dispatch(setStartMoviesListAC(startMovieListResponse.docs, startMovieListResponse.pages, page));
            dispatch(setMovieFilterAC({
                genre: '',
                type: '',
                year: 'all'
            }));
        } catch (error) {
            console.error('Ошибка при поиске ТОП-250 фильмов', error);
        }
    }
};

export const startMovieListReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_START_MOVIE_LIST: {
            return {
                ...state,
                startMoviesList: action.startMoviesList,
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
}