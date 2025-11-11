import React from 'react';
import styles from './Header.module.scss';
import { DropdownMovieList } from '../DropdownMovieList/DropdownMovieList';
import {useAppDispatch} from 'store/index';
import {setPageTypeAC} from 'store/reducers/pageType-reducer';
import {EPageType} from 'pages/FilmopoiskReact/Models';
import {setStartMovieList} from 'store/reducers/startMovieList-reducer';

const Header = () => {
    const dispatch = useAppDispatch();

    const handleShowRandomMovieList = () => {
        // debugger
        dispatch(setStartMovieList(1));
        dispatch(setPageTypeAC(EPageType.StartList));
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
