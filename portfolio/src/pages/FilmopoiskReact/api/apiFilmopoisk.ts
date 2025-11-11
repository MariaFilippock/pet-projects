import axios from 'axios';
import {ISideBarFilter, MovieResponse} from 'pages/FilmopoiskReact/Models';
import {moviesListMockAPI} from 'pages/FilmopoiskReact/api/mockApiFilmopoisk';

const config: { headers: { 'X-API-KEY': string }; baseURL: string } = {
  baseURL: 'https://api.poiskkino.dev/v1.4/movie/',
  headers: {
    'X-API-KEY': 'B8Y4Q8Y-SSG4FVM-QQ1WBYN-RTF0J37',
    // 'X-API-KEY': 'H1WGZ9Y-VT04R1D-KFYYYQ2-ZDB00S5',
  },
};

const instance = axios.create(config);

export const moviesListAPI = {
  /** Список фильмов по введенным в поиск словам */
  getMoviesList(name: string, limit = 30, page = 1): Promise<MovieResponse> {
    return instance
      .get<MovieResponse>(`search?query=${name}&limit=${limit}&page=${page}`)
      .then((response) => {
        return response.data;
      });
  },

  /** получение списка топ-фильмов по клику на "фильмопоиск" */
  getTop250MoviesList(page: number, limit = 14): Promise<MovieResponse> {
    const queryParams = {
            page: String(page),
            limit: String(limit),
            "selectFields": '',
            "rating.kp": "8-10",
            "rating.imdb": "8-10",
            "votes.filmCritics": "1-6666666"
        }

    const notNullFields = [
            "votes.filmCritics",
            "name",
            "description",
            "poster.url",
            "top250",
            "alternativeName",
      ];

    const searchParams = new URLSearchParams(queryParams);

    notNullFields.forEach((field) => {
       searchParams.append("notNullFields", field);
    })

    return instance
        .get<MovieResponse>(`https://poiskkino.dev/v1.4/movie?${searchParams.toString()}`)
        .then((response) => {
          return response.data;
        });
  },

  /** Данные по id фильма */
  getMovieById(id: number): Promise<MovieResponse> {
    return instance.get<MovieResponse>(`${id}`).then((response) => {
      return response.data;
    });
  },

  /** Список фильмов по фильтрам (тип, жанр, год) */
  getMovieListByFilter(
    filters: ISideBarFilter,
    page: number,
    limit = 14
  ): Promise<MovieResponse> {
    const queryParams: Record<string, string | number> = {
      page: String(page),
      limit: String(limit),
      'rating.kp': '6-10',
    };

    if (filters.year !== 'all' && filters.year) {
      queryParams.year = String(filters.year);
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

    const searchParams = new URLSearchParams(Object.fromEntries(Object.entries(queryParams).map((key, value) => [key, String(value)])));

    notNullFields.forEach((field) => {
      searchParams.append('notNullFields', field);
    });

    return instance
      .get(`https://api.poiskkino.dev/v1.4/movie?${searchParams.toString()}`)
      .then((response) => {
        return response.data;
      });
  },
}

/**
 * Флаг, через который меняем способ подключения для получения данных
 */
const IS_MOCK_API = true;

/**
 * Итоговая обертка, через которую в приложении как раз и работаем.
 * Т.е. это единая точка для инициирования всех запросов в приложении.
 */
export const ApiClient = IS_MOCK_API ? moviesListMockAPI : moviesListAPI;
