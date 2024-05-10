import React from "react";
import ReactDOM from 'react-dom/client'
import App from './app'
import { Provider } from 'react-redux';
import store from './store'
import favicon from './assets/favicon.ico';
import { SpeedInsights } from "@vercel/speed-insights/react"
// const nodeServer = require('./server');

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
      <SpeedInsights />
    </Provider>
  );