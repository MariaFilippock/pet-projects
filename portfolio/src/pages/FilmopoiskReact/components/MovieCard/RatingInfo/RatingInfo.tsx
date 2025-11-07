import React from 'react';
import styles from './RatingInfo.module.scss';
import {getMovieById} from 'store/reducers/movieCard-reducer';
import {useAppDispatch} from 'store';
import {IMovie} from 'pages/FilmopoiskReact/Models';

interface IProps {
    movie: IMovie;
    favoriteMovieList: IMovie[];
}

export const RatingInfo: React.FC<IProps> = ({movie, favoriteMovieList}) => {
    const dispatch = useAppDispatch();

    const handleSearchMovieById = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.getAttribute('data-film-id');

        if (!id) return;

        dispatch(getMovieById(id));
    };

    return (
        <div className={styles.ratingInfoColumn}>
            <span className={styles.ratingMain}>{movie.rating?.kp?.toFixed(1)}</span>
            <span className={styles.ratingCounts}>
        {movie.votes?.kp?.toLocaleString()} оценки
      </span>
            <a className={styles.ratingDetails}>
                {movie.votes?.filmCritics} рецензий
            </a>

            <h4 className={styles.favoritesTitle}> Мое избранное </h4>
            {favoriteMovieList.map((favMovie) => (
                <div
                    className={styles.favoriteMovieItem}
                    data-film-id={favMovie.id}
                    key={'favorite' + favMovie.id}
                    onClick={handleSearchMovieById}
                >
                    <img
                        className={styles.favoriteMoviePoster}
                        alt={''}
                        src={favMovie.poster?.url}
                    />
                    <div className={styles.favoriteMovieName}>{favMovie.name}</div>
                </div>
            ))}
        </div>
    );
};
