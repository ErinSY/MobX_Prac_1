import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import TodoStore from './stores/TodoStore';

ReactDOM.render(
  <Provider value={TodoStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
