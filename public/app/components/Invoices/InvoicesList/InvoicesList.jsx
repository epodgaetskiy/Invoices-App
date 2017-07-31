import React from "react"
import InvoiceItem from "./InvoiceItem"

export default class InvoiceList extends React.Component {
  render() {
    const {invoices, invoiceDelete} = this.props
    return (
        invoices.length > 0 ?
            <div className="row">
                <div className="col-xs-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Create At</th>
                                <th>Update At</th>
                                <th>Total</th>
                                <th>Discount</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {invoices.map( (item, index) => {
                            return (
                                <InvoiceItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    invoiceDelete={invoiceDelete}
                                />
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>:
            <p>Invoices not found</p>

    )
  }
};
