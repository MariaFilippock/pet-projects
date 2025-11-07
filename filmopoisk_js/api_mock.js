import {MOCK_DATA_BY_ID, MOCK_DATA_BY_NAME, MOCK_DATA_TOP_250} from "./mock.js";

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
                resolve(MOCK_DATA_TOP_250)
            }, 1500)
        })
    }
}
