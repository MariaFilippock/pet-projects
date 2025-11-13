import React, {useEffect, useState} from 'react';
import styles from './VideoPlayer.module.scss';
import {IMovie} from 'pages/FilmopoiskReact/Models';

interface IProps {
    movie: IMovie;
}

export const VideoPlayer: React.FC<IProps> = ({movie}) => {
    const trailers = movie?.trailers?.filter((trailer) => trailer.url) || [];
    const [selectedTrailerUrl, setSelectTrailerUrl] = useState('https://www.youtube.com/');
    console.log(movie);
    useEffect(() => {
        setSelectTrailerUrl(trailers[0]?.url || '');
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
            {movie.similarMovies?.length && (
                <div className={styles.similarMoviesContainer}>
                    <h3 className={styles.similarMovieTitle}>Похожие фильмы</h3>
                    <div className={styles.similarMovieList}>
                        {movie.similarMovies.map((similarMovie) => (
                            <div className={styles.similarMovieItem}>
                                <img alt="Фильм" className={styles.similarMoviePoster} src={similarMovie?.poster?.url || ''}/>
                                <div className={styles.similarMovieName}>${similarMovie.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
