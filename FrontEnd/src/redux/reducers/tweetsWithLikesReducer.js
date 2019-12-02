import {GET_TWEETS_WITH_LIKES} from '../actions/action-types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case GET_TWEETS_WITH_LIKES: 
          return action.payload;

      default:
           return state;
  }
}