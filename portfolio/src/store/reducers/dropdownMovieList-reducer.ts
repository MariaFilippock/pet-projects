import { SET_MOVIES_LIST } from 'pages/FilmopoiskReact/const';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../index';
import { AnyAction, Dispatch } from 'redux';
import {ApiClient} from 'pages/FilmopoiskReact/api/apiFilmopoisk';
import {IDropdownMovieListState, IMovie} from 'pages/FilmopoiskReact/Models';

let initialState: IDropdownMovieListState = {
  loadedList: [],
};

export const mapToLoadedMovie = (movie: any): IMovie => {
  return {
    id: movie.id,
    name: movie.name,
    rating: movie.rating || {},
    votes: movie.votes || {},
    poster: movie.poster,
    description: movie.description || '',
    shortDescription: movie.shortDescription || '',
    year: movie.year || '',
    alternativeName: movie.alternativeName,
    ageRating: movie.ageRating || 0,
    isSeries: movie.isSeries,
    countries: movie.countries || [],
    genres: movie.genres || [],
    movieLength: movie.movieLength || 0,
    seriesLength: movie.seriesLength || 0,
    trailers: movie.videos?.trailers || [],
    persons: movie.persons || [],
    sequelsAndPrequels: movie.sequelsAndPrequels || [],
    similarMovies: movie.similarMovies || [],
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
    ApiClient.getMoviesList(name).then((response) => {
      const loadedMovieList: IMovie[] = response.docs
        .filter((data) => (data.rating?.kp ?? 0) > 5)
        .map(mapToLoadedMovie);

      dispatch(setMoviesListAC(loadedMovieList));
    });
  };
};
