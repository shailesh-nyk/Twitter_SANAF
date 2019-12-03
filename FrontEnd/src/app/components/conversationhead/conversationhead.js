import React from 'react';
import { connect } from 'react-redux';
import { fetchConversationheads } from './../../../redux/actions/conversation-action';
import config from '../../../config/app-config';

class conversationhead extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchConversationheads(this.props.user.id);   
    }
    filterConversation = (query) => {
        var updatedList = this.getUsers();
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(
                query.toLowerCase()) !== -1;
        });
        return updatedList;
    }
    getUsers = () => {
        let users = [];
        let user_id = this.props.user.id
        let propUsers = this.props.conversationheads;
        if (!window.$.isArray(propUsers)) {
            propUsers = [];
            propUsers.push(this.props.conversationheads);
        }
        for (let i = 0; i < propUsers.length; i++) {
            for (let j = 0; j < propUsers[i].users.length; j++) {
                if (propUsers[i].users[j]._id !== user_id) {
                    users.push(propUsers[i].users[j])
                }
            }
        }
        return users
    }
    handleHeadClick = (event) => {
        this.props.changeHead(event.currentTarget.dataset.id);
    }
    renderConversationHead = () => {
        let users = this.filterConversation(this.props.query);
        return users.map((user) => {
            return (
                <button onClick={this.handleHeadClick} data-id={user._id}
                    class="list-group-item list-group-item-action flex-column align-items-start t-conversationhead-btn">
                    <div class="d-flex w-100 justify-content-between" >
                        <img src={config.image_server + user.avatar} alt="Avatar" class="t-conversationhead-avatar" />
                        <h6 class="mb-1 p-2">{user.name} @{user.handle} </h6>
                    </div>
                </button>
            )
        });
    }
    render() {
        return (
            <div class="list-group" style={{height: "auto"}}>
                {this.props.conversationheads && this.renderConversationHead()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        conversationheads: state.conversationReducer.conversationheads,
        user: state.auth.user

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchConversationheads: (id) => dispatch(fetchConversationheads(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(conversationhead)