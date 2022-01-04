import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './pages/Menu.jsx';

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from "./redux"

import './index.scss'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);