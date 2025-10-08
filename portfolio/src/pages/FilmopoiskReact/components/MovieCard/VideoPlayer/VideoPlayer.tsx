import React, {useEffect, useState} from 'react';
import styles from './VideoPlayer.module.scss';
import {IMovie} from '../../../store/reducers/movieCard-reducer';

interface IProps {
    movie: IMovie;
}

export const VideoPlayer: React.FC<IProps> = ({movie}) => {
    const trailers = Array.isArray(movie.trailers) ? movie.trailers : [];
    const [selectedTrailerUrl, setSelectTrailerUrl] = useState(
        'https://www.youtube.com/'
    );

    useEffect(() => {
        const validTrailers = Array.isArray(movie.trailers) ? movie.trailers : [];
        setSelectTrailerUrl(validTrailers[0]?.url || '');
    }, [movie.trailers]);

    const handleChangeTrailer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectTrailerUrl(e.target.value);
    };

    return (
        <div className={styles.videoPlayer}>
            {movie.trailers?.length ? (
                <>
                    <select onChange={handleChangeTrailer} value={selectedTrailerUrl}>
                        {trailers.map((trailer) => (
                            <option
                                key={`${trailer.url ? trailer.url : trailer.name}`}
                                value={`${trailer.url ? trailer.url : trailer.name}`}
                            >
                                {trailer.name}
                            </option>
                        ))}
                    </select>

                    <iframe
                        title={'Trailer'}
                        className={styles.iframePlayer}
                        src={selectedTrailerUrl}
                    />
                </>
            ) : (
                <div className={styles.undefinedVideo}>Видеоплеер отсутствует</div>
            )}
        </div>
    );
};
