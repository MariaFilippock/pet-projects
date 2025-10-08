import React, {useEffect} from 'react';
import styles from './MovieCard.module.scss';
import {MovieMainInfo} from './MovieMainInfo/MovieMainInfo';
import {VideoPlayer} from './VideoPlayer/VideoPlayer';
import {RatingInfo} from './RatingInfo/RatingInfo';
import {useSelector} from 'react-redux';
import {IAppState} from '../../store';

/** Карточка с информацией по фильму (название, постер, описание) и видеоплеером */
export const MovieCard = () => {
    const favoriteMovieList = useSelector(
        (state: IAppState) => state.movie?.favoritesMovieList ?? []
    );
    const movie = useSelector((state: IAppState) => state.movie?.movie ?? null);
    const isFavorite = favoriteMovieList.some(
        (favMovie) => favMovie.id === movie?.id
    );

    useEffect(() => {
    }, [movie?.id]);

    return (
        <>
            {movie ? (
                <div className={styles.wrapperJoinColumn}>
                    <MovieMainInfo movie={movie} isFavorite={isFavorite}/>
                    <VideoPlayer movie={movie}/>
                </div>
            ) : null}

            {movie && favoriteMovieList.length ? (
                <RatingInfo movie={movie} favoriteMovieList={favoriteMovieList}/>
            ) : null}
        </>
    );
};
