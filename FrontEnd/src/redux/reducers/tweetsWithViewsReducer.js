import {GET_TWEETS_WITH_VIEWS} from '../actions/action-types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case GET_TWEETS_WITH_VIEWS: 
          return action.payload;

      default:
           return state;
  }
}