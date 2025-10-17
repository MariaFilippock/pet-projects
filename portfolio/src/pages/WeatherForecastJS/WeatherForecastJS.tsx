import React from 'react';
import styles from './WeatherForecastJS.module.scss';
import common from '../pageStyles.module.scss';

const WeatherForecastJS = () => {
    return (
        <div className={common.contentBox}>
            <iframe
                src={`${process.env.PUBLIC_URL}/native_projects/weather_app_js/index.html`}
                title='Калькулятор MVC'
                width="1150"
                height="600"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

export default WeatherForecastJS;
