import {GET_TWEETS_FREQUENCY_WISE_DAILY} from '../actions/action-types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case GET_TWEETS_FREQUENCY_WISE_DAILY: 
          return action.payload;

      default:
           return state;
  }
}