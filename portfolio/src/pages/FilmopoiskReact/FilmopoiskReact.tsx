import React from 'react';
import styles from './FilmopoiskReact.module.scss';
import Header from './components/Header/Header';
import {useSelector} from 'react-redux';
import {IAppState} from './store';
import SideBar from './components/SideBar/SideBar';
import {FilmList} from './const';
import {MovieCard} from './components/MovieCard/MovieCard';
import {MovieList} from './components/MovieList/MovieList';

const FilmopoiskReact = () => {
    const pageType = useSelector((state: IAppState) => state.pageType.pageType);

    return (
        <div className={styles.bodyContainer}>
            <Header/>
            <div className={styles.container}>
                <SideBar/>
                <div id="wrapper" className={styles.wrapper}>
                    {pageType === FilmList ? <MovieList/> : <MovieCard/>}
                </div>
            </div>
        </div>
    )
}

export default FilmopoiskReact;
