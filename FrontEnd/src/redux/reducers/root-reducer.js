import { combineReducers } from "redux";
import utilReducer from './util-reducer';
import conversationReducer from './conversation-reducer';

const rootReducer = combineReducers({
    utilReducer,
    conversationReducer
});

export default rootReducer;
