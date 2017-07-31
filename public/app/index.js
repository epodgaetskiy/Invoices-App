import React from "react"
import {render} from "react-dom"
import {Router, browserHistory, Route, IndexRedirect, IndexRoute} from "react-router"
import App from "./components/App/App"
import Invoices from "./components/Invoices/Invoices"
import ProductsList from "./components/Products/ProductsList/ProductsList"
import ProductEdit from "./components/Products/ProductEdit"
import CustomersList from "./components/Customers/CustomersList/CustomersList"
import CustomerEdit from "./components/Customers/CustomerEdit"

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="invoices" />
            <Route path="invoices" component={Invoices} />
            <Route path="products">
                <IndexRoute component={ProductsList} />
                <Route path=":id/edit"component={ProductEdit} />
            </Route>
            <Route path="customers">
                <IndexRoute component={CustomersList} />
                <Route path=":id/edit"component={CustomerEdit} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);
