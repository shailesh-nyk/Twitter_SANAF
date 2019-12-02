import { GET_FOLLOWED_BY } from "../actions/action-types";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_FOLLOWED_BY:
        return action.payload;
      default:
        return state;
    }
  }