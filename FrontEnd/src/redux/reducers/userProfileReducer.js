import { GETUSERPROFILE, SET_TWEET_VIEW_DATA } from "../actions/action-types";

const initialState = {
    userProfile: null
    
}

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case  GETUSERPROFILE :{
            return {
                ...state,
                userProfile: action.payload
            }
        }
        
        default:
            return state;
    }
}

export default userProfileReducer;