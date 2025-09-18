import { ROWS_PER_PAGE } from "./const.js";

export class Model {
  constructor() {
    this.state = JSON.parse(localStorage.getItem("state")) || {
      tasks: [],
      currentPage: 1,
      filter: "all",
    };
  }

  setCurrentPage(page) {
    this.setState({
      ...this.state,
      currentPage: page,
    });
  }

  setFilter(filter) {
    this.setState({
      ...this.state,
      currentPage: 1,
      filter: filter,
    });
  }

  setState(newState) {
    this.state = newState;
    this.saveToLocalStorage();
  }

  addTask(text) {
    const task = {
      id: Date.now(),
      text,
      completed: false,
      isFavorite: false,
    };
    if (!task.text) {
      return;
    }
    this.state.tasks.push(task);
    this.saveToLocalStorage();
    this.onChange(this.state);
  }

  deleteTask(id) {
    this.state.tasks = this.state.tasks.filter((task) => task.id !== id);
    let filteredList = this.filterTaskList(this.state).filter(
      (task) => task.id !== id
    );

    if (
      Math.ceil(filteredList.length / ROWS_PER_PAGE) < this.state.currentPage
    ) {
      this.setCurrentPage(Math.ceil(filteredList.length / ROWS_PER_PAGE));
    }
    this.saveToLocalStorage();
    this.onChange(this.state);
  }

  completeTask(id) {
    let completedTask = this.filterTaskList(this.state).find(
      (task) => task.id === id
    );
    completedTask.completed = !completedTask.completed;
    let filteredListLength = this.filterTaskList(this.state).length;

    if (
      Math.ceil(filteredListLength / ROWS_PER_PAGE) < this.state.currentPage
    ) {
      this.setCurrentPage(Math.ceil(filteredListLength / ROWS_PER_PAGE));
    }
    this.saveToLocalStorage();
    this.onChange(this.state);
  }

  addToFavoriteTask(id) {
    let favoriteTask = this.state.tasks.find((task) => task.id === id);
    favoriteTask.isFavorite = !favoriteTask.isFavorite;
    let filteredListLength = this.filterTaskList(this.state).length;

    if (
      Math.ceil(filteredListLength / ROWS_PER_PAGE) < this.state.currentPage
    ) {
      this.setCurrentPage(Math.ceil(filteredListLength / ROWS_PER_PAGE));
    }
    this.saveToLocalStorage();
    this.onChange(this.state);
  }

  bindOnChange(callback) {
    this.onChange = callback;
  }

  filterTaskList(state) {
    let filteredList = [];

    if (state.filter === "all") {
      filteredList = state.tasks;
    }
    if (state.filter === "favorite") {
      filteredList = state.tasks.filter((task) => {
        return task.isFavorite;
      });
    }
    if (state.filter === "complete") {
      filteredList = state.tasks.filter((task) => {
        return task.completed;
      });
    }

    return filteredList;
  }

  getTasksPerPage(state) {
    let start = (state.currentPage - 1) * ROWS_PER_PAGE;
    let end = start + ROWS_PER_PAGE;

    return this.filterTaskList(state).slice(start, end);
  }

  saveToLocalStorage() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }
}
