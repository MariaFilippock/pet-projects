import { ROWS_PER_PAGE } from "./const.js";

export class View {
  constructor() {
    this.root = document.getElementById("root");
  }

  _getHTMLElements() {
    this.form = document.getElementById("form-input");
    this.input = document.querySelector(".search-input");
    this.button = document.querySelector(".search-button");
    this.list = document.querySelector(".todos-container");
    this.pages = document.querySelector(".container-pages");
    this.filters = document.querySelector(".filters-container");
  }

  get _todoTask() {
    return this.input.value;
  }

  _inputClear() {
    this.input.value = "";
  }

  initAddTaskHandler(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._todoTask) {
        handler(this._todoTask);
        this._inputClear();
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

  initRemoveTaskHandler(handler) {
    this.list.addEventListener("click", (e) => {
      if (e.target.textContent === "✖") {
        handler(Number(e.target.id));
      }
    });
  }

  initCompleteTaskHandler(handler) {
    this.list.addEventListener("click", (e) => {
      if (e.target.textContent === "✔") {
        handler(Number(e.target.id));
      }
    });
  }

  initAddToFavoriteTaskHandler(handler) {
    this.list.addEventListener("click", (e) => {
      if (e.target.textContent === "★") {
        handler(Number(e.target.id));
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
    this.pages.innerHTML = "";
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
    this.filters.innerHTML = `<div id="all" class="${
      filter === "all" ? "all active" : "all"
    }">Все задачи</div>
                <div id="complete" class="${
                  filter === "complete" ? "complete active" : "complete"
                }">Выполненные</div>
                <div id="favorite" class="${
                  filter === "favorite" ? "favorite active" : "favorite"
                }">Избранное</div>`;
  }

  renderTodoList(todos) {
    let displayList = "";
    this.list.innerHTML = "";
    if (todos.length > 0) {
      todos.forEach((todo) => {
        displayList += `<li id=${todo.id}>
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <div class="todo-buttons">
        <button id=${todo.id} class="${
          todo.isFavorite ? "favorite-task" : ""
        }">★</button>
        <button id=${todo.id} class="${
          todo.completed ? "completed-task" : ""
        }">✔</button>
        <button id=${todo.id}>✖</button>
        </div>
        </li>`;

        this.list.innerHTML = displayList;
      });
    }
  }

  renderApp() {
    this.root.innerHTML = `<h1>TODO APP</h1>
        <div class="container">
            <form id="form-input" class="form">
                <input type="text" class="search-input" placeholder="Добавьте новую задачу..." />
                <button class="search-button" type="submit">Добавить</button>
            </form>
            <div class="filters-container">
            </div>
            <div class="todos-container"></div>
        <div class="container-pages"></div>
        </div>`;

    this._getHTMLElements();
  }
}
