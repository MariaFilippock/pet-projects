export enum EPageType {
    FilmList = 'FilmList',
    FilmCard = 'FilmCard',
}

/** для movieCard*/
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
    isSeries?: boolean;
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
    year?: string;
}