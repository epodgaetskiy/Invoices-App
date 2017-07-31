import React from "react"
import ProductForm from "./ProductForm"
import styled from "styled-components"
import Api from "../../utils/api"
import PropTypes from "prop-types"

export default class ProductEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            product: {
                name: "",
                price: 0
            },
            isLoading: false
        }
    }
    async componentDidMount() {
        const {name, price} = await Api.getItem("products", this.props.params.id)

        this.setState({
            product: {
                name,
                price
            },
            isLoading: true
        })
    }

    onSubmit = async (product) => {
        await Api.put("products", product, this.props.params.id)
        this.props.router.push("/products")
    }

    render () {
        return (
            <div className="container">
                {this.state.isLoading &&
                    <div className="row">
                        <div className="col-xs-6">
                            <ProductForm
                                initialValues={this.state.product}
                                onSubmit={this.onSubmit}
                                textSubmit="Product edit"
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }
}
