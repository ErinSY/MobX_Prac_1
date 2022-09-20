import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

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
    const { todo, onselected } = this.props;

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
                <TableRow key={todo.id} hover onClick={() => onselected(todo)}>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>
                    {moment(todo.date).format('YYYY-MM-DD')}
                  </TableCell>
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
