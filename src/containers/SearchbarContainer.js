import React, { Component } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { inject, observer } from 'mobx-react';

@inject('value')
@observer
class SearchbarContainer extends Component {
  setSearchText(searchText) {
    this.props.value.setSearchText(searchText);
  }

  render() {
    return (
      <TextField
        onChange={(e) => this.setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export default SearchbarContainer;
