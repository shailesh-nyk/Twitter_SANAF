import { GET_USER_LISTS, GET_LIST_DETAILS } from "../actions/action-types";

const initialState = {
     ownedList: [],
     subscribedList: [],
     listViewData: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_LISTS:
        return {
            ...state,
            ownedList: action.payload.ownedList,
            subscribedList: action.payload.subscribedList
        }
        case GET_LIST_DETAILS:
            return {
            ...state,
            listViewData: action.payload
        }
        
        default:
            return state;
    }
}