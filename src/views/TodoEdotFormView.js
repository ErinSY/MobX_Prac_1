import 'date-fns';
import React, { PureComponent } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class TodoEditFormView extends PureComponent {
  render() {
    const { todo, setToDo, addTodo } = this.props; //4. view에 가져오기

    return (
      <form noValidate>
        <Grid container xs={12} spacing={3}>
          <Grid item xs={3}>
            <TextField
              margin='normal'
              id='outlined-basic'
              label='Title'
              variant='standard'
              value={todo && todo.title ? todo.title : ''}
              onChange={(event) => setToDo('title', event.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin='normal'
                id='date-picker-dialog'
                label='Date'
                format='yyyy-MM-dd'
                value={todo && todo.date ? todo.date : null}
                onChange={(date) => setToDo('date', date.valueOf())}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={addTodo} // 5. onClick이벤트에 함수전달
            variant='contained'
            color='primary'
            startIcon={<SaveIcon />}
          >
            Add
          </Button>
          &nbsp;&nbsp;
          <Button
            variant='contained'
            color='default'
            startIcon={<UpdateIcon />}
          >
            Update
          </Button>
          &nbsp;&nbsp;
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          &nbsp;&nbsp;
        </Grid>
      </form>
    );
  }
}

export default TodoEditFormView;
