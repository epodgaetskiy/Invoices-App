import React from "react"
import InvoiceList from "../Invoices/InvoicesList/InvoicesList"
import InvoiceCreate from "../Invoices/InvoiceCreate"
import Api from "../../utils/api"

export default class Invoices extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoadingInvoices: false,
            invoices: []
        }
    }

    async componentDidMount() {
        const invoices = await Api.get("invoices")
        this.setState({
            invoices,
            isLoadingInvoices: true
        })
    }

    invoiceDelete = async (e) => {
        const index = e.target.getAttribute("data-index")
        await Api.delete("invoices", this.state.invoices[index].id)

        const invoices = [...this.state.invoices]

        invoices.splice(index, 1)

        this.setState({
            invoices
        })
    }

    render () {
        return (
            this.state.isLoadingInvoices ?
                <div className="container">
                    <InvoiceList invoices={this.state.invoices} invoiceDelete={this.invoiceDelete} />
                    <InvoiceCreate />
                </div>:
                null
        )
    }
}
