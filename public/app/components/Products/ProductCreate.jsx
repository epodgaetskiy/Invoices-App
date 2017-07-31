import React from "react"
import ProductForm from "./ProductForm"
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

const initialValuesProduct = {
    name: "",
    price: 0
}

export default class ProductCreate extends React.Component {

    static propTypes = {
        itemAddToList: PropTypes.func.isRequired,
    }

    onSubmit = async (product) => {
        const {id} = await Api.post("products")
        const item = await Api.put("products", product, id)
        this.props.itemAddToList(item, "products")
        $(".product-form").modal("hide")
    }

    render () {
        return (
            <div>
                <ButtonOpen
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target=".product-form"
                >
                     <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                </ButtonOpen>
                <div
                    className="modal fade product-form"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="mySmallModalLabel"
                >
                    <WrapperModal className="modal-dialog modal-xs" role="document">
                        <WrapperModalContent className="modal-content">
                            <ProductForm
                                initialValues={initialValuesProduct}
                                onSubmit={this.onSubmit}
                                textSubmit="Product create"
                            />
                        </WrapperModalContent>
                    </WrapperModal>
                </div>
            </div>
        )
    }
}
