import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core';

@observer
class TodoListView extends PureComponent {
  render() {
    const { todo } = this.props;
    console.log(todo);

    return (
      <TableContainer component={Paper}>
        <Table m={3}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(todo) && todo.length ? (
              todo.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.todo.title}</TableCell>
                  <TableCell>{todo.todo.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Empty</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default TodoListView;
