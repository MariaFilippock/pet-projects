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
    isLoading: boolean;
}

export interface IMovie {
    id: number;
    name: string;
    poster?: IPoster;
    description?: string | null;
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
    votes?: IRating;
    trailers?: IVideoTrailer[] | [];
    persons?: IPerson[] | [];
    sequelsAndPrequels?: ISequelAndPrequel[] | [];
    similarMovies?: ISimilarMovie[] | [];
    facts?: IFact[] | [];
}

interface IFact {
      value?: string | null,
      type?: string | null,
      spoiler?: boolean,
}

interface IPerson {
    id: number;
    photo?: string | null;
    name?: string | null;
    enName?: string | null;
    description?: string | null;
    profession?: string | null;
    enProfession?: string | null;
}

interface ISequelAndPrequel {
    id: number;
    name?: string | null;
    alternativeName?: string | null;
    enName?: string | null;
    type?: string | null;
    poster?: IPoster | null;
}

interface ISimilarMovie extends ISequelAndPrequel {
    rating?: IRating | {};
    year?: number;
}

interface IVideoTrailer {
    url?: string;
    name: string;
    site?: string;
    type?: string;
}

export interface IStringName {
    name: string;
}

export interface IPoster {
    url?: string | null;
    previewUrl?: string | null;
}

/** для dropdownList*/
export interface IDropdownMovieListState {
    loadedList: IMovie[];
}

export interface IRating {
    kp?: number;
    imdb?: number | null;
    tmdb?: number | null;
    await?: number | null;
    russianFilmCritics?: number | null;
    filmCritics?: number | null;
}

/** для filteredMovieList*/
export interface IMovieListState {
    moviesList: IMovie[];
    sideBarFilter: ISideBarFilter;
    pagination: IPagination;
    isLoading: boolean;
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

/** для startMovieList*/
export interface IStartMoviesListState {
    startMoviesList: IMovie[];
    pagination: IPagination;
    isLoading: boolean;
}
