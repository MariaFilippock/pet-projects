import React from 'react';
import {setMovieFilter} from 'store/reducers/movieList-reducer';
import {useSelector} from 'react-redux';
import {IAppState, useAppDispatch} from 'store/index';
import {MovieList} from 'pages/FilmopoiskReact/components/MovieList/MovieList';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'pages/FilmopoiskReact/const';
import common from 'pages/FilmopoiskReact/FilmopoiskReact.module.scss';

const FilteredMovieList = () => {
    const {moviesList, isLoading} = useSelector(
        (state: IAppState) => state.movieList
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
    const navigate = useNavigate();

    const handlePageClick = (page: number) => {
        if (!page) {
            return;
        }

        dispatch(setMovieFilter(filters, page));
    };

    const handleSearchMovieById = (id: number) => {
        if (!id) return;

        navigate(`${ROUTES.MOVIE_CARD}/${id}`);
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

    if (isLoading) {
        return <div className={common.preloaderWrapper}>
            <div className={common.preloader}></div>
        </div>
    }

    return <MovieList
        onPageClick={handlePageClick}
        onSearchMovieById={handleSearchMovieById}
        movieList={moviesList}
        onNextPageClick={handleNextPageClick}
        onPreviousPageClick={handlePreviousPageClick}
        pages={pages}
        chosenPage={chosenPage}
    />
}

export default FilteredMovieList;
