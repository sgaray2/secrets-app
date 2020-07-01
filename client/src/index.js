import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import SecretDetails from "./components/SecretDetails";
import EditSecret from "./components/EditSecret"

ReactDOM.render(
    <Router>
    <Switch>
    <Route exact path="/" component={App}></Route>
    <Route exact path="/:id" component={SecretDetails}></Route>
    <Route exact path="/edit/:id" component={EditSecret}></Route>
    <Route exact path="/delete/:id"></Route>
    </Switch>
    </Router>
, document.getElementById('root'))