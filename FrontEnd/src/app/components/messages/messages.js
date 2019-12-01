
import React from 'react';
import { connect } from 'react-redux';
import { clearMessage } from '../../../redux/actions/util-action';

class Messages extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        if(this.props.status.msg === '') {
            return ( 
                <div className="t-alert-hidden"></div>
            )
        } else {
            if(this.props.status.name === 'success') {
                setTimeout(() => {
                    this.props.dismissAlert();
                }, 3000)
            }
            return ( 
                <div className={"alert t-alert-show t-alert-" + this.props.status.name + " alert-dismissible fade show"} role="alert">
                <strong>{this.props.status.msg}</strong>
                    <button type="button" className="close" aria-label="Close"
                        onClick={()=> this.props.dismissAlert()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        status: state.utilReducer.appStatus,
    }   
}
const mapDispatchToProps = dispatch => {
    return {
      dismissAlert: () => dispatch(clearMessage())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);