import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/app";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { session, setAuthorizationToken } from "./helpers";
import { loginActions } from "./redux/auth/auth.action";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.getItem("jtoken")) {
  setAuthorizationToken(session.getToken());
  store.dispatch(loginActions.setCurrentUser(session.getUser()));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
