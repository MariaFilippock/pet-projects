import React from 'react';
import styles from './FilmopoiskReact.module.scss';
import Header from './components/Header/Header';
import {useSelector} from 'react-redux';
import {IAppState} from 'store';
import SideBar from 'pages/FilmopoiskReact/components/SideBar/SideBar';
import {MovieList} from 'pages/FilmopoiskReact/components/MovieList/MovieList';
import {MovieCard} from 'pages/FilmopoiskReact/components/MovieCard/MovieCard';
import {EPageType} from 'pages/FilmopoiskReact/Models';

const FilmopoiskReact = () => {
    const pageType = useSelector((state: IAppState) => state.pageType.pageType);

    return (
        <div className={styles.bodyContainer}>
            <Header/>
            <div className={styles.container}>
                <SideBar/>
                <div id="wrapper" className={styles.wrapper}>
                    {pageType === EPageType.FilmList ? <MovieList/> : <MovieCard/>}
                </div>
            </div>
        </div>
    )
}

export default FilmopoiskReact;
