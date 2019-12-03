import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile, fetchFollowing, fetchFollowedBy } from './../../../redux/actions/userProfile-action';
import config from '../../../config/app-config';
import ProfileModal from "./ProfileModal";
import Profile_Other_Tweets from './Profile_Other_Tweets'
import Axios from "axios";
import { followUser, handleUnFollow, unFollowUser } from './../../../redux/actions/user-action';

class Profile_Other extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username_or_email_or_phone: "",
            password: "",
            errors: {},
            name: "",
            d_o_b: "",
            city: "",
            handle: "",
            avatar: "",
            profile: "",
            following: false

        };
        console.log("inside other profile")
        console.log(this.props.match.params.profile_id)
        console.log(this.props)
    }

    componentWillMount() {
        console.log("other component mounted")
        if (null != this.props.match.params.profile_id) {
            this.props.getUserProfile(this.props.match.params.profile_id);
        }
        this.props.fetchFollowing(this.props.history);
        this.props.fetchFollowedBy(this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps != null) {
            console.log(nextProps.userProfile)
            this.setState({
                name: nextProps.userProfile.name,
                handle: nextProps.userProfile.handle,
                avatar: nextProps.userProfile.avatar,
                profile: nextProps.userProfile
            });
            const payload = {
                viewed_by: this.props.user.id,
                user_id: this.props.match.params.profile_id
            }
            console.log('before incremneting ' + payload.viewed_by + " and " + payload.user_id)
            Axios.post('/user/incrementViewCount', payload).then(response => {
                console.log('-----------------------------------------------------------------')
                console.log(response.data)
            })
        }
    }

    isFollowing() {
        if (this.props.user && this.props.userProfile) {
            if (this.props.userProfile.hasOwnProperty('followedBy') && this.props.userProfile.followedBy.includes(this.props.user.id)) {
                return true;
            }
        }
        return false;
    }
    handleFollow = (event) => {
        this.props.followUser(this.props.user.id, this.props.match.params.profile_id);
    }
    handleHover = (e, isEnter) => {
        if (isEnter) {
            e.target.innerText = "Unfollow";
        }
        else {
            e.target.innerText = "Following";
        }
    }
    handleUnFollow = () => {
        this.props.unFollowUser(this.props.user.id, this.props.match.params.profile_id);
    }

    render() {
        const { errors } = this.state;

        return (
            <React.Fragment>
                <div>
                    <div className="t-topnav-container" >{this.state.name} &nbsp; <span className="t-small-text t-secondary">@{this.state.handle}</span></div>
                    <div className="p-3" style={{ borderBottom: "1px solid #38444d" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <img className="t1-profile-img" src={config.image_server + this.state.avatar}></img>
                            <span style={{ fontStyle: "italic" }}>"{this.state.profile.description}"</span>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                            <button className="btn btn-primary t-btn-hover t-rounded-button" style={{ display: this.isFollowing() ? "inline-block" : "none" }}
                                onMouseEnter={(e) => this.handleHover(e, 1)} onMouseOut={(e) => this.handleHover(e, 0)}
                                onClick={this.handleUnFollow}>Following</button>
                            <button className="btn btn-primary t-rounded-button" style={{ display: this.isFollowing() ? "none" : "inline-block" }} onClick={this.handleFollow}>Follow</button>
                        </div>
                        <div>
                            {
                                this.props.following.hasOwnProperty("result") &&
                                this.props.following.result.length
                            } Following
                            &nbsp;
                            {
                            this.props.followedBy.hasOwnProperty("result") &&
                            this.props.followedBy.result.length
                             } Followers
                        </div>
                    </div>
                </div>
                <ProfileModal data={this.state.profile}></ProfileModal>
                <Profile_Other_Tweets id={this.props.match.params.profile_id} ></Profile_Other_Tweets>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userProfile: state.userProfileReducer.userProfile,
        user: state.auth.user,
        following: state.following,
        followedBy: state.followedBy,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getUserProfile: (_id) => dispatch(getUserProfile(_id)),
        followUser: (id, target_id) => dispatch(followUser(id, target_id)),
        unFollowUser: (id, target_id) => dispatch(unFollowUser(id, target_id)),
        fetchFollowing: (history) => dispatch(fetchFollowing(history)),
        fetchFollowedBy: (history) => dispatch(fetchFollowedBy(history))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile_Other));