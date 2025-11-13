import React from 'react';
import styles from './MovieMainInfo.module.scss';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {useSelector} from 'react-redux';
import {toggleFavoriteMovieAC} from 'store/reducers/movieCard-reducer';
import {IAppState, useAppDispatch} from 'store';
import {setMovieFilter} from 'store/reducers/movieList-reducer';
import {IMovie} from 'pages/FilmopoiskReact/Models';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'pages/FilmopoiskReact/const';

let countHoursAndMinutes = (minutes?: number, tvMinutes?: number): string => {
    if (minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours
            ? `${minutes} мин. / ${hours} ч ${mins} мин.`
            : `${minutes} мин.`;
    }
    return tvMinutes != null ? `${tvMinutes} мин.` : `0 мин.`;
};

interface IProps {
    movie: IMovie;
    isFavorite: boolean;
}

/** Информация по фильму */
export const MovieMainInfo: React.FC<IProps> = ({movie, isFavorite}) => {
    const filters = useSelector(
        (state: IAppState) => state.movieList.sideBarFilter
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id, name, poster}: IMovie = movie;

    const getHandleChangeGenresFilter = (genre: string) => {
        dispatch(setMovieFilter({...filters, genre}, 1));
        navigate(ROUTES.FILTERED_LIST);
    };

    const handleToggleFavouriteMovie = () => {
        dispatch(
            toggleFavoriteMovieAC({
                id,
                name,
                poster,
            })
        );
    };

    return (
        <div className={styles.wrapperJoinRow}>
            <div className={styles.poster}>
                <img src={movie.poster?.url || ''} alt={''}/>
            </div>
            <div className={styles.mainMovieInfo}>
                <div
                    onClick={handleToggleFavouriteMovie}
                    className={styles.addToFavorites}
                >
                    {isFavorite ? (
                        <>
                            Убрать из избранного{' '}
                            <AiFillHeart  className={styles.favoritesImg}/>
                        </>
                    ) : (
                        <>
                            Добавить в избранное{' '}
                            <AiOutlineHeart className={styles.favoritesImg}/>
                        </>
                    )}
                </div>
                <h1 className={styles.title}>
                    {movie?.name} ({movie?.year})
                </h1>

                <h6 className={styles.subtitle}>
                    {movie.alternativeName ? movie.alternativeName : ''}{' '}
                    {Number(movie.ageRating) > 0 ? movie.ageRating?.toFixed(0) : `0`}+
                </h6>
                <p className={styles.description}>
                    {movie.shortDescription ? movie.shortDescription : ''}
                </p>

                <div className={styles.subcontainer}>
                    <a className={styles.btn}>Смотреть</a>
                </div>

                <ul className={styles.params + ' ' + styles.subcontainer}>
                    <li>
                        <span className={styles.textMuted}>Формат </span>{' '}
                        {movie.isSeries ? `Сериал` : `Фильм`}
                    </li>
                    <li>
                        <span className={styles.textMuted}>Аудиодорожки </span>Русский
                    </li>
                    <li>
                        <span className={styles.textMuted}>Возраст </span>
                        <span>
              <span className={styles.tag}>
                {Number(movie.ageRating) > 0
                    ? movie.ageRating?.toFixed(0)
                    : `0`}
                  +
              </span>
            </span>
                    </li>
                </ul>

                <h2>О фильме</h2>

                <ul className={styles.params}>
                    <li>
                        <span className={styles.textMuted}>Год производства </span>
                        {movie.year}
                    </li>
                    <li>
                        <span className={styles.textMuted}>Страна </span>
                        {movie.countries?.[0]?.name || ''}
                    </li>
                    <li>
                        <span className={styles.textMuted}>Жанр </span>
                        <span className={styles.genresList}>
              {movie.genres?.map((genreItem, index, array) => (
                  <span
                      key={genreItem.name}
                      onClick={() => getHandleChangeGenresFilter(genreItem.name)}
                  >
                  <a>{genreItem.name}</a>
                      {index < array.length - 1 && ', '}
                </span>
              ))}
            </span>
                    </li>
                    <li>
                        <span className={styles.textMuted}>Длительность </span>
                        <time className={styles.textMuted}>
                            {countHoursAndMinutes(movie?.movieLength ?? 0, movie?.seriesLength ?? 0)}
                        </time>
                    </li>
                    <li>
                        <span className={styles.textMuted}>Описание </span>
                        {movie.description}
                    </li>
                </ul>
            </div>
        </div>
    );
};
