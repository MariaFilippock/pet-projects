import {EVERY_YEAR, LOCAL_STORAGE_APP_STATE_KEY, MIN_RATING_KP, PAGE_TYPE, START_YEAR} from "./const.js";

const Store = {
    state: {
        movie: {},
        error: "",
        isLoadedListVisible: false,
        loadedList: [],
        favoritesMovieList: [],
        pageType: PAGE_TYPE.StartList,
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
        this.state.loadedList = responseData.filter((movieData) => {
            return movieData.rating.kp > MIN_RATING_KP;
        });
    },

    setPageType: function (pageType) {
        this.state.pageType = pageType;
        this.saveToLocalStorage();
    },

    saveToLocalStorage: function () {
        localStorage.setItem(LOCAL_STORAGE_APP_STATE_KEY, JSON.stringify(this.state));
    },

    initStateFromLocalStorage: function () {
        if (localStorage.getItem(LOCAL_STORAGE_APP_STATE_KEY)) {
            this.state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_STATE_KEY));
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
        if (this.isFavoriteMovie()) {
            //если повторно жму на фильм, который уже есть в списке избранного
            this.state.favoritesMovieList = this.state.favoritesMovieList.filter(
                (favMovie) => {
                    return favMovie.idMovie !== this.state.movie.idMovie;
                }
            );
        } else {
            this.state.favoritesMovieList.push({
                ...this.state.movie
            });
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

    while (nowYear > START_YEAR) {
        arr.push(nowYear.toString());
        nowYear--;
    }
    return arr;
}

export {Store};
