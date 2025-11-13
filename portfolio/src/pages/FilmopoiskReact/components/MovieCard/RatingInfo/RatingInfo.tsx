import React from 'react';
import styles from './RatingInfo.module.scss';
import {IMovie} from 'pages/FilmopoiskReact/Models';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'pages/FilmopoiskReact/const';

interface IProps {
    movie: IMovie;
    favoriteMovieList: IMovie[];
}

export const RatingInfo: React.FC<IProps> = ({movie, favoriteMovieList}) => {
    const navigate = useNavigate();

    const handleSearchMovieById = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = Number(e.currentTarget.getAttribute('data-film-id'));

        if (!id) return;

        navigate(`${ROUTES.MOVIE_CARD}/${id}`);
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

            {favoriteMovieList.length ? (
                <>
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
                                    src={favMovie.poster?.url || ''}
                                />
                                <div className={styles.favoriteMovieName}>{favMovie.name}</div>
                            </div>
                        ))
                    }
                </>
            ) : null}
        </div>
    );
};
