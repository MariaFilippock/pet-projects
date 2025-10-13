import {Store} from "../../../store.js";
import {MAX_PAGES_COUNT, CORNER_PAGE_COUNT} from "../../../const.js";

const Content = document.getElementById('wrapper');

export function renderFilmList() {
    const isMainScreen = Store.state.pageType === 'StartList';
    Content.innerHTML = `
            <div>
                <div>${isMainScreen ? '<span class="reccomend-message">Рекомендуем присмотреться к фильмам из подборки ТОП-250:</span>' : ''}</div>

                <div id="film-list-group" class="film-list-group">${createFilmList()}</div>

                <div id="page-container">
                    <span id='previous-page' class='next'> <ion-icon name="chevron-back-outline"></ion-icon> </span>
                    ${createPagination()}
                    <span id='next-page' class='next'> <ion-icon name="chevron-forward-outline"></ion-icon> </span>
                </div>
            </div>`;
}

function createFilmList() {
    return Store.state.moviesList?.map((listItem) => {
        return `<div id = '${listItem.id}' class = "film-list-element ">
            <img src = '${listItem.poster?.url}' alt = "${listItem.name}" />
            <span>${listItem.name}</span>       
        </div>`
    }).join(' ');
}

function calculatePagination() {
    let pagesCount = Store.state.pagination.pages;
    let chosenPage = Store.state.pagination.chosenPage;
    let pagination = [];
    if (pagesCount < MAX_PAGES_COUNT) {
        pagination = [...Array(pagesCount).keys()].map(i => i + 1);
    } else if (chosenPage < CORNER_PAGE_COUNT) {
        pagination = [...Array(CORNER_PAGE_COUNT).keys()].map(i => i + 1);
        pagination.push('...', pagesCount);
    } else if (pagesCount - chosenPage < CORNER_PAGE_COUNT - 1) {
        pagination = [1, '...', pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
    } else {
        pagination = [1, '...', chosenPage - 1, chosenPage, chosenPage + 1, '...', pagesCount];
    }
    return pagination;
}

function createPagination() {
    const pageArray = calculatePagination();

    const allPages = pageArray.map((pageEl) => {
        return `<span id='${pageEl === '...' ? '' : pageEl}' class='page ${Store.state.pagination.chosenPage === pageEl ? 'active' : ''}'>${pageEl}</span>`
    });

    return allPages.join('');
}
