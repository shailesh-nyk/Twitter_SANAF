import React from 'react';
import { connect } from 'react-redux';
import config from '../../../config/app-config';

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
    }
    renderUsers = () => {
        let users = this.props.users;
        return users.map((user) => {
            return (
                <div data-id={user._id}>
                    <div className="d-flex w-100 justify-content-between" >
                        <img src={user.avatar} alt="Avatar" />
                        <h6 className="mb-1 p-2">{user.name} @{user.handle} </h6>
                    </div>
                </div>
            )
        });
    }
    render() {
        return (
            <div class="modal fade" id="userSearchModal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content t-dark-container">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">New Message</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="list-group">
                                {this.props.users && this.renderUsers()}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.conversationReducer.conversationheads
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch)
