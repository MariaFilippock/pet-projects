import React from 'react';
import {useSelector} from 'react-redux';
import {IAppState, useAppDispatch} from '../../store';
import styles from './MovieList.module.scss';
import {IoChevronBackOutline, IoChevronForwardOutline} from 'react-icons/io5';
import {CORNER_PAGE_COUNT, MAX_PAGES_COUNT} from '../../const';
import {
    ISideBarFilter,
    setMovieFilter,
} from '../../store/reducers/movieList-reducer';
import {getMovieById} from '../../store/reducers/movieCard-reducer';

const BackOutline = IoChevronBackOutline;
const ForwardOutline = IoChevronForwardOutline;

const calculatePagination = (pages: number, chosenPage: number) => {
    let pagination: (number | string)[] = [];

    if (pages < MAX_PAGES_COUNT) {
        pagination = [...Array(pages).keys()].map((i) => i + 1);
    } else if (chosenPage < CORNER_PAGE_COUNT) {
        pagination = [...Array(CORNER_PAGE_COUNT).keys()].map((i) => i + 1);
        pagination.push('...', pages);
    } else if (pages - chosenPage < CORNER_PAGE_COUNT - 1) {
        pagination = [1, '...', pages - 4, pages - 3, pages - 2, pages - 1, pages];
    } else {
        pagination = [
            1,
            '...',
            chosenPage - 1,
            chosenPage,
            chosenPage + 1,
            '...',
            pages,
        ];
    }
    return pagination;
};

export const MovieList = () => {
    const movieList = useSelector(
        (state: IAppState) => state.movieList.moviesList
    );
    const {pages, chosenPage} = useSelector((state: IAppState) => {
        const pages = state.movieList.pagination.pages ?? 1;
        const chosenPage = state.movieList.pagination.chosenPage ?? 1;

        return {pages, chosenPage};
    });
    const filters = useSelector(
        (state: IAppState) => state.movieList.sideBarFilter
    );
    const dispatch = useAppDispatch();

    const handlePageClick = (filters: ISideBarFilter, page: number) => {
        if (!page) {
            return;
        }

        dispatch(setMovieFilter(filters, page));
    };

    const handleSearchMovieById = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.getAttribute('data-film-id');

        if (!id) return;

        dispatch(getMovieById(id));
    };

    const handleNextPageClick = () => {
        const nextPage = chosenPage + 1;

        if (nextPage > pages) {
            return;
        }

        dispatch(setMovieFilter(filters, nextPage));
    };

    const handlePreviousPageClick = () => {
        const previousPage = chosenPage - 1;

        if (previousPage < 1) {
            return;
        }

        dispatch(setMovieFilter(filters, previousPage));
    };

    return (
        <div>
            <div className={styles.movieList}>
                {movieList.map((item) => {
                    return (
                        <div
                            id={item.id}
                            key={item.id}
                            data-film-id={item.id}
                            onClick={handleSearchMovieById}
                        >
                            <img src={item.poster?.url} alt={item.name}/>
                            <span>{item.name}</span>
                        </div>
                    );
                })}
            </div>

            <div className={styles.pagination}>
        <span id={'previousPage'} onClick={handlePreviousPageClick}>
          <BackOutline className={styles.next}/>
        </span>
                {calculatePagination(pages, chosenPage).map((page) => {
                    return (
                        <span
                            className={`${styles.page} ${
                                page === chosenPage ? styles.active : ''
                            }`}
                            key={page === '...' ? 'ellipsis' : page}
                            onClick={
                                page !== '...'
                                    ? () =>
                                        handlePageClick(filters as ISideBarFilter, page as number)
                                    : undefined
                            }
                        >
              {page}
            </span>
                    );
                })}
                <span id={'nextPage'} onClick={handleNextPageClick}>
          <ForwardOutline className={styles.next}/>
        </span>
            </div>
        </div>
    );
};

// //загружаю новую страницу со списком фильмов при клике на стрелку "вперед", "назад" или номер страницы
// function loadByPage() {
//   Store.setIsLoading(true);
//   render();
//
//   const request =
//     Store.state.pageType === "StartList"
//       ? fetchRandomMovies(Store.state.pagination.chosenPage)
//       : fetchMovie(
//           Store.state.sideBarFilter,
//           Store.state.pagination.chosenPage
//         );
//
//   request.then((responseMoviesData) => {
//     Store.updateMoviesList(responseMoviesData.docs);
//     Store.setIsLoading(false);
//     render();
//   });
// }
