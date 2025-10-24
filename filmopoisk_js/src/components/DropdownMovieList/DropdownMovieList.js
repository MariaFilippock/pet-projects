import {Store} from "../../../store.js";
import {MAX_VISIBLE_DROPDOWN_FILMS} from "../../../const.js";
import {getHTMLElements} from "../../../controller.js";


//отрисовка выпадающего списка и слушатель на клик по одному из выпадающего списка фильму
export function renderDropdownMovieList() {
    const dropdownContainer = getHTMLElements().dropdownContainer;

    if (!dropdownContainer) {
        return;
    }

    dropdownContainer.innerHTML = Store.state.isLoadedListVisible ? `<div class="dropdown-list-movies" id="dropdown-list-movies">
                                 ${createDropdownMovieList()}
                                 </div>` : '';
}

function createDropdownMovieList() {
    const list = Store.state.loadedList.map((movieEl) => {
        return `<div class="dropdown-movie-item" id = '${movieEl.id}'>${movieEl.name} 
                    <span class="dropdown-movie-rating">${Number(movieEl.rating.kp) > 0 ? movieEl.rating.kp.toFixed(1) : ''}</span>
                </div>`
    }).slice(0, MAX_VISIBLE_DROPDOWN_FILMS);

    return list.join(' ');
}
