import React from "react"
import PropTypes from "prop-types"
import Api from "../../../utils/api"
import {invoiceItemCreate, invoiceItemEdit, invoiceItemDelete} from "../../../actions/invoices/invoices"
import InvoiceItem from "./InvoiceItem"
import CustomerCreate from "../../Customers/CustomerCreate"
import ProductCreate from "../../Products/ProductCreate"

export default class InvoiceForm extends React.Component {

    static propTypes = {
        invoice_id: PropTypes.number.isRequired,
        invoice: PropTypes.object.isRequired,
        invoiceItems: PropTypes.array.isRequired,
    }

    constructor(props) {
      super(props)

      this.state = {
          customers: [],
          products: [],
          invoice: props.invoice,
          invoiceItems: props.invoiceItems
      }

    }

    async componentDidMount() {

      const customers = await Api.get("customers")
      const products = await Api.get("products")

      if (this.state.invoiceItems.length > 0) {
          const invoiceItems = this.updateInvoiceItems(this.state.invoiceItems, products)
          this.setState({
              customers,
              products,
              invoiceItems
          })
      } else {
          this.setState({
              customers,
              products
          })
      }
    }

    updateInvoiceItems = (items, products) => {
        return items.map( item => {
            const {name, price} = products.find( product => product.id == item.product_id )
            return {
                ...item,
                name,
                price
            }
        })
    }

    itemAddToList = (item, key) => {
        const list = [...this.state[key]]

        list.push(item)

        this.setState({
            [key]: list
        })
    }

    getTotal = (items, discount) => {
      return items.reduce( (sum, item) => {
          return sum + (item.price*item.quantity)*(1 - discount/100)
      }, 0).toFixed(2)
    }

    onChangeInvoice = (key) => async (e) => {
      let payload = {
          ...this.state.invoice,
          [key]: e.target.value,
      }

      payload = {
          ...payload,
          total: this.getTotal(this.state.invoiceItems, payload.discount)
      }

      await Api.put("invoices", payload, this.props.invoice_id)

      this.setState({
          invoice: {...payload}
      })

    }

    onChangeQuantity = async (e) => {
      const index = e.target.getAttribute("data-index")

      const invoiceItems = [...this.state.invoiceItems]
      invoiceItems[index].quantity = e.target.value

      await this.updateInvoiceItem(invoiceItems[index].product_id, e.target.value, invoiceItems[index].id)
      const {total} = await this.updateInvoiceTotal(invoiceItems)

      this.setState(prevState => ({
          invoiceItems,
          invoice: {
              ...prevState.invoice,
              total
          }
      }))
    }

    updateInvoiceTotal = async (invoiceItems) => {
      const invoicePayload = {
          ...this.state.invoice,
          total:  this.getTotal(invoiceItems, this.state.invoice.discount)
      }
      return await Api.put("invoices", invoicePayload, this.props.invoice_id)
    }

    updateInvoiceItem = async (product_id, quantity, invoice_item_id) => {

      const invoiceItemPayload = {
          product_id,
          quantity
      }

      await invoiceItemEdit(invoiceItemPayload, this.props.invoice_id, invoice_item_id)
    }

    productAdd = async (e) => {

      const product = JSON.parse(e.target.value)
      const {id} = await invoiceItemCreate(this.props.invoice_id)

      await this.updateInvoiceItem(product.id, 1, id)

      const invoiceItem = {
          id,
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
      }

      const invoiceItems = [...this.state.invoiceItems]
      invoiceItems.push(invoiceItem)

      const {total} = await this.updateInvoiceTotal(invoiceItems)

      this.setState(prevState => ({
          invoiceItems,
          invoice: {
              ...prevState.invoice,
              total
          }
      }))
    }

    productDelete = async (e) => {
      const index = e.target.getAttribute("data-index")
      const invoice_item_id = e.target.getAttribute("data-id")

      await invoiceItemDelete(this.props.invoice_id, invoice_item_id)

      const invoiceItems = [...this.state.invoiceItems]
      invoiceItems.splice(index, 1)

      const {total} = await this.updateInvoiceTotal(invoiceItems)
      this.setState(prevState => ({
          invoiceItems,
          invoice: {
              ...prevState.invoice,
              total
          }
      }))
    }

  render() {
    return (
        <form>
            <div className="form-group row">
                <div className="col-xs-3">
                    <label htmlFor="product">Products List</label>
                    <select className="form-control" onChange={this.productAdd}>
                        <option>Choose product</option>
                        {this.state.products.length > 0 && this.state.products.map(product => {
                            return (
                                <option key={product.id} value={JSON.stringify(product)}>{product.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-xs-2">
                    <ProductCreate itemAddToList={this.itemAddToList} />
                </div>
                <div className="col-xs-3">
                    <label htmlFor="customer">Customers List</label>
                    <select className="form-control" onChange={this.onChangeInvoice("customer_id")}>
                        <option>Choose customer</option>
                        {this.state.customers.length > 0 && this.state.customers.map(customer => {
                            return (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-xs-2">
                    <CustomerCreate itemAddToList={this.itemAddToList} />
                </div>
                <div className="col-xs-2">
                    <div className="form-group">
                        <label htmlFor="discount">Discount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="discount"
                            onChange={this.onChangeInvoice("discount")}
                            value={this.state.invoice.discount || 0}
                            min={0}
                            max={100}
                        />
                    </div>
                </div>
            </div>
            {this.state.invoiceItems.length > 0 &&
                <div className="row">
                    <div className="col-xs-12">
                        <div className="list-group">
                            {this.state.invoiceItems.map( (item, index) => {
                                return (
                                    <InvoiceItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        onChangeQuantity={this.onChangeQuantity}
                                        productDelete={this.productDelete}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-xs-12">
                    <p>Total: {this.state.invoice.total || 0}</p>
                </div>
            </div>
        </form>
    )
  }
};
