import React from 'react';
import { connect } from 'react-redux';

class conversationhead extends React.Component {
    constructor(props) {
        super(props);
        let users = [{
            name: "Faraaz Ahmed",
            username: "asd",
            image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        },
        {
            name: "John Wick",
            username: "fsads",
            image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        }];
        this.state = {
            displayList : users
        }
    }
    filterConversation = (query) => {
        var updatedList = this.state.displayList; // take it from store
        console.log(this.props.query);
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(
                query.toLowerCase()) !== -1;
        });
        return updatedList;
    }
    renderConversationHead = () => {
        let users = this.filterConversation(this.props.query);
        return users.map((user) => {
            return (
                <button href="#" class="list-group-item list-group-item-action flex-column align-items-start t-conversationhead-btn">
                    <div class="d-flex w-100 justify-content-between">
                        <img src={user.image} alt="Avatar" class="t-conversationhead-avatar" />
                        <h6 class="mb-1 p-2">{user.name} @{user.username}</h6>

                    </div>
                </button>
            )
        });
    }
    render() {
        return (
            <div class="list-group">
                {this.renderConversationHead()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(conversationhead);