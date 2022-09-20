import React, { Component } from 'react';
import TodoEditFormView from '../views/TodoEdotFormView';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import generateId from '../IDGenerator';

@inject('value')
@autobind
@observer
class TodoEditFormContainer extends Component {
  setToDo(name, values) {
    this.props.value.setTodos(name, values);
  }

  addTodo() {                 // 3. 함수추가 
    let todo = this.props.value;    // todo 가져오기
    todo = { ...todo, id: generateId(5) };  // id 값추가해주기 
    this.props.value.addTodos(todo);  //  todo 넣어주기 
  }

  render() {
    const { value } = this.props;
    return (
      <TodoEditFormView
        todo={value.todo}
        setToDo={this.setToDo}
        addTodo={this.addTodo}
      />
    );
  }
}

export default TodoEditFormContainer;
