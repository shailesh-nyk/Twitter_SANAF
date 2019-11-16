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
          </Switch>
          <Loader/>
          <Messages/>
        </div>
      )
    }
  }
}

export default App;
