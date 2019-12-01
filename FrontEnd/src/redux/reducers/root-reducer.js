import { combineReducers } from "redux";
import utilReducer from './util-reducer';
import conversationReducer from './conversation-reducer';

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";
import newsFeedReducer from './newsFeedReducer';
import userReducer from './user-reducer';

import tweetsWithViewsReducer from "./tweetsWithViewsReducer";
import tweetsWithLikesReducer from "./tweetsWithLikesReducer";
import tweetsWithRetweetsReducer from "./tweetsWithRetweetsReducer";
import tweetsFrequencyWiseDailyReducer from "./tweetsFrequencyWiseDailyReducer";
import tweetsFrequencyWiseMonthlyReducer from "./tweetsFrequencyWiseMonthlyReducer";
import tweetsFrequencyWiseHourlyReducer from "./tweetsFrequencyWiseHourlyReducer";
import tweetsWithProfileViewsReducer from "./tweetsWithProfileViewsReducer";

import {
    RESET_ALL_STATE
  } from "../../redux/actions/action-types";

const appReducer = combineReducers({
    utilReducer,
    conversationReducer,
    userReducer,
    auth: authReducer,
    errors: errorReducer,
    success: successReducer,
    tweetsWithViews : tweetsWithViewsReducer,
    tweetsWithLikes : tweetsWithLikesReducer,
    tweetsWithRetweets : tweetsWithRetweetsReducer,
    tweetsFrequencyWiseDaily : tweetsFrequencyWiseDailyReducer,
    tweetsFrequencyWiseMonthly : tweetsFrequencyWiseMonthlyReducer,
    tweetsFrequencyWiseHourly : tweetsFrequencyWiseHourlyReducer,
    tweetsWithProfileViews       : tweetsWithProfileViewsReducer, 
    newsFeedReducer,

});

const rootReducer = (state, action) => {
    if (action.type === RESET_ALL_STATE) {
      state = undefined;
    }
  
    return appReducer(state, action);
  };

export default rootReducer;
