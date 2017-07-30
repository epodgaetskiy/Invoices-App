import React from "react"
import {render} from "react-dom"
import {Router, browserHistory, Route, IndexRedirect, IndexRoute} from "react-router"
import App from "./components/App/App"
import Invoices from "./components/Invoices/Invoices"

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="invoices" />
            <Route path="invoices" component={Invoices} />
        </Route>
    </Router>,
    document.getElementById('app')
);
