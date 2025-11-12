import React from 'react';
import {setMovieFilter} from 'store/reducers/movieList-reducer';
import {useSelector} from 'react-redux';
import {IAppState, useAppDispatch} from 'store/index';
import {MovieList} from 'pages/FilmopoiskReact/components/MovieList/MovieList';
import {getMovieById} from 'store/reducers/movieCard-reducer';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'pages/FilmopoiskReact/const';

const FilteredMovieList = () => {
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
    const navigate = useNavigate();

    const handlePageClick = (page: number) => {
        if (!page) {
            return;
        }

        dispatch(setMovieFilter(filters, page));
    };

    const handleSearchMovieById = (id: number) => {
        if (!id) return;

        dispatch(getMovieById(Number(id)));
        navigate(ROUTES.MOVIE_CARD);
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

    return <MovieList
        onPageClick={handlePageClick}
        onSearchMovieById={handleSearchMovieById}
        movieList={movieList}
        onNextPageClick={handleNextPageClick}
        onPreviousPageClick={handlePreviousPageClick}
        pages={pages}
        chosenPage={chosenPage}
    />
}

export default FilteredMovieList;
