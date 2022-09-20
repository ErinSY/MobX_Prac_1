import { observable, action, makeAutoObservable, toJS } from 'mobx';

class TodoStore {
  constructor() {
    makeAutoObservable(this);
  }
  @observable
  todo = {};

  @observable //1. todos 배열추가
  _todos = [];

  get todos() {
    return toJS(this._todos);
  }

  @action
  setTodos = (name, value) => {
    this.todo = { ...this.todo, [name]: value };
  };

  @action // 2. 새로운 todo가 추가되는 메소드 생성
  addTodos = (todo) => {
    this._todos.push(todo);
  };
}

export default new TodoStore();
