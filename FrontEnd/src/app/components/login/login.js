import React, { Component, Fragment } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import TopNav from '../login/topNav';
import { loginUser } from "../../../redux/actions/authActions";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username_or_email_or_phone: "",
      password: "",
      errors: {}
    };
  }
  

  componentWillReceiveProps(nextProps) {
    console.log("From Logout.... Next Props");
    if (nextProps.auth.isAuthenticated) {

      document.body.classList.remove("t-login-body");
      document.body.classList.remove("t-sign-up-body"); 
       nextProps.history.push("/ui");
      
    }

    if (nextProps.errors.hasOwnProperty("success")) {
      /*this.setState({
        errors: nextProps.errors
      });*/
      
      document.getElementById('login-msg-box').style.display="block";
                     document.getElementById('login-msg-box').className = 'alert-danger mt-1 p-1 t-font-size-16';
                     document.getElementById('login-msg-box').innerHTML    = nextProps.errors.msg;
    }
    else{
      console.log("From Logout....");
      document.getElementById('login-msg-box').style.display="none";
    }
  }

  componentDidMount() {

    document.body.classList.add("t-login-body");
    document.body.classList.remove("t-sign-up-body");
    
    if(Object.keys(this.props.success).length!=0){
      
      document.getElementById('login-msg-box').style.display = "block";
      document.getElementById('login-msg-box').className = 'alert-success mt-1 p-1 t-font-size-16';
      document.getElementById('login-msg-box').innerHTML = this.props.success.msg;
    }
    else{
      //document.getElementById('login-msg-box').style.display="none";
    }
    
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      
         document.body.classList.remove("t-login-body");
          this.props.history.push("/ui");
         
     }


     if(this.props.location.hasOwnProperty("comingFrom")){
      
      document.getElementById('login-msg-box').style.display = "block";
      document.getElementById('login-msg-box').className = 'alert-success mt-1 p-1 t-font-size-16';
      let msgToDisplay = "";
      if(this.props.location.comingFrom=="deactivateAccount")
             msgToDisplay = "Your account has been deactivated";
      else
            msgToDisplay = "You have been Successfully Logged Out...";
      
      document.getElementById('login-msg-box').innerHTML = msgToDisplay;
      
     }

  }
  
  onChange = e => {
  
    this.setState({ [e.target.id]: e.target.value });
    document.getElementById('login-msg-box').style.display="none";
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const newUser = {
      username_or_email_or_phone: this.state.username_or_email_or_phone,
      password: this.state.password
    };
    
    //console.log(newUser);
    
    this.props.loginUser(newUser, this.props.history); 
  
  };
  
  

  render() {
    const { errors } = this.state;
    
    return (
      <React.Fragment>
        <TopNav/>
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">

                <div className="row">
                <div className ="col-md-7 mx-auto bg-white p-3 mt-4 border">
                  <h5 className="p-2" id="login-msg-box" style={{display:'none'}}></h5>  
                  <h5 className="p-2 ml-5 font-weight-bold">Log In to Twitter</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          
                              <div className="row" id="email-row">
                                  <div className="col-md-5 ml-5">
                                    <div className="form-group">
                                     <input
                                        onChange={this.onChange}
                                        value={this.state.username_or_email_or_phone}
                                        error={errors.username_or_email_or_phone}
                                        id="username_or_email_or_phone"
                                        type="username_or_email_or_phone"
                                        placeholder = "Phone, email or Username"
                                        minLength="1"
                                        maxLength="30"
                                        required
                                        className={classnames("t-login-form-control", {
                                          invalid: errors.email
                                        })}
                                      />
                                      
                                    </div>
                                  </div>
                                </div> 

                              <div className="row">
                                <div className="col-md-5 ml-5">   
                                    <div className="form-group has-feedback">
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        pattern="^[a-zA-Z]+$"
                                        minLength="1"
                                        maxLength="10"
                                        className={classnames("t-login-form-control", {
                                          invalid: errors.password
                                        })}
                                      />
                                      
                                    </div>
                                  </div> 
                                </div> 

                                <div className="row">
                                   <div className="col-2 ml-5">
                                          <button
                                            type="submit"
                                            className="btn btn-sm t-btn-primary-sign-up"
                                          >
                                            Log in
                                          </button>
                                    </div>
                                    <div className="col-6 form-check">
                                          <input type="checkbox" id="exampleCheck1"/>
                                          <label className="form-check-label t-font-size-14 ml-1 t-icon">Remember Me</label>
                                          <label className="t-font-size-14 ml-1 t-icon t-app-theme-color">Forgot Password?</label>
                                    </div>
                                </div>    
                    </form>
                    
                    </div>
                    
                    <div className ="col-md-7 mx-auto bg-white p-3 border t-login-footer-background">
                                <h5 className="p-2 ml-5 t-font-size-14">New to Twitter?<span className="t-app-theme-color"><Link to="signUp"> Sign up now ></Link></span></h5>
                    </div>              

                </div>
            </div>
        </div>
      </div>
      </React.Fragment>
    );
  }

}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{loginUser})(withRouter(Login));