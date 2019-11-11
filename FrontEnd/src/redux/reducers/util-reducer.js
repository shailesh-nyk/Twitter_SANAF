import { STARTLOADER, STOPLOADER, SETMSG, CLRMSG } from "../actions/action-types";

const initialState = {
    loaderClass : 't-loader-hide',
    appStatus : {
         msg: '',
         name: ''
    }
}

const utilReducer = (state = initialState, action) => {
    switch (action.type) {
      case STARTLOADER: {
          return {
             ...state,
             loaderClass : 't-loader-show'
          };
      }
      case STOPLOADER: {
          return {
             ...state,
             loaderClass : 't-loader-hide'
          };
      }
      case SETMSG: {
          return {
            ...state,
            appStatus: action.payload
          }
      }
      case CLRMSG: {
        return {
          ...state,
          appStatus: {
              msg: '',
              name: ''
          }
        }
    }
    default:
        return state;
    }
  }
  
  export default utilReducer;