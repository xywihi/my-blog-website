import React from "react";
import ReactDOM from 'react-dom/client'
import App from './app'
import { Provider } from 'react-redux';
import store from './store'
import favicon from './assets/favicon.ico';
// const nodeServer = require('./server');

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  );