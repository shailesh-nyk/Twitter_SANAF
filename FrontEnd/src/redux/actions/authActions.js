import axios from "axios";
import setAuthToken from "../../config/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_USER_FIRST_NAME,
  GET_SUCCESS_MSG,
  RESET_ALL_STATE
} from "./action-types";

// Register User
export const signUp = (userData, history) => dispatch => {
  axios
    .post("user/register", userData)
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_SUCCESS_MSG;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                  if(res.data.success)
                       history.push("/login");

                }
         ) // re-direct to login on successful register
    .catch(err => 
      { console.log("In Errro");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};


// Login - get user token
axios.defaults.withCredentials = true;
export const loginUser = userData => dispatch => {
  dispatch({
    type: RESET_ALL_STATE
  });
  axios
    .post("user/login", userData)
    .then(res => {

      if(res.data.success)
       {
          // Save to localStorage// Set token to localStorage
          //console.log("Response ",res);
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          // Set token to Auth header
          setAuthToken(token);
          // Decode token to get user data
          const decoded = jwt_decode(token);
          // Set current user
          dispatch(setCurrentUser(decoded));
       }else{

        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });

       }  

      //dispatch(getUserFirstName());
      
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = (history) => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({
    type: RESET_ALL_STATE
  });

  //history.push("/login");
  history.push({
    pathname: '/login',
    comingFrom: 'logout'
  })

};

// Account Deactivation
export const deactivateAccount = (history) => dispatch => {
  axios
    .put("/user/deactivateAccount")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                     {
                          //dispatchType = GET_SUCCESS_MSG;
                          // Remove token from local storage
                          localStorage.removeItem("jwtToken");
                          // Remove auth header for future requests
                          setAuthToken(false);
                          // Set current user to empty object {} which will set isAuthenticated to false
                          dispatch(setCurrentUser({}));
                          
                          dispatch({
                            type: RESET_ALL_STATE
                          });


                          history.push({
                            pathname: '/login',
                            comingFrom: 'deactivateAccount'
                          });

                         

                          //history.push("/login");
                    
                     
                     }
                     else{
                          dispatch({
                            type: dispatchType,
                            payload: res.data
                          })
                     }
                  

                }
         ) // re-direct to login on successful register
    .catch(err => 
      { console.log("In Errro");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );

};


/* // Reset All State
export const resetState = () => { console.log('hi');
  return {
    type: RESET_ALL_STATE
  };
}; */

// User First Name
/*export const getUserFirstName = (history) => dispatch => {
  axios
    .get("users/userFirstName")
    .then(res => {
                  dispatch({
                    type: SET_USER_FIRST_NAME,
                    payload: res.data
                  })
                }
         )
    .catch(err => 
      { 
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};*/

