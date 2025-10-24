import {Store} from "../../../store.js";
import {getHTMLElements} from "../../../controller.js";
import {PAGE_TYPE} from "../../../const.js";

export function renderSideBar() {
    const wrapperSidebar = getHTMLElements().wrapperSidebar;

    if (!wrapperSidebar) {
        return;
    }

    wrapperSidebar.innerHTML = `
        <div id="types-search" class="types-search">
            ${createFilmTypesSideBar()}
        </div>

        <div id="genres-search" class="genres-search">
            ${createGenresSidebar()}
        </div>

        <div id="year-search" class="year-search">
            <span class="year-search-title">Год выпуска</span>
            ${createYearsSidebar()}
        </div>`;
}

function createFilmTypesSideBar() {
    return Store.FILM_TYPES.map((typeObj) => {
        const isChosen =
            Store.state.sideBarFilter.type === typeObj.id &&
            Store.state.pageType === PAGE_TYPE.FilmList;

        return `<div id="${typeObj.id}" class="${
            isChosen ? "chosen" : ""
        }"><span><ion-icon name="${typeObj.icon}"></ion-icon></span>    ${
            typeObj.text
        }</div>`;
    }).join("");
}

function createGenresSidebar() {
    const genresArray = Object.keys(Store.GENRES_MAP);

    return genresArray
        .map((genre) => {
            const isChosen =
                Store.state.sideBarFilter.genre === Store.GENRES_MAP[genre] &&
                Store.state.pageType === PAGE_TYPE.FilmList;

            return `<span id='${genre}' class='${isChosen ? "chosen" : ""}'>${
                Store.GENRES_MAP[genre]
            }</span>`;
        })
        .join("");
}

function createYearsSidebar() {
    const yearsAll = Store.years.map((yearData) => {
        return `<option class="year-film-element" value='${yearData}' ${
            yearData === Store.state.sideBarFilter.year ? "selected" : ``
        }>${yearData}</option>`;
    });

    return `<select id="years-film-list" class="years-film-list">
            <option class="year-film-element" value='every-year'>Любой</option>
            ${yearsAll.join(" ")}
            </select>`;
}
