import { GET_SUCCESS_MSG} from "../actions/action-types";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SUCCESS_MSG:
        return action.payload;
      default:
        return state;
    }
  }