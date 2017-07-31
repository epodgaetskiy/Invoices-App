import React, { PropTypes } from 'react'
import Api from "../../../utils/api"

export default (type) => (Component) => class LoadList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            items: []
        }
    }

    async componentDidMount() {
        const items = await Api.get(type)
        this.setState({
            items,
            isLoading: true
        })
    }

    itemDelete = async (e) => {
        const index = e.target.getAttribute("data-index")
        await Api.delete(type, this.state.items[index].id)

        const items = [...this.state.items]

        items.splice(index, 1)

        this.setState({
            items
        })
    }

    render () {
        return (
            <Component
                items={this.state.items}
                isLoading={this.state.isLoading}
                itemDelete={this.itemDelete}
                {...this.props}
            />
        )
    }
}
