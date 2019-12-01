import { NEWSFEED_HASHTAG } from "../actions/action-types";

const initialState = {
    newsFeed: null,
}

const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEWSFEED_HASHTAG: {
            return {
                ...state,
                newsFeed: action.payload
            }
        }
        default:
            return state;
    }
}

export default recommendationReducer;