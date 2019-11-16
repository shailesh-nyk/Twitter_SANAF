import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TopNav extends Component {

  constructor(props) {
    super(props);
}

 
  render() {
    
    return (
            
              <nav className="navbar navbar-expand-lg navbar-dark bg-white border">
                   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                            <ul className="navbar-nav ml-auto">
                                  <li className="nav-item active">
                                  
                                  <Link className="nav-link text-dark t-font-size-14" to="dashboard">Home <span className="sr-only">(current)</span></Link>
                                  
                                    
                                  </li>
                                  
                                  <li className="nav-item">
                                  
                                  <Link className="nav-link text-dark t-font-size-14" to="dashboard">About </Link>
                                  
                                    
                                  </li>


                                  <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-secondary t-font-size-14" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      English
                                    </a>
                                  </li>
                            </ul>
                  </div>
                      
                    
                
        </nav>
        
    );
  }
}

TopNav.propTypes = {
  //auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  //auth: state.auth,
  //cartInfo:state.cartInfo
});

export default connect(mapStateToProps,{})(TopNav);