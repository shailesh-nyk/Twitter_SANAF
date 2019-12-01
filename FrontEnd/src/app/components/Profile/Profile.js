import React, { Component, Fragment } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import TopNav from '../login/topNav';
import { getUserProfile } from './../../../redux/actions/userProfile-action';
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
      name:"",
      d_o_b:"",
      city:"",
      handle:"",
      avatar:"",
      profile:""

    };
    //this.props.getUserProfile(this.props.user.id);
  }
  

  componentWillReceiveProps(nextProps) {
      if(nextProps!=null) {
        console.log(nextProps.userProfile)
        this.setState({
            name:nextProps.userProfile.name,
            handle:nextProps.userProfile.handle,
            avatar:nextProps.userProfile.avatar,

            profile:nextProps.userProfile
        }); 
    }
  }

  componentWillMount() {

    this.props.getUserProfile(this.props.user.id);
   
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
  
  
  

  render() {
    const { errors } = this.state;
    
    return (
      <React.Fragment>
        
      
      <div className="t-wh-container">
            <div className="t-top-nav" >{this.state.name}</div>
            <div className="t-nf-container">
            <div className="t-text-container" > 
                    {/* change image with current user image    */}
                    <img className="t1-profile-img" src={config.image_server + this.state.avatar}></img>
                    <input className="t-textbox form-control"  type="text" id="text"/>
                    </div>
                   
                    <div className="t-tweet-right">
                {/* <label for="tweetImage">
                    <i class="fa fa-picture-o fa-lg t-favicon"></i> 
                    <input className="t-file-input" onChange={this.fileHandler} id="tweetImage" type="file" accept="image/*" />
                </label> */}
                <button className="t-rounded-button" data-toggle="modal" data-target="#profileModal" > Edit Profile</button>
                </div>
                <div>
                        {this.state.name}
                    </div>
                    <div>
                        {this.state.avatar}
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

}


/* Profile.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};
 */
/* const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
}); */

const mapStateToProps = state => {
    return {
        userProfile: state.userProfileReducer.userProfile,
        user: state.auth.user
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getUserProfile: (_id) => dispatch(getUserProfile(_id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Profile));