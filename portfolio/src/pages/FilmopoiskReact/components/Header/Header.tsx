import React from 'react';
import styles from './Header.module.scss';
import { DropdownMovieList } from '../DropdownMovieList/DropdownMovieList';

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.searchContainer}>
        <div className={styles.navBrand}>Фильмопоиск</div>
        <div className={styles.formSearch}>
          <DropdownMovieList />
        </div>
      </div>
    </nav>
  );
};

export default Header;
