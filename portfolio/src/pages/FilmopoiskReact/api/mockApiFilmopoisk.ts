import {IMovie, ISideBarFilter, MovieResponse} from 'pages/FilmopoiskReact/Models';
import {MOCK_DATA_BY_ID, MOCK_DATA_BY_NAME, MOCK_DATA_FILTER, MOCK_DATA_TOP_250} from 'pages/FilmopoiskReact/api/mock';
import {EVERY_YEAR} from 'pages/FilmopoiskReact/const';


export const moviesListMockAPI = {
    /** Список фильмов по введенным в поиск словам */
    getMoviesList(): Promise<MovieResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA_BY_NAME);
            }, 500);
        })
    },
    /** Данные по id фильма */
    getMovieById(id: number): Promise<IMovie> {
        // debugger
        const foundMovie = MOCK_DATA_BY_ID.find((el) => el.id === Number(id));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (foundMovie) {
                    resolve(foundMovie);
                } else {
                    reject(new Error("Мок-данные не найдены"));
                }
            }, 500);
        });
    },
    /** Список топ-250 фильмов */
    getTop250MoviesList(page: number): Promise<MovieResponse> {
        const top250MovieListPerPage = MOCK_DATA_TOP_250.docs.slice((page-1)*MOCK_DATA_TOP_250.limit, page*MOCK_DATA_TOP_250.limit);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    "docs": top250MovieListPerPage,
                    "total": MOCK_DATA_TOP_250.docs.length,
                    "limit": 7,
                    "page": 1,
                    "pages": Number(Math.ceil(MOCK_DATA_TOP_250.docs.length / 7)),

                });
            }, 500)
        })
    },
    getMovieListByFilter(filters: ISideBarFilter, page: number): Promise<MovieResponse> {
        // debugger
        const filterData = MOCK_DATA_FILTER.docs.filter((movieItem) => {
            const matchYear = filters.year === EVERY_YEAR || movieItem.year === Number(filters.year);
            const matchGenre = !filters.genre || movieItem.genres.some((genre) => genre.name === filters.genre);
            const matchType = !filters.type || movieItem.type === filters.type;

            return matchYear && matchGenre && matchType;
        });
        console.log(filterData);
    // debugger
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    "docs": filterData.slice((page-1)*MOCK_DATA_FILTER.limit, page*MOCK_DATA_FILTER.limit),
                    "total": MOCK_DATA_FILTER.docs.length,
                    "limit": 7,
                    "page": page,
                    "pages": Number(Math.ceil(filterData.length / 7)),
                })
            }, 500)
        })
    }

}
