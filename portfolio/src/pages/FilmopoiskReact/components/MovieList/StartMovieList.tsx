import React from 'react';
import {useSelector} from 'react-redux';
import {IAppState, useAppDispatch} from 'store/index';
import {MovieList} from 'pages/FilmopoiskReact/components/MovieList/MovieList';
import {getMovieById} from 'store/reducers/movieCard-reducer';
import {setStartMovieList} from 'store/reducers/startMovieList-reducer';

export const StartMovieList = () => {
    const movieList = useSelector(
        (state: IAppState) => state.startMoviesList.startMoviesList
    );
    const {pages, chosenPage} = useSelector((state: IAppState) => {
        const pages = state.startMoviesList.pagination.pages ?? 1;
        const chosenPage = state.startMoviesList.pagination.chosenPage ?? 1;

        return {pages, chosenPage};
    });
    const dispatch = useAppDispatch();

    const handlePageClick = (page: number) => {
        if (!page) {
            return;
        }

        dispatch(setStartMovieList(page));
    };

    const handleSearchMovieById = (id: number) => {
        if (!id) return;

        dispatch(getMovieById(Number(id)));
    };

    const handleNextPageClick = () => {
        const nextPage = chosenPage + 1;

        if (nextPage > pages) {
            return;
        }

        dispatch(setStartMovieList(nextPage));
    };

    const handlePreviousPageClick = () => {
        const previousPage = chosenPage - 1;

        if (previousPage < 1) {
            return;
        }

        dispatch(setStartMovieList(previousPage));
    };

    return <MovieList
        onPageClick={handlePageClick}
        onSearchMovieById={handleSearchMovieById}
        movieList={movieList}
        onNextPageClick={handleNextPageClick}
        onPreviousPageClick={handlePreviousPageClick}
        pages={pages}
        chosenPage={chosenPage}
        title={'Рекомендуем присмотреться к фильмам из подборки ТОП-250:'}
    />
}


