import React from "react"
import InvoiceForm from "./InvoiceForm/InvoiceForm"
import Api from "../../utils/api"
import {getInvoiceItems} from "../../actions/invoices/invoices"

export default class InvoiceEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            invoice: {
                customer_id: null,
                discount: 0,
                total: 0,
            },
            invoiceItems: [],
            isLoading: false
        }
    }
    async componentDidMount() {
        const {customer_id, discount, total} = await Api.getItem("invoices", this.props.params.id)
        const invoiceItems = await getInvoiceItems(this.props.params.id)
        this.setState({
            invoice: {
                customer_id,
                discount,
                total
            },
            invoiceItems,
            isLoading: true
        })
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        {this.state.isLoading &&
                            <InvoiceForm
                                invoice={this.state.invoice}
                                invoiceItems={this.state.invoiceItems}
                                invoice_id={Number(this.props.params.id)}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
