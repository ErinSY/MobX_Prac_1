import React, { Component } from 'react';
import TodoListView from '../views/TodoListView';
import { inject, observer } from 'mobx-react'; // 6. 필요한 API import

@inject('value') // 7. 필요한 스토어 import
@observer
class TodoListContainer extends Component {
  render() {
    const { value } = this.props;
    return <TodoListView todo={value.todos} />;
  }
}

export default TodoListContainer;
