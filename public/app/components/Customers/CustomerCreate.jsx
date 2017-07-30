import React from "react"
import CustomerForm from "./CustomerForm"
import styled from "styled-components"
import {customerCreate, customerEdit} from "../../actions/customers/customers"
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

export default class CustomerCreate extends React.Component {

    static propTypes = {
        itemAddToList: PropTypes.func.isRequired,
    }

    onSubmit = async (customer) => {
        const {id} = await customerCreate()
        const item = await customerEdit(customer, id)
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
                            <CustomerForm onSubmit={this.onSubmit} />
                        </WrapperModalContent>
                    </WrapperModal>
                </div>
            </div>
        )
    }
}
