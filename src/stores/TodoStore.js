import { observable, action, makeAutoObservable } from 'mobx';

class TodoStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable
  todo = {};

  get todos() {
    return this.todo;
  }

  @action
  setTodos = (name, value) => {
    this.todo = { ...this.todo, [name]: value };
  };
}

export default new TodoStore();
