import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StoreContext } from "redux-react-hook";
import App from "./App";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);
