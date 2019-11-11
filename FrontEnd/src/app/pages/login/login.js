import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() { 
      return (
            <h2 style={{textAlign: 'center'}}>add LOGIN content here bruh!!!!</h2>
      )
    }
}
const mapStateToProps = state => {
    return {
    }   
}
const mapDispatchToProps = dispatch => {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);