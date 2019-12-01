import { GET_RECOMMENDATION,HANDLE_SEARCH } from "../actions/action-types";

const initialState = {
    recommendation: null,
    searchResults : null
}

const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECOMMENDATION: {
            return {
                ...state,
                recommendation: action.recommendation
            }
        }
        case HANDLE_SEARCH: {
            return {
                ...state,
                searchResults: action.searchResults
            }
        }
        default:
            return state;
    }
}

export default recommendationReducer;