import React from 'react';
import { connect } from 'react-redux';
import { fetchConversationheads } from './../../../redux/actions/conversation-action';

class conversationhead extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchConversationheads();
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
        let user_id = "5dca4f4de9a22e4b5c966d34";
        for (let i = 0; i < this.props.conversationheads.length; i++) {
            for (let j = 0; j < this.props.conversationheads[i].users.length; j++) {
                if (this.props.conversationheads[i].users[j]._id !== user_id) {
                    users.push(this.props.conversationheads[i].users[j])
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
                        <img src={user.avatar} alt="Avatar" class="t-conversationhead-avatar" />
                        <h6 class="mb-1 p-2">{user.name} @{user.handle} </h6>
                    </div>
                </button>
            )
        });
    }
    render() {
        return (
            <div class="list-group">
                {this.props.conversationheads && this.renderConversationHead()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        conversationheads: state.conversationReducer.conversationheads
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchConversationheads: (id) => dispatch(fetchConversationheads(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(conversationhead)