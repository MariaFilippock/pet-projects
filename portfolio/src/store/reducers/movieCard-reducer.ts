import {SET_MOVIE, TOGGLE_FAVORITE_MOVIE} from 'pages/FilmopoiskReact/const';
import {ThunkAction} from 'redux-thunk';
import {IAppState} from '../index';
import {AnyAction, Dispatch} from 'redux';
import {
    mapToLoadedMovie
} from './dropdownMovieList-reducer';
import {ApiClient} from 'pages/FilmopoiskReact/api/apiFilmopoisk';
import {setPageTypeAC} from './pageType-reducer';
import {IMovie, IMovieState} from 'pages/FilmopoiskReact/Models';

let initialState: IMovieState = {
    movie: null,
    favoritesMovieList: [],
};

export const movieCardReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_MOVIE: {
            return {
                ...state,
                movie: action.movie,
            };
        }
        case TOGGLE_FAVORITE_MOVIE: {
            const isAddedToFavoriteMovieList = state.favoritesMovieList.find(
                (favoriteMovie) => favoriteMovie.id === action.favoriteMovie.id
            );

            return {
                ...state,
                favoritesMovieList: isAddedToFavoriteMovieList
                    ? state.favoritesMovieList.filter(
                        (favMovie) => favMovie.id !== action.favoriteMovie.id
                    )
                    : [...state.favoritesMovieList, action.favoriteMovie],
            };
        }
        default:
            return state;
    }
};

export const setMovieDataAC = (movie: IMovie) => {
    return {type: SET_MOVIE, movie};
};

export const toggleFavoriteMovieAC = ({id, name, poster}: IMovie) => ({
    type: TOGGLE_FAVORITE_MOVIE,
    favoriteMovie: {id, name, poster},
});

export const getMovieById = (
    id: number
): ThunkAction<void, IAppState, unknown, any> => {
    return async (dispatch: Dispatch) => {
        try {
            // debugger
            const movieResponse = await ApiClient.getMovieById(id);
            // dispatch(setPageTypeAC(EPageType.FilmCard));
            dispatch(setMovieDataAC(mapToLoadedMovie(movieResponse)));
        } catch (error) {
            console.error('Ошибка при получении фильма:', error);
        }
    };
};
