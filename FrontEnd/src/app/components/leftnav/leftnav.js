import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class LeftNav extends React.Component {
    constructor(props) {
        super(props);
    }

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
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/">                           <i className="pr-3 fas fa-hashtag"></i>    #Explore     </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/">                           <i className="pr-3 far fa-bell"></i>       Notifications</Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/messages" onClick={this.props.reset}>               {messageIcon}                Messages     </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/">                           <i className="pr-3 far fa-bookmark"></i>   Bookmarks    </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/">                           <i className="pr-3 fas fa-list-ul"></i>    Lists        </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/">                           <i className="pr-3 far fa-user-circle"></i>Profile      </Link>
                                <Link className="t-leftnav-a t-medium-text t-icon nav-link" to="/ui/">                           <i className="pr-3 fas fa-ellipsis-h"></i> More         </Link>
                                <button type="button" className="btn btn-primary t-leftnav-btn">Tweet</button>
                            </div>
                        </div>
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

export default connect(mapStateToProps)(LeftNav);