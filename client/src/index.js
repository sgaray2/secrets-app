import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import SecretDetails from "./components/SecretDetails";

ReactDOM.render(
    <Router>
    <Switch>
    <Route exact path="/" component={App}></Route>
    <Route exact path="/:id" component={SecretDetails}></Route>
    </Switch>
    </Router>
, document.getElementById('root'))