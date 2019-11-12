import React from 'react';
import { connect } from 'react-redux';

class conversation extends React.Component {
    renderMessages = () => {
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
        users = users.concat(...users, ...users, ...users);
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
            <div className="overflow-allow">
                <div className="p-3">
                    <h4>Faraaz Ahmed</h4>
                    <small>@asdasd</small>
                    <i class="fas fa-info-circle" style={{ float: "right" }}></i>
                </div>
                <div>
                    {this.renderMessages()}
                </div>
                <div class="input-group p-2 bottom">
                    <input type="text" class="form-control"
                        placeholder="Recipient's username" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">
                            <i class="far fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(conversation);