import { combineReducers } from "redux";
import utilReducer from './util-reducer';
import conversationReducer from './conversation-reducer';

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";

import {
    RESET_ALL_STATE
  } from "../../redux/actions/action-types";

const appReducer = combineReducers({
    utilReducer,
    conversationReducer,
    auth: authReducer,
    errors: errorReducer,
    success: successReducer,

});

const rootReducer = (state, action) => {
    if (action.type === RESET_ALL_STATE) {
      state = undefined;
    }
  
    return appReducer(state, action);
  };

export default rootReducer;
