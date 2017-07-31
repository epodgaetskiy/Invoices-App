import React from "react"
import PropTypes from "prop-types"

export default class CustomerForm extends React.Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        textSubmit: PropTypes.string.isRequired,
        initialValues: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            name: props.initialValues.name,
            address: props.initialValues.address,
            phone: props.initialValues.phone
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
                    <label htmlFor="address">Address</label>
                    <input
                        type="address"
                        className="form-control"
                        id="address"
                        value={this.state.address}
                        onChange={this.onChange("address")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={this.state.phone}
                        onChange={this.onChange("phone")}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.onSubmit}>{this.props.textSubmit}</button>
            </div>
        )
    }
}
