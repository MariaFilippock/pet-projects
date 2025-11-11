export enum EPageType {
    FilmList = 'FilmList',
    FilmCard = 'FilmCard',
    StartList = 'StartList',
}

export interface MovieResponse {
  docs: IMovie[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}


/** для movieCard*/
export interface IMovieState {
    movie: IMovie | null;
    favoritesMovieList: IMovie[];
}

export interface IMovie {
    id: number;
    name: string;
    poster?: IPoster;
    description?: string;
    shortDescription?: string | null;
    year?: string | number;
    alternativeName?: string;
    ageRating?: number | null;
    isSeries?: boolean;
    countries?: IStringName[];
    genres?: IStringName[];
    movieLength?: number | null;
    seriesLength?: number | null;
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

/** для dropdownList*/
export interface IDropdownMovieListState {
  loadedList: IMovie[];
}

export interface IRating {
  kp?: number;
  imdb?: number;
  russianFilmCritics?: number;
  filmCritics?: number;
}

/** для movieList*/
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
    year?: string | number;
}

export interface IStartMoviesListState {
    startMoviesList: IMovie[];
    pagination: IPagination;
}