import React from 'react';
import styles from './Header.module.scss';
import { DropdownMovieList } from '../DropdownMovieList/DropdownMovieList';
import {useAppDispatch} from 'store/index';
import {setStartMovieList} from 'store/reducers/startMovieList-reducer';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from 'pages/FilmopoiskReact/const';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleShowRandomMovieList = () => {
        dispatch(setStartMovieList(1));
        navigate(ROUTES.START_LIST);
    };

  return (
    <nav className={styles.header}>
      <div className={styles.searchContainer}>
        <div className={styles.navBrand} onClick={handleShowRandomMovieList}>Фильмопоиск</div>
        <div className={styles.formSearch}>
          <DropdownMovieList />
        </div>
      </div>
    </nav>
  );
};

export default Header;
