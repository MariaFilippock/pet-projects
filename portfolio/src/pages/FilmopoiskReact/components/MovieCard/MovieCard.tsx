import React from 'react';
import styles from './MovieCard.module.scss';
import {MovieMainInfo} from './MovieMainInfo/MovieMainInfo';
import {VideoPlayer} from './VideoPlayer/VideoPlayer';
import {RatingInfo} from './RatingInfo/RatingInfo';
import {useSelector} from 'react-redux';
import {IAppState} from 'store';

/** Карточка с информацией по фильму (название, постер, описание) и видеоплеером */
export const MovieCard = () => {
    const {movie, favoritesMovieList} = useSelector((state: IAppState) => state.movie ?? {});
    const isFavorite = favoritesMovieList.some((favMovie) => favMovie.id  === movie?.id
    );

    return (
        <>
            {movie ? (
                <div className={styles.wrapperJoinColumn}>
                    <MovieMainInfo movie={movie} isFavorite={isFavorite}/>
                    <VideoPlayer movie={movie}/>
                </div>
            ) : null}

            {movie && favoritesMovieList.length ? (
                <RatingInfo movie={movie} favoriteMovieList={favoritesMovieList}/>
            ) : null}
        </>
    );
};
