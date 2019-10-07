import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CarsTable from "./CarsTable";
import CarDetails from "./CarDetails";

const App = () => (
<React.Fragment>
    <BrowserRouter>
        <Switch>
            <Route path='/' exact render={() => (<CarsTable endpoint="api/cars/" />)} />
            <Route path='/details/:id' component={CarDetails} />
        </Switch>
    </BrowserRouter>
</React.Fragment>
);

const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(<App />, wrapper) : null;
