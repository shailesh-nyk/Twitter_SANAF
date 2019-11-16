import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions/util-action';

class SignUp extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <h2 style={{textAlign: 'center'}}>add SIGNUP content here</h2>
        
        )
    }
}
const mapStateToProps = state => {
    return {
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);