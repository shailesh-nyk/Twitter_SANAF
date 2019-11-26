import { FOLLOWING } from "../actions/action-types";

const initialState = {
    following: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FOLLOWING:
            return {
                ...state,
                following: action.following
            }
        default:
            return state;
    }
}