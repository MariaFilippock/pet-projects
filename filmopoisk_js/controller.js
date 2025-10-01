import {
    // loadVideoPlayersByMovieId,
    getMoviesByFirstLetters,
    getMoviesById,
    // fetchMovieAndVideoDataById,
    fetchMovie,
    fetchRandomMovies,
} from "./api.js";
import {EVERY_YEAR} from "./const.js";
import {Store} from "./store.js";
import {renderSideBar} from "./src/components/SideBar/SideBar.js";
import {renderMovieCard} from "./src/components/MovieCard/MovieCard.js";
import {renderFilmList} from "./src/components/MovieList/MovieList.js";
import {renderDropdownMovieList} from "./src/components/DropdownMovieList/DropdownMovieList.js";

const searchBtn = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");
const formSearch = document.getElementById("form-search");
const navBrand = document.getElementById("nav-brand");
const loader = document.getElementById("preloader-wrapper");

searchBtn.addEventListener("click", handleSearchMovieByName);
searchInput.addEventListener("input", handleShowDropdownMovieList);
document.addEventListener("click", handleClickOutsideSearchInput);
navBrand.addEventListener("click", handleShowRandomFilmList);

function renderLoader() {
    return Store.state.isLoading
        ? loader.classList.remove("hidden")
        : loader.classList.add("hidden");
}

function resetPaginationAndRender(pageNumber) {
    Store.setPageNumber(pageNumber);
    Store.setIsLoading(true);
    render();
}

//убираем выпадающий список с предложениями фильмов
function handleClickOutsideSearchInput(event) {
    if (formSearch.contains(event.target)) {
        return;
    }

    Store.setIsLoadedListVisible(false);
    renderDropdownMovieList();
    initDropdownMovieListEvent();
    searchInput.value = "";
}

function handleYearsNavItemClick(event) {
    if (event.target.id === document.getElementById("year-search").id) {
        return;
    }

    if (Store.state.sideBarFilter.year !== event.target.value) {
        Store.setSideBarFilter({
            year: event.target.value === "Любой" ? EVERY_YEAR : event.target.value,
        });
    }

    resetPaginationAndRender(1);

    fetchMovie(Store.state.sideBarFilter, Store.state.pagination.chosenPage).then(
        (responseMoviesData) => {
            Store.setPagesQuantity(responseMoviesData.pages);
            Store.setPageType("FilmList");
            Store.updateMoviesList(responseMoviesData.docs);
            Store.setIsLoading(false);
            render();
        }
    );
}

function handleShowRandomFilmList() {
    resetPaginationAndRender(1);

    fetchRandomMovies(Store.state.pagination.chosenPage).then(
        (responseMoviesData) => {
            Store.setPagesQuantity(responseMoviesData.pages);
            Store.setPageType("StartList");
            Store.updateMoviesList(responseMoviesData.docs);
            Store.setIsLoading(false);
            render();
        }
    );
}

function handleTypesNavItemClick(event) {
    //проверка для клика по нужному элементу
    const navItemTypeId = event.target.id;
    if (navItemTypeId === document.getElementById("types-search").id) {
        return;
    }
    if (Store.state.sideBarFilter.type !== navItemTypeId) {
        Store.setSideBarFilter({type: navItemTypeId});
    }

    resetPaginationAndRender(1);

    fetchMovie(Store.state.sideBarFilter, Store.state.pagination.chosenPage).then(
        (responseMoviesData) => {
            Store.setPagesQuantity(responseMoviesData.pages);
            Store.setPageType("FilmList");
            Store.updateMoviesList(responseMoviesData.docs);
            Store.setIsLoading(false);
            render();
        }
    );
}

function handleGenresNavItemClick(event) {
    //проверка для клика по нужному элементу
    const genresSearchContainerId = document.getElementById("genres-search")?.id;
    if (event.target.id === genresSearchContainerId) {
        return;
    }

    if (Store.state.sideBarFilter.genre !== event.target.textContent) {
        Store.setSideBarFilter({genre: event.target.textContent});
    }

    resetPaginationAndRender(1);

    fetchMovie(Store.state.sideBarFilter, Store.state.pagination.chosenPage).then(
        (responseMoviesData) => {
            Store.setPagesQuantity(responseMoviesData.pages);
            Store.setPageType("FilmList");
            Store.updateMoviesList(responseMoviesData.docs);
            Store.setIsLoading(false);
            render();
        }
    );
}

//пагинация
function handlePageClick(event) {
    let pageID = event.target.id;

    if (!pageID) {
        return;
    }

    Store.setPageNumber(pageID);
    loadByPage();
}

//выбор фильма из списка по фильтрам
function handleFindMovieFromFilmList(event) {
    let parentNode = event.target.closest(".film-list-element");
    onCardClick(parentNode.id);
}

function handlePreviousPageClick() {
    if (Store.state.pagination.chosenPage > 1) {
        Store.setPageNumber(Store.state.pagination.chosenPage - 1);
    }
    //загружаю новую страницу со списком фильмов при клике на стрелку "назад"
    loadByPage();
}

function handleNextPageClick() {
    if (Store.state.pagination.chosenPage < Store.state.pagination.pages) {
        Store.setPageNumber(Store.state.pagination.chosenPage + 1);
    }
    //загружаю новую страницу со списком фильмов при клике на стрелку "вперед"
    loadByPage();
}

//загружаю новую страницу со списком фильмов при клике на стрелку "вперед", "назад" или номер страницы
function loadByPage() {
    Store.setIsLoading(true);
    render();

    const request =
        Store.state.pageType === "StartList"
            ? fetchRandomMovies(Store.state.pagination.chosenPage)
            : fetchMovie(
                Store.state.sideBarFilter,
                Store.state.pagination.chosenPage
            );

    request.then((responseMoviesData) => {
        Store.updateMoviesList(responseMoviesData.docs);
        Store.setIsLoading(false);
        render();
    });
}

function handleShowDropdownMovieList(event) {
    event.preventDefault();
    Store.setIsLoadedListVisible(true);

    getMoviesByFirstLetters(searchInput.value).then((responseData) => {
        if (responseData) {
            Store.setListOfMovies(responseData.docs);
        }
        renderDropdownMovieList();
        initDropdownMovieListEvent();
    });
}

function initDropdownMovieListEvent() {
    const dropdownListMovies = document.getElementById("dropdown-list-movies");
    //слушатель, если клик по одному из фильмов
    if (dropdownListMovies) {
        dropdownListMovies.addEventListener(
            "click",
            handleFindMovieIdAtDropdownList
        );
    }
}

//поиск данных по фильму из выпадающего списка в поиске
function handleFindMovieIdAtDropdownList(event) {
    Store.setIsLoading(true);
    render();

    let parentNode = event.target.closest(".dropdown-movie-item");
    let parentNodeID = Number(parentNode.id);

    getMoviesById(parentNodeID).then((responseData) => {
    // fetchMovieAndVideoDataById(parentNodeID).then((responseData) => {
        Store.updateMovieInfo(responseData);
        Store.setPageType("FilmCard");
        Store.setIsLoading(false);
        render();
    });
}

function handleSearchMovieByName(event) {
    event.preventDefault();

    if (!searchInput.value) {
        return;
    }

    Store.setIsLoading(true);
    render();


    getMoviesByFirstLetters(searchInput.value).then((responseData) => {
        let movieData = responseData.docs.find((film) => film.name === searchInput.value);
        if (responseData) {
            console.log(responseData);
            Store.updateMovieInfo(movieData);
            Store.setPageType("FilmCard");
            Store.setIsLoading(false);
            searchInput.value = "";
            render();
        }
    });
}

function handleFindMovieIdAtFavoriteList(event) {
    let parentNode = event.target.closest(".favorite-movie-item");
    onCardClick(Number(parentNode.id));
}

function handleSequelsPrequelsClick(event) {
    let parentNode = event.target.closest(".sequel-prequel-item");
    onCardClick(Number(parentNode.id));
}

function handleSimilarMoviesClick(event) {
    let parentNode = event.target.closest(".similar-movie-item");
    debugger
    onCardClick(Number(parentNode.id));
}

function onCardClick(movieId) {
    Store.setIsLoading(true);
    render();

    let foundFilm = Store.state.favoritesMovieList.find((favorite) => favorite.idMovie === movieId);

    if (foundFilm) {
        Store.updateMovieInfo(foundFilm);
        Store.setPageType("FilmCard");
        Store.setIsLoading(false);
        render();
    } else {
        getMoviesById(movieId).then((responseData) => {
            Store.updateMovieInfo(responseData);
            Store.setPageType("FilmCard");
            Store.setIsLoading(false);
            render();
        });
    }

}

//выбор плеера из выпадающего списка и отрисовка
function handleSearchPlayerAtSelect(event) {
    Store.setSelectedVideoPlayer(event.target.value);
    Store.setPageType("FilmCard");
    render();
}

//клик, чтобы добавить в избранное
function handleClickFavorites() {
    Store.changeCurrentFavoriteMovie();
    Store.setPageType("FilmCard");
    render();
}

function initSideBarEvents() {
    const genresSearchContainer = document.getElementById("genres-search");
    const typesSearchContainer = document.getElementById("types-search");
    const selectYear = document.getElementById("years-film-list");

    genresSearchContainer.addEventListener("click", handleGenresNavItemClick);
    typesSearchContainer.addEventListener("click", handleTypesNavItemClick);
    selectYear?.addEventListener("change", handleYearsNavItemClick);
}

function initFilmListEvents() {
    const filmListGroup = document.getElementById("film-list-group");
    const paginationGroup = document.getElementById("page-container");
    const nextPage = document.getElementById("next-page");
    const previousPage = document.getElementById("previous-page");

    filmListGroup.addEventListener("click", handleFindMovieFromFilmList);
    paginationGroup.addEventListener("click", handlePageClick);
    nextPage.addEventListener("click", handleNextPageClick);
    previousPage.addEventListener("click", handlePreviousPageClick);
}

function render() {
    renderLoader();
    renderSideBar();
    initSideBarEvents();
    if (Store.state.pageType === "FilmCard") {
        renderMovieCard();
        initMovieCardEvents();
    } else {
        renderFilmList();
        initFilmListEvents();
    }
}

function initMovieCardEvents() {
    const selectPlayer = document.getElementById("select-player");
    const watchBtn = document.getElementById("watch-btn");
    const addToFavorites = document.getElementById("add-to-favorites");
    const favoritesList = document.getElementById("favorites-list");
    const genresList = document.getElementById("genres-list");
    const sequelsPrequelsContainer = document.getElementById("sequels-and-prequels-container");
    const similarMoviesContainer =document.getElementById("similar-movies-container");

    selectPlayer?.addEventListener("change", handleSearchPlayerAtSelect);
    watchBtn.addEventListener("click", () => {
        document
            .getElementById("iframe-player")
            .scrollIntoView({behavior: "smooth"});
    });
    addToFavorites.addEventListener("click", handleClickFavorites);
    favoritesList?.addEventListener("click", handleFindMovieIdAtFavoriteList);
    genresList?.addEventListener("click", handleGenresNavItemClick);
    sequelsPrequelsContainer?.addEventListener("click", handleSequelsPrequelsClick);
    similarMoviesContainer?.addEventListener("click", handleSimilarMoviesClick);
}

export function startApp() {
    Store.initStateFromLocalStorage();
    Store.setIsLoading(false);
    render();
}
