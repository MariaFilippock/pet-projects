import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <h1>Мои проекты</h1>
            <NavLink to='/filmopoisk_js'>Фильмопоиск JS</NavLink>
            <NavLink to='/filmopoisk_react'>Фильмопоиск React</NavLink>
            <NavLink to='/todo_mvc'>Список задач MVC</NavLink>
            <NavLink to='/calculator_mvc'>Калькулятор MVC</NavLink>
            <NavLink to='/weather_forecast_js'>Прогноз погоды JS</NavLink>
        </div>
    )
}
