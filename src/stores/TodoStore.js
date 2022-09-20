import { observable, action, makeAutoObservable, toJS } from 'mobx';

class TodoStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable
  _todo = {};

  @observable
  _todos = [];

  get todos() {
    return toJS(this._todos);
  }
  get todo() {
    return this._todo;
  }

  @action
  setTodos = (name, value) => {
    this._todo = { ...this._todo, [name]: value };
  };

  @action
  addTodos = (todo) => {
    this._todos.push(todo);
  };

  @action
  selectTodo = (todo) => {
    this._todo = todo;
  };

  @action
  updateTodo = () => {
    let selected = this._todos.find((todo) => this._todo.id === todo.id);
    selected.title = this._todo.title;
    selected.date = this._todo.date;
    this._todo = {};
  };

  @action
  deleteTodo = () => {
    let selected = this._todos.find((todo) => this._todo.id === todo.id);
    let index = this._todos.indexOf(selected);
    this._todos.splice(index, 1);
    this._todo = {};
  };
}

export default new TodoStore();
