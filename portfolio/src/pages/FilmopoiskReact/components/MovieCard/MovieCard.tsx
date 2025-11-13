import React, {useEffect} from 'react';
import styles from './MovieCard.module.scss';
import common from '../../FilmopoiskReact.module.scss'
import {MovieMainInfo} from './MovieMainInfo/MovieMainInfo';
import {VideoPlayer} from './VideoPlayer/VideoPlayer';
import {RatingInfo} from './RatingInfo/RatingInfo';
import {useSelector} from 'react-redux';
import {IAppState, useAppDispatch} from 'store';
import {useParams} from 'react-router-dom';
import {getMovieById} from 'store/reducers/movieCard-reducer';

/** Карточка с информацией по фильму (название, постер, описание) и видеоплеером */
const MovieCard = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();


    useEffect(() => {
        dispatch(getMovieById(Number(id)));
    }, [id, dispatch]);

    const {movie, favoritesMovieList, isLoading} = useSelector((state: IAppState) => state.movie ?? {});
    const isFavorite = favoritesMovieList.some((favMovie) => favMovie.id === movie?.id
    );

    if (isLoading) {
        return <div className={common.preloaderWrapper}>
            <div className={common.preloader}></div>
        </div>
    }

    return movie ? (
                <>
                    <div className={styles.wrapperJoinColumn}>
                        <MovieMainInfo movie={movie} isFavorite={isFavorite}/>
                        <VideoPlayer movie={movie}/>
                    </div>
                    <RatingInfo movie={movie} favoriteMovieList={favoritesMovieList}/>
                </>
            ) : null
};

export default MovieCard;
