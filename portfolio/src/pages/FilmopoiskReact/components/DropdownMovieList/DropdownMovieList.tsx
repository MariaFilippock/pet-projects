import React, { useState } from 'react';
import styles from './DropdownMovieList.module.scss';
import { useSelector } from 'react-redux';
import { getMovieById } from '../../store/reducers/movieCard-reducer';
import { IAppState, useAppDispatch } from '../../store';
import { DROPDOWN_QUANTITY_OF_MOVIES } from '../../const';
import { AiOutlineSearch } from 'react-icons/ai';
import { getMoviesList } from '../../store/reducers/dropdownMovieList-reducer';

export const DropdownMovieList = () => {
  const [isDropdownMovieListVisible, setDropdownMovieListVisible] =
    useState(false);
  const [name, setName] = useState('');
  const loadedList = useSelector(
    (state: IAppState) => state.dropdownMovieList.loadedList
  );
  const dispatch = useAppDispatch();

  const handleFindMovieIdAtDropdownList = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setDropdownMovieListVisible(false);
    const id = e.currentTarget.id;

    if (id) {
      dispatch(getMovieById(id));
    }

    setName('');
  };

  const handleShowDropdownMovieList = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    //отражаем или нет выпадающий список
    setDropdownMovieListVisible(true);

    //обновляем локальное состояние
    setName(e.target.value);

    //благодаря библиотеке thunk диспатчим функцию с запросом на сервер
    dispatch(getMoviesList(e.target.value));
  };

  //переделать на поиск данных по id фильма
  const handleSearchMovieByName = (e: React.MouseEvent<HTMLDivElement>) => {
    //убираем выпадающий список
    setDropdownMovieListVisible(false);

    const foundMovie = loadedList.find(
      (movie) => movie.name.toLowerCase() === name.toLowerCase()
    );

    if (!foundMovie) {
      return;
    }

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
        <AiOutlineSearch />
      </div>
      <div className={styles.dropdownContainer} style={{ marginTop: 8 }}>
        {isDropdownMovieListVisible && (
          <div className={styles.dropdownListMovies}>
            {loadedList
              .map((movieItem) => (
                <div
                  className={styles.dropdownMovieItem}
                  id={movieItem.id}
                  key={movieItem.id}
                  data-name={movieItem.name}
                  onClick={handleFindMovieIdAtDropdownList}
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
