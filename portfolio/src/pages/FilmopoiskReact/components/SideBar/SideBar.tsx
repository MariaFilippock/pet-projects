import React from 'react';
import styles from './SideBar.module.scss';
import {ROUTES, Text} from '../../const';
import {IAppState, useAppDispatch} from 'store';
import {setMovieFilter} from 'store/reducers/movieList-reducer';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

type GenreKey = keyof typeof Text.GenresMap;

const SideBar = () => {
    const filters = useSelector(
        (state: IAppState) => state.movieList.sideBarFilter
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const genres: string[] = Object.keys(Text.GenresMap);

    const getHandleChangeTypeFilter = (type: string) => {
        dispatch(setMovieFilter({...filters, type}, 1));
        navigate(ROUTES.FILTERED_LIST);
    };

    const getHandleChangeGenresFilter = (genre: string) => {
        dispatch(setMovieFilter({...filters, genre}, 1));
        navigate(ROUTES.FILTERED_LIST);
    };

    const getHandleChangeYearFilter = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const year = e.target.value;
        dispatch(setMovieFilter({...filters, year}, 1));
        navigate(ROUTES.FILTERED_LIST);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.typesSearch}>
                {Text.FilmTypes.map((type) => {
                    return (
                        <div
                            key={type.id}
                            id={type.id}
                            className={`${type.id === filters.type ? styles.chosen : ''}`}
                            onClick={() => getHandleChangeTypeFilter(type.id)}
                        >
                            <>
                                {<type.icon/>}
                                {type.text}
                            </>
                        </div>
                    );
                })}
            </div>

            <div className={styles.genresSearch}>
                {(genres as GenreKey[]).map((genre) => {
                    return (
                        <div
                            key={genre}
                            id={Text.GenresMap[genre]}
                            className={`${
                                Text.GenresMap[genre] === filters.genre ? styles.chosen : ''
                            }`}
                            onClick={() => getHandleChangeGenresFilter(Text.GenresMap[genre])}
                        >
                            {Text.GenresMap[genre] as string}
                        </div>
                    );
                })}
            </div>

            <div className={styles.yearSearch}>
                <span className={styles.yearSearchTitle}>Год выпуска</span>
                <select onChange={getHandleChangeYearFilter}>
                    <option key={'all'} value={'all'}>
                        Любой
                    </option>
                    {Text.years.map((year) => {
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default SideBar;
