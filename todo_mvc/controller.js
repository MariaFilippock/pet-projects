export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    //связка модели с обновлением view
    this.model.bindOnChange(this.onTodosChanged);

    this.view.renderApp();

    this.initHandlers();

    this.onTodosChanged();
  }

  initHandlers() {
    this.view.initAddTaskHandler(this.handleAddTask);
    this.view.initRemoveTaskHandler(this.handleRemoveTask);
    this.view.initCompleteTaskHandler(this.handleCompleteTask);
    this.view.initAddToFavoriteTaskHandler(this.handleAddToFavorite);
    this.view.initSetFilter(this.handleChangeFilter);
  }

  handleAddTask = (text) => {
    this.model.addTask(text);
  };

  handleRemoveTask = (id) => {
    this.model.deleteTask(id);
    this.onTodosChanged();
  };

  handleCompleteTask = (id) => {
    this.model.completeTask(id);
    this.onTodosChanged();
  };

  handleChangePage = (page) => {
    this.model.setCurrentPage(page);
    this.onTodosChanged();
  };

  handleAddToFavorite = (id) => {
    this.model.addToFavoriteTask(id);
  };

  handleChangeFilter = (filter) => {
    this.model.setFilter(filter);
    this.onTodosChanged();
  };

  onTodosChanged = () => {
    this.view.renderFilters(this.model.state.filter);
    this.view.renderTodoList(this.model.getTasksForCurrentPage(this.model.state));
    this.view.renderPagination(
      this.model.state,
      this.model.filterTaskList(this.model.state),
      this.handleChangePage
    );
  };
}
