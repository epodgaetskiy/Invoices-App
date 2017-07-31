import React from "react"
import CustomerForm from "./CustomerForm"
import styled from "styled-components"
import Api from "../../utils/api"
import PropTypes from "prop-types"

const WrapperModal = styled.div`
    width: 360px;
`

const WrapperModalContent = styled.div`
    padding: 15px;
`

const ButtonOpen = styled.button`
    margin-top: 25px;
`

const initialValuesCustomer = {
    name: "",
    address: "",
    phone: ""
}

export default class CustomerCreate extends React.Component {

    static propTypes = {
        itemAddToList: PropTypes.func.isRequired,
    }

    onSubmit = async (customer) => {
        const {id} = await Api.post("customers")
        const item = await Api.put("customers", customer, id)
        this.props.itemAddToList(item, "customers")
        $(".customer-form").modal("hide")
    }

    render () {
        return (
            <div>
                <ButtonOpen
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target=".customer-form"
                >
                     <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                </ButtonOpen>
                <div
                    className="modal fade customer-form"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="mySmallModalLabel"
                >
                    <WrapperModal className="modal-dialog modal-xs" role="document">
                        <WrapperModalContent className="modal-content">
                            <CustomerForm
                                initialValues={initialValuesCustomer}
                                onSubmit={this.onSubmit}
                                textSubmit="Customer create"
                            />
                        </WrapperModalContent>
                    </WrapperModal>
                </div>
            </div>
        )
    }
}
