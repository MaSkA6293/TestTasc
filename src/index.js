import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import allReducers from "../src/reducers";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import Task from "./component/Task";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Task />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
