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
    const { value } = this.props;

    console.log(this.props.value.todos);
    return <TodoListView todo={value.todos} onselected={this.selectedToDo} />;
  }
}

export default TodoListContainer;
