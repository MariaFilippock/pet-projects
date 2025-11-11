import React from 'react';
import styles from './MovieList.module.scss';
import {IoChevronBackOutline, IoChevronForwardOutline} from 'react-icons/io5';
import {CORNER_PAGE_COUNT, ELLIPSIS, MAX_PAGES_COUNT} from '../../const';
import {IMovie} from 'pages/FilmopoiskReact/Models';

const BackOutline = IoChevronBackOutline;
const ForwardOutline = IoChevronForwardOutline;

export const calculatePagination = (pages: number, chosenPage: number) => {
    let pagination: (number | string)[] = [];

    if (pages < MAX_PAGES_COUNT) {
        pagination = [...Array(pages).keys()].map((i) => i + 1);
    } else if (chosenPage < CORNER_PAGE_COUNT) {
        pagination = [...Array(CORNER_PAGE_COUNT).keys()].map((i) => i + 1);
        pagination.push(ELLIPSIS, pages);
    } else if (pages - chosenPage < CORNER_PAGE_COUNT - 1) {
        pagination = [1, ELLIPSIS, pages - 4, pages - 3, pages - 2, pages - 1, pages];
    } else {
        pagination = [
            1,
            ELLIPSIS,
            chosenPage - 1,
            chosenPage,
            chosenPage + 1,
            ELLIPSIS,
            pages,
        ];
    }
    return pagination;
};

interface IProps {
    onPageClick: (page: number) => void;
    onSearchMovieById: (id: number) => void;
    movieList: IMovie[];
    onNextPageClick: () => void;
    onPreviousPageClick: () => void;
    pages: number;
    chosenPage: number;
    title?: string;
}

export const MovieList: React.FC<IProps> = ({onPageClick, onSearchMovieById, movieList, onNextPageClick, onPreviousPageClick, pages, chosenPage, title}) => {
     return (
        <div>
            {title && <h2 className={styles.startMovieListTitle}>{title}</h2>}
            {movieList.length === 0 && <div className={styles.filterMessage}>Ничего не найдено по выбранным фильтрам. Попробуйте выбрать другие фильтры.</div>}
            <div className={styles.movieList}>
                {movieList.map((item) => {
                    return (
                        <div
                            key={item.id}
                            onClick={() => onSearchMovieById(item.id)}
                        >
                            <img src={item.poster?.url} alt={item.name}/>
                            <span>{item.name}</span>
                        </div>
                    );
                })}
            </div>

            <div className={styles.pagination}>
                <span id={'previousPage'} onClick={onPreviousPageClick}>
                    <BackOutline className={styles.next}/>
                </span>
                {calculatePagination(pages, chosenPage).map((page) => {
                    return (
                        <span
                            className={`${styles.page} ${
                                page === chosenPage ? styles.active : ''
                            }`}
                            key={page === ELLIPSIS ? 'ellipsis' : page}
                            onClick={
                                page !== ELLIPSIS
                                    ? () =>
                                        onPageClick(page as number)
                                    : undefined
                            }
                        >
                        {page}
                        </span>);
                })
               }
                <span id={'nextPage'} onClick={onNextPageClick}>
                    <ForwardOutline className={styles.next}/>
                </span>
            </div>
        </div>
    );
};
