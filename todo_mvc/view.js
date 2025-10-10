import {FILTER_TYPE, ROWS_PER_PAGE} from "./const.js";

export class View {
    constructor() {
        this.root = document.getElementById("root");
    }

    _attachHTMLElements() {
        this.form = document.getElementById("form-input");
        this.input = document.querySelector(".search-input");
        this.list = document.querySelector(".todos-container");
        this.pages = document.querySelector(".container-pages");
        this.filters = document.querySelector(".filters-container");
    }

    get _todoTask() {
        return this.input.value;
    }

    _clearInput() {
        this.input.value = "";
    }

    initAddTaskHandler(handler) {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this._todoTask) {
                handler(this._todoTask);
                this._clearInput();
            }
        });
    }

    initSetFilter(handler) {
        this.filters.addEventListener("click", (e) => {
            if (e.target.id) {
                handler(e.target.id);
            }
        });
    }

    getId(e, handler) {
        const li = e.target.closest('li');
        if (!li) return;
        handler(Number(li.id));
    }

    initRemoveTaskHandler(handler) {
        this.list.addEventListener("click", (e) => {
            if (e.target.dataset.action === "delete") {
                this.getId(e, handler);
            }
        });
    }

    initCompleteTaskHandler(handler) {
        this.list.addEventListener("click", (e) => {
            if (e.target.dataset.action === "completed") {
                this.getId(e, handler);
            }
        });
    }

    initAddToFavoriteTaskHandler(handler) {
        this.list.addEventListener("click", (e) => {
            if (e.target.dataset.action === "favorites") {
                this.getId(e, handler);
            }
        });
    }

    renderPagination(state, todos, handler) {
        let pageCount = Math.ceil(todos.length / ROWS_PER_PAGE);
        this.pages.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                handler(Number(e.target.id));
            }
        });

        let buttons = "";

        for (let i = 0; i < pageCount; i++) {
            buttons += `<button class="${
                state.currentPage === i + 1 ? "currentPage page-btn" : "page-btn"
            }" id="${i + 1}">
          ${i + 1}
        </button>`;
        }

        this.pages.innerHTML = buttons;
    }

    renderFilters(filter) {
        this.filters.innerHTML = `
            <div id=${FILTER_TYPE.all} class="${
            filter === FILTER_TYPE.all ? "all active" : FILTER_TYPE.all
        }">Все задачи</div>
                <div id=${FILTER_TYPE.complete} class="${
            filter === FILTER_TYPE.complete ? "complete active" : FILTER_TYPE.complete
        }">Выполненные</div>
                <div id=${FILTER_TYPE.favorite} class="${
            filter === FILTER_TYPE.favorite ? "favorite active" : FILTER_TYPE.favorite
        }">Избранное</div>
            `;
    }

    renderTodoList(todos) {
        let displayList = "";

        if (todos.length > 0) {
            todos.forEach((todo) => {
                displayList += `
                    <li id=${todo.id}>
                        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
                        <div class="todo-buttons">
                            <button data-action="favorites" class="${
                    todo.isFavorite ? "favorite-task" : ""
                }">★</button>
                            <button data-action="completed" class="${
                    todo.completed ? "completed-task" : ""
                }">✔</button>
                            <button data-action="delete">✖</button>
                        </div>
                    </li>`;
            });
        }

        this.list.innerHTML = displayList;
    }

    renderApp() {
        this.root.innerHTML = `
            <h1>TODO APP</h1>
            <div class="container">
                 <form id="form-input" class="form">
                      <input type="text" class="search-input" placeholder="Добавьте новую задачу..." />
                      <button class="add-button" type="submit">Добавить</button>
                 </form>
                 <div class="filters-container"></div>
                 <div class="todos-container"></div>
                 <div class="container-pages"></div>
            </div>`;

        this._attachHTMLElements();
    }
}
