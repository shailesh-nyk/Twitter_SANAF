import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TopNavDashboard extends Component {

  constructor(props) {
    super(props);
}

 
  render() {
    
    return (
            
              <nav className="navbar navbar-expand-lg navbar-dark border-bottom">
                   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                            <ul className="navbar-nav ml-auto">
                                  <li className="nav-item active">
                                  
                                  <Link className="nav-link" to="/ui">Home <span className="sr-only">(current)</span></Link>
                                  
                                    
                                  </li>
                                  
                            </ul>
                  </div>
                      
                    
                
        </nav>
        
    );
  }
}

TopNavDashboard.propTypes = {
  //auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  //auth: state.auth,
  //cartInfo:state.cartInfo
});

export default connect(mapStateToProps,{})(TopNavDashboard);