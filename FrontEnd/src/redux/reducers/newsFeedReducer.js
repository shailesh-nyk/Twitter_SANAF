import { NEWSFEED, SET_TWEET_VIEW_DATA } from "../actions/action-types";

const initialState = {
    newsFeed: null,
    tweetViewData: null
}

const newsFeedReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEWSFEED: {
            return {
                ...state,
                newsFeed: action.payload
            }
        }
        case SET_TWEET_VIEW_DATA: {
            return {
                ...state,
                tweetViewData: action.payload
            }
        }
        default:
            return state;
    }
}

export default newsFeedReducer;