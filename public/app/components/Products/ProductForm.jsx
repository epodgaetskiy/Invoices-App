import React from "react"
import PropTypes from "prop-types"

export default class ProductForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            price: 0,
        }
    }

    onChange = (type) => (e) => {
        this.setState({
            [type]: e.target.value
        })
    }

    onSubmit = () => {
        this.props.onSubmit(this.state)
    }

    render () {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={this.state.name}
                        onChange={this.onChange("name")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="number"
                        value={this.state.price}
                        onChange={this.onChange("price")}
                        min={0}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Product Create</button>
            </div>
        )
    }
}
