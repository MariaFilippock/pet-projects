import React from 'react';
import styles from './FilmopoiskReact.module.scss';
import Header from './components/Header/Header';
import {useSelector} from 'react-redux';
import {IAppState} from 'store';
import SideBar from 'pages/FilmopoiskReact/components/SideBar/SideBar';
import {MovieCard} from 'pages/FilmopoiskReact/components/MovieCard/MovieCard';
import {EPageType} from 'pages/FilmopoiskReact/Models';
import {StartMovieList} from 'pages/FilmopoiskReact/components/MovieList/StartMovieList';
import {FilteredMovieList} from 'pages/FilmopoiskReact/components/MovieList/FilteredMovieList';

const FilmopoiskReact = () => {
    const pageType = useSelector((state: IAppState) => state.pageType.pageType);

    return (
        <div className={styles.bodyContainer}>
            <Header/>
            <div className={styles.container}>
                <SideBar/>
                <div id="wrapper" className={styles.wrapper}>
                    {pageType === EPageType.FilmCard
                        ? <MovieCard/>
                        : pageType === EPageType.StartList
                            ? <StartMovieList/>
                            : <FilteredMovieList/>
                    }
                </div>
            </div>
        </div>
    )
}

export default FilmopoiskReact;
