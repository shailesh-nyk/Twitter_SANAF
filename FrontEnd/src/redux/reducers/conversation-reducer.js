import { FETCHHEADS } from "../actions/action-types";

const initialState = {
    conversationheads : null
}

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHHEADS : {
          return {
              ...state,
              conversationheads : action.conversationheads
          }
      }
    default:
        return state;
    }
  }
  
  export default conversationReducer;