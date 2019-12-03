import React from 'react';
import { connect } from 'react-redux';
import config from '../../../config/app-config';
import { fetchFollowing } from './../../../redux/actions/user-action';
import { createConvHead } from './../../../redux/actions/conversation-action';

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ""
        }
    }
    renderUsers = (query) => {
        let users = this.filterFollowing(query);
        if (users) {
            return users.map((user) => {
                return (
                    <div class="list-group-item list-group-item-action flex-column align-items-start t-usr"
                        data-dismiss="modal" data-id={user._id} onClick={e => this.createConvHead(e.currentTarget.dataset.id)}>
                        <div className="row">
                            <div className="col-2">
                                <img src={config.image_server + user.avatar} alt="Avatar" className="t-avatar" />
                            </div>
                            <div className="col-10">
                                <h5>{user.name}</h5>
                                <small>@{user.handle}</small>
                            </div>
                        </div>
                    </div>
                )
            });
        }
    }
    createConvHead(id) {
        var that = this;
        let message_payload = {
            users: [that.props.user.id, id]
        }
        this.props.createConvHead(message_payload);
    }
    componentDidMount() {
        this.props.fetchFollowing(this.props.user.id);
    }
    filterFollowing(query) {
        var updatedList = this.props.following.result;
        if (updatedList) {
            updatedList = updatedList.filter(function (item) {
                return item.name.toLowerCase().search(
                    query.toLowerCase()) !== -1;
            });
            return updatedList;
        }
    }

    render() {
        return (
            <div class="modal fade " id="userSearchModal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content t-dark-container t-curve">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">New Message</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input className="p-2" style={{ width: "100%" }} placeholder="Search people" onChange={(e) => this.setState({ filter: e.target.value })} />
                            <div class="list-group">
                                {this.props.following && this.renderUsers(this.state.filter)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        following: state.userReducer.following
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFollowing: (id) => dispatch(fetchFollowing(id)),
        createConvHead: (message_payload) => dispatch(createConvHead(message_payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch)
