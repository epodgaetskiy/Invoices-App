import React from "react"
import moment from "moment"
import PropTypes from "prop-types"
import {Link} from "react-router"

export default class ProductItem extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        itemDelete: PropTypes.func.isRequired,
    }

    render () {
        const {item, itemDelete, index} = this.props
        return (
            <tr>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.price || 0}</td>
                <td>{moment(item.createdAt).format("LLL")}</td>
                <td>{moment(item.updatedAt).format("LLL")}</td>
                <td>
                    <Link
                        className="btn btn-success"
                        data-index={index}
                        to={`/products/${item.id}/edit`}
                    >
                        Edit
                    </Link>
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-index={index}
                        onClick={itemDelete}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}
