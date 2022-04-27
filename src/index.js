import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import mainReducer from './slices/main';
import settingsReducer from './slices/settings';

const root = createRoot(document.getElementById("root"));

const rootReducer = combineReducers({
  main: mainReducer,
  settings: settingsReducer,
});
const store = configureStore({ reducer: rootReducer });

root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
