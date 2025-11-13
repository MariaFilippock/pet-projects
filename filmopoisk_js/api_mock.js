import {
    MOCK_DATA_BY_ID,
    MOCK_DATA_BY_NAME, MOCK_DATA_FILTER,
    MOCK_DATA_TOP_250,
} from "./mock.js";
import {EVERY_YEAR} from "./const.js";

/**
 * Класс для реализации методов, но возвращающий мок данные
 */
export class MockApiClient {
    static getMoviesByFirstLetters = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA_BY_NAME)
            }, 1500);
        })
    }

    static getMoviesById(id) {
        const foundMovie = MOCK_DATA_BY_ID.find((el) => el.id === Number(id));

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(foundMovie);
            }, 1500)
        })
    }

    static fetchRandomMovies() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA_TOP_250);
            }, 1500)
        })
    }

    static fetchMovie(filters) {
        const filterData = MOCK_DATA_FILTER.docs.filter((movieItem) => {
            const matchYear = filters.year === EVERY_YEAR || movieItem.year === filters.year;
            const matchGenre = !filters.genre || movieItem.genres.some((genre) => genre.name === filters.genre);
            const matchType = !filters.type || movieItem.type === filters.type;

            return matchYear && matchGenre && matchType;
            });

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    "docs": filterData,
                    "total": filterData.length,
                    "limit": 14,
                    "page": 1,
                    "pages": Number(Math.ceil(filterData.length / 14)),
                })
            }, 1500)
        })
    }
}
