import React from "react"
import Api from "../../../utils/api"
import InvoiceItem from "./InvoiceItem"

export default class InvoiceList extends React.Component {

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

  render() {
    return (
        this.state.invoices.length > 0 ?
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
                        {this.state.invoices.map( (item, index) => {
                            return (
                                <InvoiceItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    invoiceDelete={this.invoiceDelete}
                                />
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>:
            null

    )
  }
};
