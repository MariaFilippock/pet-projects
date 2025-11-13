import React from 'react';
import {useSelector} from 'react-redux';
import {IAppState, useAppDispatch} from 'store/index';
import {MovieList} from 'pages/FilmopoiskReact/components/MovieList/MovieList';
import {setStartMovieList} from 'store/reducers/startMovieList-reducer';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'pages/FilmopoiskReact/const';
import common from 'pages/FilmopoiskReact/FilmopoiskReact.module.scss';

const StartMovieList = () => {
    const { startMoviesList, isLoading } = useSelector(
        (state: IAppState) => state.startMoviesList
    );
    const {pages, chosenPage} = useSelector((state: IAppState) => {
        const pages = state.startMoviesList.pagination.pages ?? 1;
        const chosenPage = state.startMoviesList.pagination.chosenPage ?? 1;

        return {pages, chosenPage};
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handlePageClick = (page: number) => {
        if (!page) {
            return;
        }

        dispatch(setStartMovieList(page));
    };

    const handleSearchMovieById = (id: number) => {
        if (!id) return;

        navigate(`${ROUTES.MOVIE_CARD}/${id}`);
        // dispatch(getMovieById(Number(id)));
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

    if (isLoading) {
        return <div className={common.preloaderWrapper}>
            <div className={common.preloader}></div>
        </div>
    }

    return <MovieList
        onPageClick={handlePageClick}
        onSearchMovieById={handleSearchMovieById}
        movieList={startMoviesList}
        onNextPageClick={handleNextPageClick}
        onPreviousPageClick={handlePreviousPageClick}
        pages={pages}
        chosenPage={chosenPage}
        title={'Рекомендуем присмотреться к фильмам из подборки ТОП-250:'}
    />
}

export default StartMovieList;
