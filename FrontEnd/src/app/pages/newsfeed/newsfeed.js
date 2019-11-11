import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions/util-action';

class NewsFeed extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return(
            <h2 style={{textAlign: 'center'}}>add NEWS FEED content here</h2>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);