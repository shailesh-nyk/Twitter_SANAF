import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import TopNav from '../login/topNav';
import { getUserProfile } from './../../../redux/actions/userProfile-action';
import config from '../../../config/app-config';
import ProfileModal from "./ProfileModal";
import Profile_Other_Tweets from './Profile_Other_Tweets'
import Axios from "axios";
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
            profile: ""

        };
        console.log("inside other profile")
        console.log(this.props.match.params.profile_id)
        console.log(this.props)
        //this.props.getUserProfile(this.props.user.id);
    }

    componentWillMount() {
        console.log("other component mounted")
        if(null != this.props.match.params.profile_id) {
            this.props.getUserProfile(this.props.match.params.profile_id);
           
        }  
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
                viewed_by:this.props.user.id,
                user_id:this.props.match.params.profile_id
            }
            Axios.post('/user/incrementViewCount',payload).then(response=>{
                console.log('-----------------------------------------------------------------')
                console.log(response.data)
            })
        }
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
                            <img className="t1-profile-img" src={config.base + this.state.avatar}></img>
                            <input className="t-textbox form-control" type="text" id="text" />
                        </div>

                        <div className="t-tweet-right">
                            {/* <label for="tweetImage">
                    <i class="fa fa-picture-o fa-lg t-favicon"></i> 
                    <input className="t-file-input" onChange={this.fileHandler} id="tweetImage" type="file" accept="image/*" />
                </label> */}
                            <button className="btn btn-primary t-rounded-button" data-toggle="modal" data-target="#profileModal" > Edit Profile</button>
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
                    <Profile_Other_Tweets id={this.props.match.params.profile_id} ></Profile_Other_Tweets>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile_Other));