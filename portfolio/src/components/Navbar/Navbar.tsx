import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.scss';

export const Navbar = () => {
    const setIsActive = ({isActive}: {isActive: boolean}) => isActive ? styles.active : "";

    return (
        <div className={styles.navbar}>
            <h1>Мои проекты</h1>
            <NavLink to='ecommerce' className={setIsActive}>Магазин товаров для дома</NavLink>
            <NavLink to='/filmopoisk_js' className={setIsActive}>Фильмопоиск JS</NavLink>
            <NavLink to='/filmopoisk_react' className={setIsActive}>Фильмопоиск React</NavLink>
            <NavLink to='/todo_mvc' className={setIsActive}>Список задач MVC</NavLink>
            <NavLink to='/calculator_mvc' className={setIsActive}>Калькулятор MVC</NavLink>
            <NavLink to='/weather_forecast_js' className={setIsActive}>Прогноз погоды JS</NavLink>
            <NavLink to='/linechart' className={setIsActive}>График конверсии</NavLink>
        </div>
    )
}
