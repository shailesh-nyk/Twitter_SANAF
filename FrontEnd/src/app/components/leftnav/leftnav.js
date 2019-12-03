import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authActions";
import PropTypes from "prop-types";
import TweetModal from './../tweet-modal/tweet-modal';

class LeftNav extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    };

    render() {
        let messageIcon = <i className="pr-3 far fa-envelope"></i>;
        if (this.props.new_message === true) {
            messageIcon = <i className="fas fa-envelope-open wiggle"></i>;
        }
        return (
            <div className="t-leftnav-container border-right border-white">
                <div className="btn-group-vertical">
                    <div className="row">
                        <div className="col-3" />
                        <div className="col-9">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <i className="fab fa-twitter fa-2x p-3"></i>

                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/" >                          <i className="pr-3 fas fa-home"></i>       Home         </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/messages" onClick={this.props.reset}>               {messageIcon}                Messages     </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/bookmark"><i className="pr-3 far fa-bookmark"></i>   Bookmarks    </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/list"><i className="pr-3 fas fa-list-ul"></i>    Lists        </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/profile"><i className="pr-3 far fa-user-circle"></i>Profile      </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/dashboard"><i className="pr-3 fa fa-tachometer"></i> Dashboard         </Link>
                                <Link className="t-leftnav-a nav-link" to="#" onClick={this.onLogoutClick}><i className="pr-3 fas fa-power-off"></i> Logout         </Link>
                                <button type="button" className="btn btn-primary t-leftnav-btn" style={{marginTop:"24px"}} data-toggle="modal" data-target="#tweetModal">Tweet</button>
                            </div>
                        </div>
                    </div>
                </div>
                <TweetModal/>
            </div>
        )
    }
}

LeftNav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(LeftNav));