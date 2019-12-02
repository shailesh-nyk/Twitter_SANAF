import { GET_FOLLOWING } from "../actions/action-types";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_FOLLOWING:
        return action.payload;
      default:
        return state;
    }
  }