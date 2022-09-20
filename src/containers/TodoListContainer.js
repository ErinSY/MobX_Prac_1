import React, { Component } from 'react';
import TodoListView from '../views/TodoListView';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

@inject('value')
@autobind
@observer
class TodoListContainer extends Component {
  selectedToDo(todo) {
    this.props.value.selectTodo(todo);
  }

  render() {
    let { todos, searchText } = this.props.value;
    todos = todos.filter(
      (todo) =>
        todo.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    return <TodoListView todo={todos} onselected={this.selectedToDo} />;
  }
}

export default TodoListContainer;
