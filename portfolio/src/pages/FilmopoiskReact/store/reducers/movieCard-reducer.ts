// import {moviesListAPI} from "../../api/api";
import {FilmCard, SET_MOVIE, TOGGLE_FAVORITE_MOVIE} from '../../const';
// import { MOCK_DATA } from '../mock';
import {ThunkAction} from 'redux-thunk';
import {IAppState} from '../index';
import {AnyAction, Dispatch} from 'redux';
import {
    IRating,
    mapToLoadedMovie,
} from './dropdownMovieList-reducer';
import {moviesListAPI} from '../../api/apiFilmopoisk';
import {setPageTypeAC} from './pageType-reducer';

export interface IMovieState {
    movie: IMovie | null;
    favoritesMovieList: IMovie[];
}

export interface IMovie {
    id: string;
    name: string;
    poster?: IPoster;
    description?: string;
    shortDescription?: string;
    year?: string;
    alternativeName?: string;
    ageRating?: number;
    isSerial?: boolean;
    countries?: IStringName[];
    genres?: IStringName[];
    movieLength?: number;
    seriesLength?: number;
    rating?: IRating;
    votes?: IVotes;
    trailers?: IVideoTrailer[] | [];
}

interface IVideoTrailer {
    url?: string;
    name?: string;
    site?: string;
    type?: string;
}

export interface IVotes {
    kp?: number;
    imdb?: number;
    russianFilmCritics?: number;
    filmCritics?: number;
}

export interface IStringName {
    name: string;
}

export interface IPoster {
    url: string;
    previewUrl: string;
}

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

// export const getMovieDataByName = (
//   name: string
// ): ThunkAction<void, IAppState, unknown, any> => {
//   return (dispatch: Dispatch): void => {
//     //надо предварительно найти айдишник по имени фильма
//     moviesListAPI.getMovieByName(name).then((response) => {
//       console.log(response);
//       dispatch(setMovieDataAC(mapToLoadedMovie(response.docs[0])));
//     });
//   };

//мок данные
// return (dispatch: Dispatch): void => {
//     const mockMovie = MOCK_DATA.docs.find(movie => movie.name.toLowerCase().includes(name.toLowerCase()));
//
//     if (mockMovie) {
//         dispatch(setMovieDataAC(mapToLoadedMovie(mockMovie)));
//     } else {
//         console.warn("Мок-данные не найдены по имени:", name);
//     }
// }
// };

export const getMovieById = (
    id: string
): ThunkAction<void, IAppState, unknown, any> => {
    return async (dispatch: Dispatch) => {
        try {
            const movieResponse = await moviesListAPI.getMovieById(id);
            dispatch(setPageTypeAC(FilmCard));
            dispatch(setMovieDataAC(mapToLoadedMovie(movieResponse)));
        } catch (error) {
            console.error('Ошибка при получении фильма:', error);
        }
    };

    // return (dispatch: Dispatch): void => {
    //    const mockMovie = MOCK_DATA.docs.find((movie) => String(movie.id) === String(id));
    //
    //    dispatch(setMovieDataAC(mapToLoadedMovie(mockMovie)));
    // }
};
