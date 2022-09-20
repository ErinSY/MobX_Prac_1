import React, { Component } from 'react';
import TodoEditFormView from '../views/TodoEdotFormView';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

@inject('value')
@autobind
@observer
class TodoEditFormContainer extends Component {
  setToDo(name, values) {
    this.props.value.setTodos(name, values);
  }

  render() {
    const { value } = this.props;
    return <TodoEditFormView todo={value.todo} setToDo={this.setToDo} />;
  }
}

export default TodoEditFormContainer;
