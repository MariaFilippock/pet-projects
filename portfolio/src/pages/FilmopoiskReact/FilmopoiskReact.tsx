import React, {lazy} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import styles from './FilmopoiskReact.module.scss';
import Header from './components/Header/Header';
import SideBar from 'pages/FilmopoiskReact/components/SideBar/SideBar';


const MovieCard = lazy(() => import('./components/MovieCard/MovieCard'));
const StartMovieList = lazy(() => import('./components/MovieList/StartMovieList'));
const FilteredMovieList = lazy(() => import('./components/MovieList/FilteredMovieList'));

const FilmopoiskReact = () => {
    return (
        <div className={styles.bodyContainer}>
            <Header/>
            <div className={styles.container}>
                <SideBar/>
                <div id="wrapper" className={styles.wrapper}>
                    <Routes>
                        <Route index element={<Navigate to={'start_movie_list'} replace />}/>

                        <Route path='movie_card/:id' element={<MovieCard/>} />
                        <Route path='start_movie_list' element={<StartMovieList/>} />
                        <Route path='filtered_movie_list' element={<FilteredMovieList/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default FilmopoiskReact;
