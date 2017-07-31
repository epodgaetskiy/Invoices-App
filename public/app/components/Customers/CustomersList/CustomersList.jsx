import React from "react"
import PropTypes from "prop-types"
import CustomerItem from "./CustomerItem"
import LoadList from "../../Common/LoadList/LoadList"

@LoadList("customers")
export default class CustomersList extends React.Component {

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
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Create At</th>
                                    <th>Update At</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {items.map( (item, index) => {
                                return (
                                    <CustomerItem
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
