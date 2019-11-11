import React from 'react';
import { connect } from 'react-redux';

class LeftNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return ( 
            <div className="t-leftnav-container">
                LEFTNAV
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    }   
}

export default connect(mapStateToProps)(LeftNav);