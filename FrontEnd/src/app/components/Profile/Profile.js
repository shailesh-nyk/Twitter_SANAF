import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile,fetchFollowing,fetchFollowedBy } from './../../../redux/actions/userProfile-action';
import {deactivateAccount} from "../../../redux/actions/authActions";
import config from '../../../config/app-config';
import ProfileModal from "./ProfileModal";
import ProfileTweets from './ProfileTweets';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            username_or_email_or_phone: "",
            password: "",
            errors: {},
            name: "",
            d_o_b: "",
            city: "",
            handle: "",
            avatar: "",
            profile: ""
        };
        //this.props.getUserProfile(this.props.user.id);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps != null) {
            
            if(nextProps.userProfile!=null)
            {
                this.setState({
                    name: nextProps.userProfile.name,
                    handle: nextProps.userProfile.handle,
                    avatar: nextProps.userProfile.avatar,

                    profile: nextProps.userProfile
                });
            }   
        }
    }

    componentWillMount() {
        this.props.getUserProfile(this.props.user.id);
        this.props.fetchFollowing(this.props.history);
        this.props.fetchFollowedBy(this.props.history);
    }

    onClickDeactivate = e => {
        e.preventDefault();
        this.props.deactivateAccount(this.props.history);
      };



    render() {
        const { errors } = this.state;

        return (
            <React.Fragment>
                <div>
                    <div className="t-topnav-container" >{this.state.name} &nbsp; <span className="t-small-text t-secondary">@{this.state.handle}</span></div>
                    <div className="p-3" style={{borderBottom: "1px solid #38444d"}}>
                        <div className="d-flex justify-content-between align-items-center">
                            <img className="t1-profile-img" src={config.image_server + this.state.avatar}></img>
                            <span style={{fontStyle: "italic", flex:"1", textAlign:"center"}}>"{this.state.profile.description}"</span>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                            <button className="btn btn-sm btn-secondary mr-3" onClick={this.onClickDeactivate}> Deactivate</button>
                            <button className="btn btn-primary" data-toggle="modal" data-target="#profileModal" > Edit Profile</button>
                        </div>
                    </div>
                    <nav class="t-tab-pane">
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-tab-tweets" data-toggle="tab" href="#nav-tweets" role="tab" aria-controls="nav-tweets" aria-selected="true">Tweets</a>
                            <a class="nav-item nav-link" id="nav-tab-followers" data-toggle="tab" href="#nav-followers" role="tab" aria-controls="nav-followers" aria-selected="false">
                                {this.props.followedBy.hasOwnProperty("result") && this.props.followedBy.result.length } Followers
                            </a>
                            <a class="nav-item nav-link" id="nav-tab-following" data-toggle="tab" href="#nav-following" role="tab" aria-controls="nav-following" aria-selected="false">
                                {this.props.following.hasOwnProperty("result") && this.props.following.result.length} Following 
                            </a>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-tweets" role="tabpanel" aria-labelledby="nav-tweet-tab">
                             <ProfileTweets></ProfileTweets>
                        </div>
                        <div class="tab-pane fade" id="nav-followers" role="tabpanel" aria-labelledby="nav-followers-tab">
                        {this.props.followedBy.hasOwnProperty('result') ? (
                                 this.props.followedBy.result.map(user => {
                                     return (
                                        <div className="d-flex align-items-center p-3" style={{borderBottom: "1px solid #38444d"}}>
                                            <img style={{width:"50px", borderRadius: "60px"}} src={config.image_server + user.avatar}/>
                                            <div class="ml-3">
                                                <Link className="t-profile-link t-primary-bold" to={`/ui/userprofile/${user._id}`}> {user.name}</Link>
                                                &nbsp; <span className="t-secondary t-small-text">@{user.handle}</span>
                                            </div>
                                        </div>  
                                     )
                                 })
                             ) : (  
                              <div class='t-secondary t-small-text'>
                                You aren't following anyone yet!
                              </div>) }
                        </div>
                        <div class="tab-pane fade" id="nav-following" role="tabpanel" aria-labelledby="nav-following-tab">
                             {this.props.following.hasOwnProperty('result') ? (
                                 this.props.following.result.map(user => {
                                     return (
                                        <div className="d-flex align-items-center p-3" style={{borderBottom: "1px solid #38444d"}}>
                                            <img style={{width:"50px", borderRadius: "60px"}} src={config.image_server + user.avatar}/>
                                            <div class="ml-3">
                                                <Link className="t-profile-link t-primary-bold" to={`/ui/userprofile/${user._id}`}> {user.name}</Link>
                                                &nbsp; <span className="t-secondary t-small-text">@{user.handle}</span>
                                            </div>
                                        </div>  
                                     )
                                 })
                             ) : (  
                              <div class='t-secondary t-small-text'>
                                You aren't following anyone yet!
                              </div>) }
                        </div>
                    </div>
                </div>
                <ProfileModal data={this.state.profile}></ProfileModal>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        userProfile: state.userProfileReducer.userProfile,
        user: state.auth.user,
        following : state.following,
        followedBy : state.followedBy,
        errors: PropTypes.object.isRequired,
        success: PropTypes.object.isRequired
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getUserProfile: (_id) => dispatch(getUserProfile(_id)),
        deactivateAccount: (history) => dispatch(deactivateAccount(history)),
        fetchFollowing: (history)    => dispatch(fetchFollowing(history)),
        fetchFollowedBy:(history)    => dispatch(fetchFollowedBy(history))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));