import React from "react"
import InvoiceList from "../Invoices/InvoicesList/InvoicesList"
import InvoiceCreate from "../Invoices/InvoiceCreate/InvoiceCreate"

export default class Invoices extends React.Component {
    render () {
        return (
            <div className="container">
                <InvoiceList />
                <InvoiceCreate />
            </div>
        )
    }
}
