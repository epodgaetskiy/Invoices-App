import React from "react"
import PropTypes from "prop-types"
import ProductItem from "./ProductItem"
import LoadList from "../../Common/LoadList/LoadList"

@LoadList("products")
export default class ProductsList extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    itemDelete: PropTypes.func.isRequired,
  }

  render() {
    const {items, itemDelete} = this.props
    return (
        <div className="container">
            {items.length > 0 ?
                <div className="row">
                    <div className="col-xs-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Create At</th>
                                    <th>Update At</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {items.map( (item, index) => {
                                return (
                                    <ProductItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        itemDelete={itemDelete}
                                    />
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>:
                null
            }
        </div>
    )
  }
};
