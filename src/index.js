import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// ReactDOM.render(
//   <Provider store={createStore(reducers)}>
//     <App />
//   </Provider>,
//   document.querySelector("#root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducers, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
