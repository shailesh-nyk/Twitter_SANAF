import React from 'react';
import { connect } from 'react-redux';

class LeftNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="t-leftnav-container border-right border-white">
                <div className="btn-group-vertical">
                    <div className="row">
                        <div className="col-3" />
                        <div className="col-9">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <i className="fab fa-twitter fa-2x p-3"></i>
                                <a className="t-leftnav-a nav-link active" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">    <i className="pr-3 fas fa-home"></i>         Home            </a>
                                <a className="t-leftnav-a nav-link" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">    <i className="pr-3 fas fa-hashtag"></i>      #Explore        </a>
                                <a className="t-leftnav-a nav-link" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">  <i className="pr-3 far fa-bell"></i>         Notifications   </a>
                                <a className="t-leftnav-a nav-link" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">  <i className="pr-3 far fa-envelope"></i>     Messages        </a>
                                <a className="t-leftnav-a nav-link" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">  <i className="pr-3 far fa-bookmark"></i>     Bookmarks       </a>
                                <a className="t-leftnav-a nav-link" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">  <i className="pr-3 fas fa-list-ul"></i>      Lists           </a>
                                <a className="t-leftnav-a nav-link" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">  <i className="pr-3 far fa-user-circle"></i>  Profile         </a>
                                <a className="t-leftnav-a nav-link" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">  <i className="pr-3 fas fa-ellipsis-h"></i>   More            </a>
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