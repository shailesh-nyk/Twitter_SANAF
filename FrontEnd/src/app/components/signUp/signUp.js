import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUp } from "../../../redux/actions/authActions";
import classnames from "classnames";
import logo from '../../../assets/images/logo.png';


class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      phone_no : "",
      month    : "",
      day      : "1",
      year     : "",
      onToggle : "email",
      errors: {}
    };
  }
  

  componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
      
      document.getElementById('register-msg-box').style.display="block";
                     document.getElementById('register-msg-box').className = 'alert-danger mt-1 p-1';
                     document.getElementById('register-msg-box').innerHTML    = nextProps.errors.msg;
    }
    else{
      document.getElementById('register-msg-box').style.display="none";
    }
  }

  componentDidMount() {

    document.body.classList.add("t-sign-up-body");
    dateMonthYearGenerator();
    
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
          
          document.body.classList.remove("t-sign-up-body");
          this.props.history.push("/ui");
     }
  }

  onToggle = e =>{

      if(this.state.onToggle=="email"){
        this.setState({onToggle:"phone",phone_no:""});
        window.$('#phone-no-row').hide();
        window.$('#email-row').show();
      }else{
        this.setState({onToggle:"email",email:""});
        window.$('#email-row').hide();
        window.$('#phone-no-row').show();
      }

  }
  
  onChange = e => {
  
    this.setState({ [e.target.id]: e.target.value });
    document.getElementById('register-msg-box').style.display="none";
  };

  onSelect = e =>{
    
     if(window.$('#year option:selected').text()!="")
            window.$('#next-btn').prop('disabled', false );
     else
           window.$('#next-btn').prop('disabled', true ); 

           
       if(e.target.id=="month")
             { 
               this.setState({ [e.target.id]: parseInt(e.target.value)+1 });
               this.setState({day:"1"});
             } 
       else if(e.target.id=="year")
         { 
           this.setState({ [e.target.id]: e.target.value });
           this.setState({day:"1"});
         } 
       else          
        this.setState({ [e.target.id]: e.target.value });

  }
  
  onSubmit = e => {
    e.preventDefault();
    
    let month,day;
    if(this.state.month<10)
        month = ("0" + this.state.month);//.slice(-2);
    else
        month = this.state.month;   
        

    if(this.state.day<10)
        day = "0"+this.state.day;
    else
         day = this.state.day;   

    const newUser = {
      name: this.state.name,
      phone_no: this.state.phone_no,
      email: this.state.email,
      password: this.state.password,
      d_o_b: this.state.year+'-'+month+'-'+day
    };
    console.log(newUser);

    if(newUser.email!="" || newUser.phone_no!="")
       {
        this.props.signUp(newUser, this.props.history);      
       }
    else{
         alert("Either enter email Id or Phone Number");
         return false;
    }   

    
  
  };
  
  render() {
    const { errors } = this.state;
    
    return (
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">

                <div className="row">
                <div className ="col-md-7 mx-auto bg-white p-3 mt-4 border t-sign-up-rounded">
                <form onSubmit={this.onSubmit} autoComplete="off">
                  <div className="row">
                    <div className="col-6 px-0 mr-4">
                        <img src={logo} alt="logo" className="rounded mx-auto d-block float-right" height="25px"/>
                     </div>
                     <div className="col-5 px-0 ml-3">
                            <button
                              id = "next-btn"
                              type="submit"
                              className="btn btn-sm t-btn-primary-sign-up float-right"
                              disabled={true}
                              
                            >
                              Next
                            </button>
                      </div> 
                  </div>
                  <h5 className="p-2" id="register-msg-box" style={{display:'none'}}></h5>  
                  <h5 className="p-2 font-weight-bold">Create your account</h5>
                        
                          <div className="row">
                              <div className="col-md-12">
                                    <div className="form-group">
                                     <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        required
                                        pattern="^[a-zA-Z\s]+$"
                                        minLength="1"
                                        maxLength="20"
                                        className={classnames("form-control", {
                                          invalid: errors.name
                                        })}
                                      />
                                      
                                    </div>
                                  </div> 
                            </div>

                              <div className="row" id="email-row" style={{display:"none"}}>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                     <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        placeholder = "Email"
                                        email="true"
                                        minLength="1"
                                        maxLength="30"
                                  
                                        className={classnames("form-control", {
                                          invalid: errors.email
                                        })}
                                      />
                                      
                                    </div>
                                  </div>
                                </div> 

                                <div className="row" id="phone-no-row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                     <input
                                        onChange={this.onChange}
                                        value={this.state.phone_no}
                                        error={errors.phone_no}
                                        id="phone_no"
                                        type="phone_no"
                                        placeholder = "Phone"
                                        pattern="^[0-9]+$"
                                        minLength="1"
                                        maxLength="10"
                                        
                                        className={classnames("form-control", {
                                          invalid: errors.phone_no
                                        })}
                                      />
                                      
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">   
                                        <p id="toggle" className="ml-2 mt-0 mb-0 t-font-size-14 t-app-theme-color t-icon" onClick={this.onToggle}>Use {this.state.onToggle} instead</p>
                                    </div> 
                                </div>

                              <div className="row">
                                <div className="col-md-12">   
                                    <div className="form-group has-feedback">
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        pattern="^[a-zA-Z0-9]+$"
                                        minLength="1"
                                        maxLength="10"
                                        className={classnames("form-control", {
                                          invalid: errors.password
                                        })}
                                      />
                                      
                                    </div>
                                  </div> 
                                </div>   
                      
                                <div className="row">
                                <div className="col-md-12">   
                                    <div className="form-group has-feedback">
                                      <div>
								                         <span className="font-weight-bold t-font-size-14">Date of Birth</span>
							                        </div>
                                      <h6 className="text-muted">This will not be shown publicly. Confirm your age to receive the appropriate experience.</h6>
                                    </div>
                                  </div> 
                                </div> 
                                <div className="row">
                                  <div className="col-md-4">
                                        <div className="form-group bg-light">
                                                <span className="text-muted ml-2 t-font-size-16">Month
                                                  <select className="form-control bg-light" id="month" onChange={this.onSelect} required>
                                                  <option></option>
                                                  </select>
                                                  </span> 
                                              </div>
                                     </div>
                                     <div className="col-md-4">
                                        <div className="form-group bg-light">
                                                <span className="text-muted ml-2 t-font-size-16">Day
                                                    <select className="form-control bg-light" id="day" onChange={this.onSelect} required>
                                                        <option></option>
                                                    </select>
                                                  </span>
                                              </div>
                                     </div>
                                     <div className="col-md-4">
                                        <div className="form-group bg-light">
                                                <span className="text-muted ml-2 t-font-size-16">Year
                                                  <select className="t-form-control-dropdown bg-light" id="year" onChange={this.onSelect} required>
                                                       <option></option>
                                                  </select>
                                                  </span>
                                              </div>
                                     </div>     
                                </div>
                                
                    </form>
                    
                    </div>
                
                </div>
            </div>
        </div>
      </div>
    );
  }

}

let dateMonthYearGenerator = ()=>{
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  var qntYears = 50;
  var selectYear = window.$("#year");
  var selectMonth = window.$("#month");
  var selectDay = window.$("#day");
  var currentYear = new Date().getFullYear();
  
  for (var y = 0; y < qntYears; y++){
    let date = new Date(currentYear);
    var yearElem = document.createElement("option");
    yearElem.value = currentYear 
    yearElem.textContent = currentYear;
    selectYear.append(yearElem);
    currentYear--;
  } 

  for (var m = 0; m < 12; m++){
      let monthNum = new Date(2018, m).getMonth()
      let month = monthNames[monthNum];
      var monthElem = document.createElement("option");
      monthElem.value = monthNum; 
      monthElem.textContent = month;
      selectMonth.append(monthElem);
    }

    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    var day = d.getDate();

    //selectYear.val(year); 
    selectYear.on("change", AdjustDays);  
    //selectMonth.val(month);    
    selectMonth.on("change", AdjustDays);

    AdjustDays();
    //selectDay.val(day)
    
    function AdjustDays(){
      var year = selectYear.val();
      var month = parseInt(selectMonth.val()) + 1;
      selectDay.empty();
      
      //get the last day, so the number of days in that month
      var days = new Date(year, month, 0).getDate(); 
      
      //lets create the days of that month
      for (var d = 1; d <= days; d++){
        var dayElem = document.createElement("option");
        dayElem.value = d; 
        dayElem.textContent = d;
        selectDay.append(dayElem);
      }
    } 
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{signUp})(withRouter(SignUp));