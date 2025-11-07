// import {moviesListAPI} from "../../api/api";
import { SET_MOVIES_LIST } from 'pages/FilmopoiskReact/const';
// import { MOCK_DATA } from '../mock';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../index';
import { AnyAction, Dispatch } from 'redux';
import { moviesListAPI } from 'pages/FilmopoiskReact/api/apiFilmopoisk';
import {IDropdownMovieListState, IMovie} from 'pages/FilmopoiskReact/Models';

let initialState: IDropdownMovieListState = {
  loadedList: [],
};

export const mapToLoadedMovie = (movie: any): IMovie => {
  return {
    id: String(movie.id),
    name: movie.name,
    rating: movie.rating || {},
    votes: movie.votes || {},
    poster: movie.poster,
    description: movie.description || '',
    shortDescription: movie.shortDescription || '',
    year: movie.year || '',
    alternativeName: movie.alternativeName,
    ageRating: movie.ageRating,
    isSeries: movie.isSeries,
    countries: movie.countries || [],
    genres: movie.genres || [],
    movieLength: movie.movieLength || 0,
    seriesLength: movie.seriesLength || 0,
    trailers: movie.videos?.trailers || [],
  };
};

export const dropdownMovieListReducer = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_MOVIES_LIST: {
      return {
        ...state,
        loadedList: action.loadedList,
      };
    }
    default:
      return state;
  }
};

export const setMoviesListAC = (loadedList: IMovie[]) => ({
  type: SET_MOVIES_LIST,
  loadedList,
});

//thunk-функция
export const getMoviesList = (
  name: string
): ThunkAction<void, IAppState, unknown, any> => {
  return (dispatch: Dispatch): void => {
    //получили список фильмов по запросу на сервер
    moviesListAPI.getMoviesList(name).then((response) => {
      const loadedMovieList: IMovie[] = response.docs
        .filter((data) => (data.rating?.kp ?? 0) > 5)
        .map(mapToLoadedMovie);

      dispatch(setMoviesListAC(loadedMovieList));
    });
  };

  // (movieData) => {
  //           return movieData.rating.kp > 5;
  //       }
  //мок данные
  // return (dispatch: Dispatch): void => {
  //     const mockMovie = MOCK_DATA.docs.find(movie => movie.name.toLowerCase().includes(name.toLowerCase()));
  //
  //     const loadedMockMovieList: IMovie[] = MOCK_DATA.docs.map(mapToLoadedMovie);
  //
  //     if (mockMovie) {
  //         dispatch(setMoviesListAC(loadedMockMovieList));
  //     } else {
  //         console.warn("Мок-данные не найдены по имени:", name);
  //     }
  // }
};
