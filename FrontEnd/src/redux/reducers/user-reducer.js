import { FOLLOWING, SET_BOOKMARKS } from "../actions/action-types";

const initialState = {
    following: [],
    bookmarks: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FOLLOWING:
            return {
                ...state,
                following: action.following
            }
        case SET_BOOKMARKS: 
            return {
                ...state,
                bookmarks: action.payload
            }
        default:
            return state;
    }
}