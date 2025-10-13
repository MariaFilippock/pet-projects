import {EVERY_YEAR} from "./const.js";

const Store = {
    state: {
        movie: {},
        error: "",
        isLoadedListVisible: false,
        loadedList: [],
        favoritesMovieList: [],
        pageType: "FilmList",
        moviesList: [],

        sideBarFilter: {
            genre: "приключения",
            type: "movie",
            year: EVERY_YEAR,
        },

        isLoading: false,

        pagination: {
            chosenPage: 1,
            pages: 1,
        },
    },

    GENRES_MAP: {
        adventure: "приключения",
        cartoons: "мультфильм",
        fantasy: "фантастика",
        criminal: "криминал",
        thriller: "триллер",
        detective: "детектив",
        drama: "драма",
        comedy: "комедия",
        horror: "ужасы",
        action: "боевик",
        sport: "спорт",
        shortFilm: "короткометражка",
    },

    FILM_TYPES: [
        {
            id: "movie",
            text: "фильмы",
            icon: "film-outline",
        },

        {
            id: "tv-series",
            text: "сериалы",
            icon: "videocam-outline",
        },

        {
            id: "cartoon",
            text: "мультифильмы",
            icon: "color-palette-outline",
        },
    ],

    years: getYearsArray(),

    setListOfMovies: function (responseData) {
        //получаем данные по фильмам по введенным значениям
        this.state.loadedList = responseData.filter((movieData) => {
            return movieData.rating.kp > 5;
        });
    },

    setPageType: function (pageType) {
        this.state.pageType = pageType;
        this.saveToLocalStorage();
    },

    saveToLocalStorage: function () {
        localStorage.setItem("state", JSON.stringify(this.state));
    },

    initStateFromLocalStorage: function () {
        if (localStorage.getItem("state")) {
            // get - получить данные по ключу (в данном случае ключ: state)
            this.state = JSON.parse(localStorage.getItem("state"));
        }
    },

    updateMoviesList: function (responseMoviesData) {
        this.state.moviesList = responseMoviesData;
        this.saveToLocalStorage();
    },

    updateMovieInfo: function (doc) {
        if (doc.id) {
            this.state.movie = {
                poster: doc.poster?.url,
                name: doc.name,
                year: doc.year,
                alternativeName: doc.alternativeName,
                ageRating: doc.ageRating,
                shortDescription: doc.shortDescription,
                countryName: doc.countries[0]?.name,
                genres: doc.genres,
                movieLength: doc.movieLength,
                ratingKp: doc.rating?.kp,
                votesKp: doc.votes?.kp,
                filmCritics: doc.votes?.filmCritics,
                description: doc.description,
                idMovie: doc.id,
                selectedTrailer: doc.videos?.trailers[0] || null,
                isSerial: doc.isSeries,
                seriesLength: doc.seriesLength,
                trailers: doc.videos?.trailers || null,
                persons: doc.persons || null,
                sequelsAndPrequels: doc.sequelsAndPrequels || null,
                similarMovies: doc.similarMovies || null,
            };
        } else {
            this.state.movie = doc;
        }

        this.saveToLocalStorage();
    },

    //получение данных по выбранному видеоплееру
    getSelectedTrailerUrl: function () {
        const trailers = this.state.movie.trailers;
        const selected = this.state.movie.selectedTrailer;

        if (!Array.isArray(trailers) || !selected) {
            return null;
        }

        let chosenPlayer = trailers.find((player) => {
            return player.url === selected.url;
        });

        return chosenPlayer ? chosenPlayer?.url : null;
    },

    changeCurrentFavoriteMovie: function () {
        if (!this.isFavoriteMovie()) {
            this.state.favoritesMovieList.push({
                ...this.state.movie
            });
        } else {
            //если повторно жму на фильм, который уже есть в списке избранного
            this.state.favoritesMovieList = this.state.favoritesMovieList.filter(
                (favMovie) => {
                    return favMovie.idMovie !== this.state.movie.idMovie;
                }
            );
        }
        this.saveToLocalStorage();
    },

    setSelectedVideoPlayer: function (value) {
        this.state.movie.selectedTrailer = this.state.movie.trailers.find((trailer) => trailer.name === value);
    },

    isFavoriteMovie: function () {
        return this.state.favoritesMovieList.some((favMovie) => {
            return favMovie.idMovie === this.state.movie.idMovie;
        });
    },

    setIsLoadedListVisible: function (isVisible) {
        this.state.isLoadedListVisible = isVisible;
    },

    //сохраняем текстовку
    setSideBarFilter: function (filter) {
        this.state.sideBarFilter = {...this.state.sideBarFilter, ...filter};
        this.saveToLocalStorage();
    },

    setIsLoading: function (isLoading) {
        this.state.isLoading = isLoading;
    },

    setPagesQuantity: function (pages) {
        this.state.pagination.pages = pages;
    },

    setPageNumber: function (page) {
        this.state.pagination.chosenPage = Number(page);
    },
};

function getYearsArray() {
    let arr = [];
    let nowYear = new Date().getFullYear();

    while (nowYear > 1990) {
        arr.push(nowYear.toString());
        nowYear--;
    }
    return arr;
}

export {Store};
