import React from 'react';
import { connect } from 'react-redux';

class TopNav extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return ( 
            <div className="t-topnav-container">
                TOPNAV
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    }   
}
export default connect(mapStateToProps)(TopNav);