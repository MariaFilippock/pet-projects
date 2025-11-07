import {EVERY_YEAR} from "./const.js";
import {MockApiClient} from "./api_mock.js";

const headers = {
    "X-API-KEY": "61WD0E0-9P9MS93-JT98B6D-YA058KJ",
    // "X-API-KEY": "B8Y4Q8Y-SSG4FVM-QQ1WBYN-RTF0J37"
};

let counter = 0;

/**
 * Класс для работы с реальными данными через fetch запросы
 */

export class BackendApiClient {
    static getMoviesByFirstLetters = (name, page = 1, limit = 30) => {
        counter++;
        const localCount = counter;
        const url = `https://api.kinopoisk.dev/v1.4/movie/search?query=${name}&limit=${limit}&page=${page}`;
        // const url = `https://poiskkino.dev/v1.4/movie/search?query=${name}&limit=${limit}&page=${page}`;

        return fetch(url, {
            headers: headers,
        }).then((data) => {
            if (counter === localCount) {
                return data.json();
            }
        })
    }

    static fetchMovie = (filters, page, limit = 14) => {
        const queryParams = {
            page: page,
            limit: limit,
            "genres.name": filters.genre,
            type: filters.type,
            "rating.kp": "6-10",
            "selectFields": ''
        };
        if (filters.year !== EVERY_YEAR) {
            queryParams.year = Number(filters.year);
        }

        const notNullFields = [
            "votes.filmCritics",
            "name",
            "description",
            "poster.url",
            "alternativeName",
            "videos.trailers.url",
            "similarMovies.id",
        ];
        const searchParams = new URLSearchParams(queryParams);

        notNullFields.forEach((field) => {
            return searchParams.append("notNullFields", field);
        });

        const url = `https://api.kinopoisk.dev/v1.4/movie?` + searchParams.toString();

        return fetch(url, {
            headers: headers,
        }).then((response) => {
            return response.json();
        });
    }

//получение списка топ-фильмов по клику на "фильмопоиск"
    static fetchRandomMovies = (page, limit = 14) => {
        const queryParams = {
            page: page,
            limit: limit,
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
            return searchParams.append("notNullFields", field);
        });

        const url = `https://api.kinopoisk.dev/v1.4/movie?` + searchParams.toString();

        return fetch(url, {
            headers: headers,
        }).then((response) => {
            return response.json();
        });
    }

    static getMoviesById = (id) => {
        const url = `https://api.kinopoisk.dev/v1.4/movie/${id}`;

        return fetch(url, {
            headers: headers,
        }).then((data) => {
            return data.json();
        });
    }
}

/**
 * Флаг, через который меняем способ подключения для получения данных
 */
const IS_MOCK_API = false;

/**
 * Итоговая обертка, через которую в приложении как раз и работаем.
 * Т.е. это единая точка для инициирования всех запросов в приложении.
 */
export const ApiClient = IS_MOCK_API ? MockApiClient : BackendApiClient;
