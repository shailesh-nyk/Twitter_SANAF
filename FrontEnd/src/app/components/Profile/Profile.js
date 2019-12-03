import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import TopNav from '../login/topNav';
import { getUserProfile,fetchFollowing,fetchFollowedBy } from './../../../redux/actions/userProfile-action';
import {deactivateAccount} from "../../../redux/actions/authActions";
import config from '../../../config/app-config';
import ProfileModal from "./ProfileModal";
import ProfileTweets from './ProfileTweets'
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

        //if(this.props.hasOwnProperty("user"))
             this.props.getUserProfile(this.props.user.id);
             this.props.fetchFollowing(this.props.history);
             this.props.fetchFollowedBy(this.props.history);

        // console.log(this.props.userProfile+"hjhjhhhhhhhhhhhhh")
        /* 
            document.body.classList.add("t-login-body");
            document.body.classList.remove("t-sign-up-body");
             */


        // If logged in and user navigates to Register page, should redirect them to dashboard
        /*if (this.props.auth.isAuthenticated) {
          
             document.body.classList.remove("t-login-body");
              this.props.history.push("/ui");
             
         }*/
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
                            <span style={{fontStyle: "italic"}}>"{this.state.profile.description}"</span>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                            <button className="btn btn-sm btn-secondary mr-3" onClick={this.onClickDeactivate}> Deactivate</button>
                            <button className="btn btn-primary" data-toggle="modal" data-target="#profileModal" > Edit Profile</button>
                        </div>
                        {/* ADD FOLLOWERS AND FOLLOWING TO TABS AND SHOW COUNT THERE */}
                        {/* <div>
                            { 
                             this.props.following.hasOwnProperty("result") &&
                             this.props.following.result.length
                             } Following 
                             &nbsp;
                             { 
                             this.props.followedBy.hasOwnProperty("result") &&
                             this.props.followedBy.result.length
                             } Followers
                        </div> */}
                    </div>
                    <ProfileModal data={this.state.profile}></ProfileModal>
                    <ProfileTweets></ProfileTweets>
                </div>
            </React.Fragment>
        );
    }
  }

 /*  componentWillMount() {

    this.props.getUserProfile(this.props.user.id);
   
 
  } */
  
  
  

  /* render() {
    const { errors } = this.state;
    
    return (
      <React.Fragment>
      <div>
            <div className="t-topnav-container" >{this.state.name}</div>
            <div className="t-nf-container t-profile-container">
            <div className="t-text-container" > 
                   
                    <img className="t1-profile-img" src={config.image_server + this.state.avatar}></img>
                    <input className="t-textbox form-control"  type="text" id="text"/>
            </div>
              <div className="d-flex justify-content-end">
                
                  <button className="btn btn-primary" data-toggle="modal" data-target="#profileModal"> Edit Profile</button>
              </div>
              <div>
                      {this.state.name}
              </div>
              <div>
                      {this.state.description}
              </div>
              <div>
                      66 Following 19 Followers
              </div>
             </div>  
              <ProfileModal data={this.state.profile}></ProfileModal> 
              <ProfileTweets></ProfileTweets>             
      </div>
      </React.Fragment>
    );
  }

} */


/*Profile.propTypes = {
  deactivateAccount: PropTypes.func.isRequired
};*/

/* const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
}); */

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
        deactivateAccount:(history) => dispatch(deactivateAccount(history)),
        fetchFollowing:(history)    => dispatch(fetchFollowing(history)),
        fetchFollowedBy:(history)    => dispatch(fetchFollowedBy(history))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));