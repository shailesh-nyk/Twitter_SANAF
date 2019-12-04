
import React from 'react';
import config from '../../../config/app-config';
import Axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserProfile } from './../../../redux/actions/userProfile-action';
class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: " ",
            /*name:this.props.data.name,
            bio:this.props.data.description,
            dob:this.props.data.d_o_b,
            city:this.props.data.city,
            avatar:this.props.data.avatar*/

            name:"",
            bio:"",
            dob:"",
            city:"",
            avatar:""
        }
        /* this.setState({
            data:props.data
        }) */
        this.handleImage = this.handleImage.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleBio = this.handleBio.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleDOB = this.handleDOB.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log("hdshdsj");
        this.setState({
            //data: this.props.data,
            currentUser: "Aishwarya",   
            data: nextProps.data,
            name:nextProps.data.name,
            bio:nextProps.data.description,
            city:nextProps.data.city,
            dob:nextProps.data.d_o_b,
            avatar:nextProps.data.avatar
        })
    }
    handleImage = (e)=>{
        this.setState({
            avatar:e.target.files[0]
        })
    }
    handleName = (e)=>{
       
        this.setState({
            name:e.target.value
        })
    }
    handleBio = (e)=>{
        this.setState({
            bio:e.target.value
        })
    }
    handleCity = (e)=>{
        this.setState({
            city:e.target.value
        })
    }
    handleDOB = (e)=>{
        this.setState({
            dob:e.target.value
        })
    }
    render() {

        const{userProfile} = this.props.userProfileReducer;

        console.log("User Profile....",userProfile);
        return (
            <div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content t-dark-container">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Profile of {this.state.name} </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body t-tweet-comment-modal">
                            <div class="file-field">
                                <div class="mb-4 media-left">
                                    <img className="t2-profile-img" src={config.image_server+this.state.avatar}
        /* class="rounded-circle z-depth-1-half avatar-pic" */  />
                                    <span class='p-3'><input type="file" onChange ={this.handleImage} ></input><br/>
                                    <button type="button" class="btn btn-primary float-right mt-2" onClick={() => this.updateImage()}>Upload</button>
                                    </span>
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="name" class="form-control" onChange={this.handleName} value={this.state.name} id="name" required/>
                            </div>
                            <div class="form-group">
                                <label for="Bio">Bio:</label>
                                <input type="text" class="form-control" onChange={this.handleBio} value={this.state.bio} id="bio" required/>
                            </div>
                            <div class="form-group">
                                <label for="location">City:</label>
                                <input type="text" class="form-control" onChange={this.handleCity} value={this.state.city} id="city" required/>
                            </div>
                            <div class="form-group">
                                <label for="date">Birth Date:</label>
                                <input type="date" class="form-control" onChange={this.handleDOB} value={this.state.data.dob} id="birth_date" required />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => this.updateDetails()}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    updateImage() {
        const data = new FormData();
        data.append('file-to-upload',this.state.avatar);
        const headers = {
            'content-type': 'multipart/form-data'
        }
        Axios.post(config.image_server,data,{ withCredentials: false })
        .then((response)=>{
            console.log('***********************************************************')
            console.log(response.data);
            if(response.data.fileName!=null ) {
                console.log(response.data.fileName)
                this.updateDetails2(response.data.fileName);
            }
           // updateDetails();
        })
    
    }
    updateDetails2(file) {
        /* const data = new FormData();
        data.append('_id', this.props.data._id);
        data.append('avatar', file); */
        const data = {
            _id:this.props.data._id,
            avatar:file
        }
        
        console.log(data);

      
        Axios.post('/user/userImageUpdate',data)
        .then((response)=>{
            console.log(response);
            this.props.getUserProfile(this.props.data._id)
           
        })
    }
    updateDetails() {
        /* const data = new FormData();
        data.append('_id', this.props.data._id);
        //data.append('avatar', this.state.avatar);
        data.append('name', this.state.name);
        data.append('city', this.state.city);
        data.append('d_o_b', this.state.dob);
        data.append('description', this.state.bio);
        console.log(data); */
        const data = {
            _id:this.props.data._id,
            name:this.state.name,
            city:this.state.city,
            d_o_b:this.state.d_o_b,
            description:this.state.bio
        }
        const headers = {
            'content-type': 'multipart/form-data'
        }
        console.log(data)
        Axios.post('/user/userProfile',data)
        .then((response)=>{
            console.log(response);
            this.props.getUserProfile(this.props.data._id);
            
           
        })
    }
   
}
const mapStateToProps = state => {
    return {
    auth: state.auth,
    //errors: state.errors,
    //success:state.success,
    userProfileReducer:state.userProfileReducer
  }};
  
const mapDispatchToProps = dispatch => {
    return {
        getUserProfile: (_id) => dispatch(getUserProfile(_id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProfileModal));