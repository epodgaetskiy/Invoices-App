import React from "react"
import moment from "moment"
import PropTypes from "prop-types"

export default class InvoiceItem extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        invoiceDelete: PropTypes.func.isRequired,
    }

    render () {
        const {item, invoiceDelete, index} = this.props
        return (
            <tr>
                <th scope="row">{item.id}</th>
                <td>{moment(item.createdAt).format("LLL")}</td>
                <td>{moment(item.updatedAt).format("LLL")}</td>
                <td>{item.total || 0}</td>
                <td>{`${item.discount || 0}%`}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-info"
                        data-index={index}
                        onClick={invoiceDelete}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}
