import React, {useState} from 'react';
import styles from './DropdownMovieList.module.scss';
import {useSelector} from 'react-redux';
import {getMovieById} from 'store/reducers/movieCard-reducer';
import {IAppState, useAppDispatch} from 'store';
import {DROPDOWN_QUANTITY_OF_MOVIES, ROUTES} from '../../const';
import {AiOutlineSearch} from 'react-icons/ai';
import {getMoviesList} from 'store/reducers/dropdownMovieList-reducer';
import {IMovie} from 'pages/FilmopoiskReact/Models';
import {useNavigate} from 'react-router-dom';

export const DropdownMovieList = () => {
    const [isDropdownMovieListVisible, setDropdownMovieListVisible] =
        useState(false);
    const [name, setName] = useState('');
    const loadedList = useSelector(
        (state: IAppState) => state.dropdownMovieList.loadedList
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleFindMovieIdAtDropdownList = (
        movieItem: IMovie
    ) => {
        setDropdownMovieListVisible(false);
        const id = Number(movieItem.id);

        if (id) {
            navigate(`${ROUTES.MOVIE_CARD}/${id}`);
        }

        setName('');
    };

    const handleShowDropdownMovieList = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        setDropdownMovieListVisible(true);
        setName(e.target.value);

        //благодаря библиотеке thunk диспатчим функцию с запросом на сервер
        dispatch(getMoviesList(e.target.value));
    };

    const handleSearchMovieByName = (e: React.MouseEvent<HTMLDivElement>) => {
        setDropdownMovieListVisible(false);

        const foundMovie = loadedList.find(
            (movie) => movie.name.toLowerCase() === name.toLowerCase()
        );

        if (!foundMovie) {
            return;
        }

        navigate(`${ROUTES.MOVIE_CARD}/${foundMovie.id}`);
        dispatch(getMovieById(foundMovie.id));

        setName('');
    };

    return (
        <>
            <input
                onChange={handleShowDropdownMovieList}
                value={name}
                className={styles.searchInput}
                type="text"
                placeholder="Фильмы"
                autoComplete="off"
            />
            <div onClick={handleSearchMovieByName} className={styles.btnSearch}>
                <AiOutlineSearch/>
            </div>
            <div className={styles.dropdownContainer} style={{marginTop: 8}}>
                {isDropdownMovieListVisible && (
                    <div className={styles.dropdownListMovies}>
                        {loadedList
                            .map((movieItem) => (
                                <div
                                    className={styles.dropdownMovieItem}
                                    key={movieItem.id}
                                    data-name={movieItem.name}
                                    onClick={() => handleFindMovieIdAtDropdownList(movieItem)}
                                >
                                    {movieItem.name}
                                    <span className={styles.dropdownMovieRating}>
                    {Number(movieItem?.rating?.kp) > 0
                        ? movieItem.rating?.kp?.toFixed(1)
                        : ''}
                  </span>
                                </div>
                            ))
                            .slice(0, DROPDOWN_QUANTITY_OF_MOVIES)}
                    </div>
                )}
            </div>
        </>
    );
};
