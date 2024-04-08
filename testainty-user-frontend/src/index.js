import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import Store from './Store/index.js';
import { Provider } from 'react-redux';
import './i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals();
