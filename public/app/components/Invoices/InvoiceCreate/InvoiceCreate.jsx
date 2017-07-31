import React from "react"
import InvoiceForm from "./InvoiceForm"
import Api from "../../../utils/api"
import styled from "styled-components"

const ButtonCreate = styled.button`
    margin-bottom: 15px;
`

export default class InvoiceCreate extends React.Component {

  constructor(props) {
      super(props)

      this.state = {
          isShowInvoiceForm: false,
          invoice_id: null
      }

      this.showInvoiceForm = this.showInvoiceForm.bind(this)

  }

  async showInvoiceForm() {
      const {id} = await Api.post("invoices")

      this.setState({
           invoice_id: id,
           isShowInvoiceForm: true
      })
  }

  render() {
    return (
        <div className="row">
            <div className="col-xs-12">
                <ButtonCreate
                    type="button"
                    className="btn btn-primary"
                    onClick={this.showInvoiceForm}
                    disabled={this.state.isShowInvoiceForm}
                >
                    Create invoice
                </ButtonCreate>
            </div>
            {this.state.isShowInvoiceForm &&
                <div className="col-xs-12">
                    <InvoiceForm invoice_id={this.state.invoice_id} />
                </div>
            }
        </div>
    )
  }
};
