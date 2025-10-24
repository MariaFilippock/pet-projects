import {
    getMoviesByFirstLetters,
    getMoviesById,
    fetchMovie,
    fetchRandomMovies,
} from "./api.js";
import {EVERY_YEAR, FILTER_YEAR_TYPE, PAGE_TYPE} from "./const.js";
import {Store} from "./store.js";
import {renderSideBar} from "./src/components/SideBar/SideBar.js";
import {renderMovieCard} from "./src/components/MovieCard/MovieCard.js";
import {renderFilmList} from "./src/components/MovieList/MovieList.js";
import {renderDropdownMovieList} from "./src/components/DropdownMovieList/DropdownMovieList.js";

const root = document.getElementById('root');

document.addEventListener("click", handleClickOutsideSearchInput);

function renderApp() {
    root.innerHTML = `<div id="preloader-wrapper" class="preloader-wrapper">
        <div id="preloader"></div>
    </div>

    <nav class="header">
        <div class="search-container">
            <div class="nav-brand" id="nav-brand">Фильмопоиск</div>
            <div class="form-search" id="form-search">
                <input id="search-input" type="text" placeholder="Фильмы" autoComplete="off">
                    <div id="btn-search" class="btn-search">
                        <ion-icon name="search-outline"></ion-icon>
                    </div>
                    <div id="dropdown-container"></div>
            </div>
        </div>
    </nav>

    <div class="container">
        <div id="wrapper-sidebar" class="wrapper-sidebar"></div>
        <div id="wrapper" class="wrapper"></div>
    </div>`

    attachHTMLElementsHandlers();
}

function throttle(fn, wait) {
    let shouldThrottle = false;

    return function (...args) {
        if (!shouldThrottle) {
            fn.apply(this, args);
            shouldThrottle = true;
            setTimeout(() => {
                shouldThrottle = false;
            }, wait)
        }
    }
}

export function getHTMLElements() {
    return {
        searchBtn: document.getElementById("btn-search"),
        searchInput: document.getElementById("search-input"),
        formSearch: document.getElementById("form-search"),
        navBrand: document.getElementById("nav-brand"),
        loader: document.getElementById("preloader-wrapper"),
        wrapperSidebar: document.getElementById("wrapper-sidebar"),
        dropdownContainer: document.getElementById('dropdown-container'),
        wrapper: document.getElementById('wrapper'),
    }
}

function attachHTMLElementsHandlers() {
    const elements = getHTMLElements();

    elements.searchBtn.addEventListener("click", handleSearchMovieByName);
    elements.searchInput.addEventListener("input", throttledHandleShowDropdownMovieList);
    elements.navBrand.addEventListener("click", handleShowRandomFilmList);
}


function renderLoader() {
    const loader = getHTMLElements().loader;

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
    const formSearch = getHTMLElements().formSearch;
    const searchInput = getHTMLElements().searchInput;

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
            year: event.target.value === FILTER_YEAR_TYPE ? EVERY_YEAR : event.target.value,
        });
    }

    resetPaginationAndRender(1);

    fetchMovie(Store.state.sideBarFilter, Store.state.pagination.chosenPage).then(
        (responseMoviesData) => {
            Store.setPagesQuantity(responseMoviesData.pages);
            Store.setPageType(PAGE_TYPE.FilmList);
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
            Store.setPageType(PAGE_TYPE.StartList);
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
            Store.setPageType(PAGE_TYPE.FilmList);
            Store.updateMoviesList(responseMoviesData.docs);
            Store.setIsLoading(false);
            render();
        }
    );
}

function handleGenresNavItemClick(event) {
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
            Store.setPageType(PAGE_TYPE.FilmList);
            Store.updateMoviesList(responseMoviesData.docs);
            Store.setIsLoading(false);
            render();
        }
    );
}

function handlePageClick(event) {
    const pageID = event.target.id;

    if (!pageID) {
        return;
    }

    Store.setPageNumber(pageID);
    loadByPage();
}

//выбор фильма из списка по фильтрам
function handleFindMovieFromFilmList(event) {
    const parentNode = event.target.closest(".film-list-element");
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
        Store.state.pageType === PAGE_TYPE.StartList
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

const throttledHandleShowDropdownMovieList = throttle((event) => {
    event.preventDefault();

    const searchInput = getHTMLElements().searchInput;
    const query = searchInput.value.trim();

    if (!query) {
        Store.setListOfMovies([]);
        renderDropdownMovieList();
        return;
    }

    Store.setIsLoadedListVisible(true);

    getMoviesByFirstLetters(query).then((responseData) => {
        if (responseData) {
            Store.setListOfMovies(responseData.docs);
        }
        renderDropdownMovieList();
        initDropdownMovieListEvent();
    });
}, 2000);

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

    const parentNode = event.target.closest(".dropdown-movie-item");
    const parentNodeID = Number(parentNode.id);

    getMoviesById(parentNodeID).then((responseData) => {
        Store.updateMovieInfo(responseData);
        Store.setPageType(PAGE_TYPE.FilmCard);
        Store.setIsLoading(false);
        render();
    });
}

function handleSearchMovieByName(event) {
    event.preventDefault();

    const searchInput = getHTMLElements().searchInput;

    if (!searchInput.value) {
        return;
    }

    Store.setIsLoading(true);
    render();


    getMoviesByFirstLetters(searchInput.value).then((responseData) => {
        const searchInput = getHTMLElements().searchInput;
        const movieData = responseData.docs.find((film) => film.name === searchInput.value);

        if (responseData) {
            Store.updateMovieInfo(movieData);
            Store.setPageType(PAGE_TYPE.FilmCard);
            Store.setIsLoading(false);
            searchInput.value = "";
            render();
        }
    });
}

function handleFindMovieIdAtFavoriteList(event) {
    const parentNode = event.target.closest(".favorite-movie-item");
    onCardClick(Number(parentNode.id));
}

function handleSequelsPrequelsClick(event) {
    const parentNode = event.target.closest(".sequel-prequel-item");
    onCardClick(Number(parentNode.id));
}

function handleSimilarMoviesClick(event) {
    const parentNode = event.target.closest(".similar-movie-item");
    onCardClick(Number(parentNode.id));
}

function onCardClick(movieId) {
    Store.setIsLoading(true);
    render();

    const foundFilm = Store.state.favoritesMovieList.find((favorite) => favorite.idMovie === movieId);

    if (foundFilm) {
        Store.updateMovieInfo(foundFilm);
        Store.setPageType(PAGE_TYPE.FilmCard);
        Store.setIsLoading(false);
        render();
    } else {
        getMoviesById(movieId).then((responseData) => {
            Store.updateMovieInfo(responseData);
            Store.setPageType(PAGE_TYPE.FilmCard);
            Store.setIsLoading(false);
            render();
        });
    }

}

//выбор плеера из выпадающего списка и отрисовка
function handleSearchPlayerAtSelect(event) {
    Store.setSelectedVideoPlayer(event.target.value);
    Store.setPageType(PAGE_TYPE.FilmCard);
    render();
}

//клик, чтобы добавить в избранное
function handleClickFavorites() {
    Store.changeCurrentFavoriteMovie();
    Store.setPageType(PAGE_TYPE.FilmCard);
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
    if (Store.state.pageType === PAGE_TYPE.FilmCard) {
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
    const similarMoviesContainer = document.getElementById("similar-movies-container");

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
    renderApp();
    Store.initStateFromLocalStorage();
    Store.setIsLoading(false);
    render();
}
