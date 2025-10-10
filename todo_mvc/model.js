import {ROWS_PER_PAGE, LOCAL_STORAGE_APP_STATE_KEY, FILTER_TYPE} from "./const.js";

export class Model {
    constructor() {
        this.state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_STATE_KEY)) || {
            tasks: [],
            currentPage: 1,
            filter: FILTER_TYPE.all,
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

    setTasks(tasks) {
        this.setState({
            ...this.state,
            tasks,
        });
    }

    setState(newState) {
        this.state = newState;
        this.saveToLocalStorage();
    }

    getPageCount() {
        const filteredListLength = this.filterTaskList(this.state).length;

        return Math.ceil(filteredListLength / ROWS_PER_PAGE);
    }

    addTask(text) {
        if (!text) {
            return;
        }

        const task = {
            id: Date.now(),
            text,
            completed: false,
            isFavorite: false,
        };

        this.setTasks([...this.state.tasks, task]);
    }

    checkUpdateCurrentPage() {
        const pageCount = this.getPageCount();

        if (pageCount < this.state.currentPage) {
            this.setCurrentPage(pageCount);
        }
    }

    deleteTask(id) {
        const tasks = this.state.tasks.filter((task) => task.id !== id);

        this.setTasks(tasks);
        this.checkUpdateCurrentPage();
    }

    completeTask(id) {
        const tasks = this.state.tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed,
                }
            }
            return task;
        });

        this.setTasks(tasks);
        this.checkUpdateCurrentPage();
    }

    addToFavoriteTask(id) {
        const tasks = this.state.tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    isFavorite: !task.isFavorite,
                }
            }
            return task;
        });

        this.setTasks(tasks);
        this.checkUpdateCurrentPage();
    }

    filterTaskList(state) {
        let filteredList = [];

        if (state.filter === FILTER_TYPE.all) {
            filteredList = state.tasks;
        }
        if (state.filter === FILTER_TYPE.favorite) {
            filteredList = state.tasks.filter((task) => {
                return task.isFavorite;
            });
        }
        if (state.filter === FILTER_TYPE.complete) {
            filteredList = state.tasks.filter((task) => {
                return task.completed;
            });
        }

        return filteredList;
    }

    getTasksForCurrentPage(state) {
        const start = (state.currentPage - 1) * ROWS_PER_PAGE;
        const end = start + ROWS_PER_PAGE;

        return this.filterTaskList(state).slice(start, end);
    }

    saveToLocalStorage() {
        localStorage.setItem(LOCAL_STORAGE_APP_STATE_KEY, JSON.stringify(this.state));
    }
}
