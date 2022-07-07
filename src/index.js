import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import reportWebVitals from './reportWebVitals';

import './normalize.scss'
import './index.scss';

import { Provider } from 'react-redux';
import store from './redux/store'

window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals()