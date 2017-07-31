import React from "react"
import CustomerForm from "./CustomerForm"
import styled from "styled-components"
import Api from "../../utils/api"
import PropTypes from "prop-types"

export default class CustomerEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            customer: {
                name: "",
                address: "",
                phone: ""
            },
            isLoading: false
        }
    }
    async componentDidMount() {
        const {name, address, phone} = await Api.getItem("customers", this.props.params.id)

        this.setState({
            customer: {
                name,
                address,
                phone
            },
            isLoading: true
        })
    }

    onSubmit = async (customer) => {
        await Api.put("customers", customer, this.props.params.id)
        this.props.router.push("/customers")
    }

    render () {
        return (
            <div className="container">
                {this.state.isLoading &&
                    <div className="row">
                        <div className="col-xs-6">
                            <CustomerForm
                                initialValues={this.state.customer}
                                onSubmit={this.onSubmit}
                                textSubmit="Customer edit"
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }
}
