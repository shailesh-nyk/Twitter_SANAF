import React from 'react';
import logo from '../assets/images/logo.png';
import { Route, Switch, Redirect } from 'react-router-dom';
//import Login  from './pages/login/login';
//import SignUp from './pages/signup/signup';
import SignUp from './components/signUp/signUp';
import Login from './components/login/login';
import Main from './pages/main/main';
import Loader from './components/loader/loader';
import Messages from './components/messages/messages';

import jwt_decode from "jwt-decode";
import setAuthToken from "../config/setAuthToken";
import { setCurrentUser, logoutUser } from "../redux/actions/authActions";
import store from "../store";

import Dashboard from './components/dashboard/dashboard';
//import { Provider } from "react-redux";



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  console.log("Token ",token);
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}



class App extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
        loading: true
     }
  }
  componentDidMount() {
      setTimeout(() => {
        this.setState({
           loading: false
        })
      },800)
  }
  render() {
    
    if(this.state.loading) {
      return (
        <div className="t-initial-loader">
            <img src={logo} alt="logo"/>
        </div>
        
      )
    } else {
      return (
        <div style={{width: "100%"}}>
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/login"/>
            )} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/ui" component={Main}/>
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Loader/>
          <Messages/>
        </div>
      )
    }
  }
}

export default App;
