import axios from 'axios';
import { IMovie } from '../store/reducers/movieCard-reducer';
import { ISideBarFilter } from '../store/reducers/movieList-reducer';

const config: { headers: { 'X-API-KEY': string }; baseURL: string } = {
  baseURL: 'https://api.kinopoisk.dev/v1.4/movie/',
  headers: {
    'X-API-KEY': 'B8Y4Q8Y-SSG4FVM-QQ1WBYN-RTF0J37',
    // 'X-API-KEY': 'H1WGZ9Y-VT04R1D-KFYYYQ2-ZDB00S5',
  },
};

const instance = axios.create(config);

interface MovieResponse {
  docs: IMovie[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export const moviesListAPI = {
  /** Список фильмов по введенным в поиск словам */
  getMoviesList(name: string, limit = 30, page = 1): Promise<MovieResponse> {
    return instance
      .get<MovieResponse>(`search?query=${name}&limit=${limit}&page=${page}`)
      .then((response) => {
        return response.data;
      });
  },

  // /** Данные по найденному по названию фильму */
  // getMovieByName(name: string, limit = 1, page = 1): Promise<MovieResponse> {
  //   return instance
  //     .get<MovieResponse>(`search?query=${name}&limit=${limit}&page=${page}`)
  //     .then((response) => {
  //       return response.data;
  //     });
  // },

  /** Данные по id фильма */
  getMovieById(id: string): Promise<MovieResponse> {
    return instance.get<MovieResponse>(`${id}`).then((response) => {
      return response.data;
    });
  },

  // getVideoById(page = 1, limit = 1, id: string): Promise<MovieResponse> {
  //   return instance
  //     .get<MovieResponse>(
  //       `page=${page}&limit=${limit}&selectFields=${Number(
  //         id
  //       )}&selectFields=videos&notNullFields=videos.trailers.url`
  //     )
  //     .then((response) => {
  //       return response.data;
  //     });
  // },

  /** Список фильмов по фильтрам (тип, жанр, год) */
  getMovieListByFilter(
    filters: ISideBarFilter,
    page: number,
    limit = 14
  ): Promise<MovieResponse> {
    const queryParams: Record<string, string> = {
      page: String(page),
      limit: String(limit),
      'rating.kp': '6-10',
    };



    if (filters.year !== 'all' && filters.year) {
      queryParams.year = filters.year;
    }
    if (filters.genre) {
      queryParams['genres.name'] = filters.genre;
    }
    if (filters.type) {
      queryParams.type = filters.type;
    }

    const notNullFields = [
      'votes.filmCritics',
      'name',
      'description',
      'poster.url',
      'alternativeName',
    ];
    const searchParams = new URLSearchParams(queryParams);

    notNullFields.forEach((field) => {
      searchParams.append('notNullFields', field);
    });

    return instance
      .get(`https://api.kinopoisk.dev/v1.4/movie?${searchParams.toString()}`)
      .then((response) => {
        return response.data;
      });
  },
};
