import React from 'react';
import { connect } from 'react-redux';

class Search extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return ( 
            <div className="t-search-container">
                SEARCH
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
    }   
}

export default connect(mapStateToProps)(Search);