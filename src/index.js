import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import App from './components/app';

import './normalize.scss'
import './index.scss';

import { Provider } from 'react-redux';
import store from './redux/store'

window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals()