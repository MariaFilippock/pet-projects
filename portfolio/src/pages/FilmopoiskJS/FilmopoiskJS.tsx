import React from 'react';
import styles from './FilmopoiskJS.module.scss';

const FilmopoiskJS = () => {
    return <iframe
            src={`${process.env.PUBLIC_URL}/native_projects/filmopoisk_js/index.html`}
                title='Фильмопоиск JS'
                loading="lazy"
        />
}

export default FilmopoiskJS;
