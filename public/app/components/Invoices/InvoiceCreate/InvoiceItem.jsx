import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const ItemInfo = styled.p`
    margin: 0;
    line-height:34px;
`

export default class InvoiceItem extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        onChangeQuantity: PropTypes.func.isRequired,
        productDelete: PropTypes.func.isRequired,
    }

    render () {
        const {item, index, onChangeQuantity, productDelete} = this.props
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-xs-4">
                        <ItemInfo>{item.name}</ItemInfo>
                    </div>
                    <div className="col-xs-4">
                        <ItemInfo>Price: {item.price}</ItemInfo>
                    </div>
                    <div className="col-xs-2">
                        <input
                            className="form-control"
                            type="number"
                            value={item.quantity}
                            data-index={index}
                            onChange={onChangeQuantity}
                            min={0}
                        />
                    </div>
                    <div className="col-xs-2">
                        <button
                            type="button"
                            className="btn btn-info"
                            data-index={index}
                            data-id={item.invoice_item_id}
                            onClick={productDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
