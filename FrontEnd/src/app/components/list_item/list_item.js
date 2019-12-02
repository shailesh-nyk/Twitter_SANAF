import React from 'react';
import { Redirect } from 'react-router-dom';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToListView: false
        }
    }
    componentWillMount() {
    }
    render() {
        if(this.state.redirectToListView) {
            return (
                <Redirect to={ {
                    pathname: `/ui/listview/${this.props.data._id}`,
                    state:  {
                        prev: window.location.pathname
                    }
                }}/>
            )
        }
        return (
            <div>
                <div className="t-list-item-container" onClick={() => this.setState({redirectToListView: true})}>
                    <div>
                        {this.props.data.name}
                    </div>
                    <div  className="t-secondary t-small-text">
                        {this.props.data.description}
                    </div>
                    <div className="t-secondary t-small-text">
                       Members: {this.props.data.list.length} &nbsp; &nbsp; Subscribers: {this.props.data.subscribers.length}
                    </div>
                </div>
            </div>
        )
    }   
}

export default ListItem;