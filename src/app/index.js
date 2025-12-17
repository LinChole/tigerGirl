import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";
import { Provider } from 'react-redux'
// import { ThemeProvider } from "@material-ui/core/styles";
// import { theme } from "./MUIcreateTheme";

import { documentTitle } from 'Config'
import configureStore from './store'
import rootSaga from './sagas'
import App from './containers/FWApp'

import './styles/w3'
import './styles/main'
import './styles/table'


export const history = createBrowserHistory();

const store = configureStore();
store.runSaga(rootSaga);

document.title = documentTitle

render(
  // <ThemeProvider theme={theme}>
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  // </ThemeProvider>,
  document.getElementById("root")
)

