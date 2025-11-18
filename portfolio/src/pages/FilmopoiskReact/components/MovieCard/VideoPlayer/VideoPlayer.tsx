import React, {useEffect, useMemo, useState} from 'react';
import styles from './VideoPlayer.module.scss';
import {IMovie} from 'pages/FilmopoiskReact/Models';
import {useNavigate} from 'react-router-dom';
import {MAX_ELEMENT_COUNT, ROUTES} from 'pages/FilmopoiskReact/const';

interface IProps {
    movie: IMovie;
    videoContainer: React.RefObject<HTMLDivElement>;
}

export const VideoPlayer: React.FC<IProps> = ({movie, videoContainer}) => {
    const trailers = useMemo(() => movie?.trailers?.filter((trailer) => trailer.url) || [], [movie.trailers]);
    const [selectedTrailerUrl, setSelectTrailerUrl] = useState('https://www.youtube.com/');
    const navigate = useNavigate();

    useEffect(() => {
        setSelectTrailerUrl(trailers[0]?.url || '');
    }, [trailers]);

    const handleChangeTrailer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectTrailerUrl(e.target.value);
    };

    const handleSearchMovieById = (id: number) => {
        if (!id) {
            return;
        }
        navigate(`${ROUTES.MOVIE_CARD}/${id}`);

    };

    return (
        <div className={styles.videoPlayer} ref={videoContainer}>
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
                <div className={styles.undefinedVideo}>Видео отсутствует</div>
            )}
            {movie.similarMovies?.length && (
                <div className={styles.similarMoviesContainer}>
                    <h3 className={styles.similarMovieTitle}>Похожие фильмы</h3>
                    <div className={styles.similarMovieList}>
                        {movie.similarMovies.slice(0, MAX_ELEMENT_COUNT).map((similarMovie) => {
                            return (
                                <div className={styles.similarMovieItem} key={similarMovie.id}
                                     onClick={() => handleSearchMovieById(similarMovie.id)}>
                                    <img alt="Фильм" className={styles.similarMoviePoster} src={similarMovie?.poster?.url || ''}/>
                                    <div className={styles.similarMovieName}>{similarMovie.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
