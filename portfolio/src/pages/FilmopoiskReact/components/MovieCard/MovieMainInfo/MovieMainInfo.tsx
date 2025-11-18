import React, {useMemo, useState} from 'react';
import styles from './MovieMainInfo.module.scss';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {useSelector} from 'react-redux';
import {toggleFavoriteMovieAC} from 'store/reducers/movieCard-reducer';
import {IAppState, useAppDispatch} from 'store';
import {setMovieFilter} from 'store/reducers/movieList-reducer';
import {IMovie} from 'pages/FilmopoiskReact/Models';
import {useNavigate} from 'react-router-dom';
import {LIMIT, MAX_ELEMENT_COUNT, PERSON_PROFESSION_TYPE, ROUTES, buttonType} from 'pages/FilmopoiskReact/const';

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
    videoContainer: React.RefObject<HTMLDivElement>;
}

/** Информация по фильму */
export const MovieMainInfo: React.FC<IProps> = ({movie, isFavorite, videoContainer}) => {
    const [isExpandFacts, setIsExpandFacts] = useState(false);
    const filters = useSelector(
        (state: IAppState) => state.movieList.sideBarFilter
    );
    const actorsList = useMemo(() => movie.persons?.filter((person) => person.enProfession === PERSON_PROFESSION_TYPE.actor), [movie.persons])
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id, name, poster}: IMovie = movie;


    const scrollToElement = () => {
        videoContainer.current?.scrollIntoView({behavior: 'smooth'});
    };

    const getHandleChangeGenresFilter = (genre: string) => {
        dispatch(setMovieFilter({...filters, genre}, 1));
        navigate(ROUTES.FILTERED_LIST);
    };

    const handleToggleFavoriteMovie = () => {
        dispatch(
            toggleFavoriteMovieAC({
                id,
                name,
                poster,
            })
        );
    };

    const handleToggleMovieFacts = () => {

    };

    return (
        <>
            <div className={styles.wrapperJoinRow}>
                <div className={styles.poster}>
                    <img src={movie.poster?.url || ''} alt={''}/>
                </div>
                <div className={styles.mainMovieInfo}>
                    <div
                        onClick={handleToggleFavoriteMovie}
                        className={styles.addToFavorites}
                    >
                        {isFavorite ? (
                            <>
                                Убрать из избранного{' '}
                                <AiFillHeart className={styles.favoritesImg}/>
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

                    <div className={styles.subcontainer} onClick={scrollToElement}>
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
                                    : `0`}+
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


            <div className={styles.actorsContainer}>
                <h3 className={styles.actorsTitle}>В главных ролях</h3>
                <div className={styles.actorList}>
                    {actorsList?.slice(0, LIMIT).map((actor) => (
                        <div className={styles.actorItem} key={actor.id}>
                            <img alt={'Фото актера'} className={styles.actorPhoto} src={actor.photo || ''}/>
                            <div className={styles.actorName}>{actor.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {movie.facts?.length && (<div className={styles.factsContainer}>
                <h3 className={styles.factsTitle}>Знаете ли вы, что...</h3>
                <div className={styles.factsList}>
                    {isExpandFacts ?
                        movie.facts?.map((fact, index) => (
                        <li className={styles.factItem} key={index} dangerouslySetInnerHTML={{__html: fact.value || ''}}/>
                    ))
                    :
                    movie.facts?.slice(0, MAX_ELEMENT_COUNT).map((fact, index) => (
                        <li className={styles.factItem} key={index} dangerouslySetInnerHTML={{__html: fact.value || ''}}/>
                    ))}
                    {!isExpandFacts && (<span className={styles.visibilityBtn} onClick={() => setIsExpandFacts(true)}>
                        {<buttonType.visibilityIcon/>}
                        Показать еще
                    </span>)}
                </div>
            </div>)}
        </>
    );
};
