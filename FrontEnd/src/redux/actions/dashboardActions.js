import axios from "axios";

import {
  GET_ERRORS,
  GET_SUCCESS_MSG,
  GET_TWEETS_WITH_VIEWS,
  GET_TWEETS_WITH_LIKES,
  GET_TWEETS_WITH_RETWEETS,
  GET_TWEETS_FREQUENCY_WISE_DAILY,
  GET_TWEETS_FREQUENCY_WISE_MONTHLY,
  GET_TWEETS_FREQUENCY_WISE_HOURLY,
  GET_TWEETS_WITH_PROFILE_VIEWS
} from "./action-types";

// Get Tweets With Views
export const getTweetsWithViews = (history) => dispatch => {
  axios
    .get("graphs/tweets_with_views")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_TWEETS_WITH_VIEWS;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                }
         )
    .catch(err => 
      { console.log("In Errr");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Get Tweets With Likes
export const getTweetsWithLikes = (history) => dispatch => {
  axios
    .get("graphs/tweets_with_likes")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_TWEETS_WITH_LIKES;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                }
         )
    .catch(err => 
      { console.log("In Errr");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Get Tweets With Retweets
export const getTweetsWithRetweets = (history) => dispatch => {
  axios
    .get("graphs/tweets_with_retweets")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_TWEETS_WITH_RETWEETS;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                }
         )
    .catch(err => 
      { console.log("In Errr");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Get Tweets Frequency Wise Daily
export const getTweetsFrequencyWiseDaily = (history) => dispatch => {
  axios
    .get("graphs/tweets_frequency_wise_daily")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_TWEETS_FREQUENCY_WISE_DAILY;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                }
         )
    .catch(err => 
      { console.log("In Errr");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Get Tweets Frequency Wise Monthly
export const getTweetsFrequencyWiseMonthly = (history) => dispatch => {
  axios
    .get("graphs/tweets_frequency_wise_monthly")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_TWEETS_FREQUENCY_WISE_MONTHLY;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                }
         )
    .catch(err => 
      { console.log("In Errr");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Get Tweets Frequency Wise Hourly
export const getTweetsFrequencyWiseHourly = (history) => dispatch => {
  axios
    .get("graphs/tweets_frequency_wise_hourly")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_TWEETS_FREQUENCY_WISE_HOURLY;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                }
         )
    .catch(err => 
      { console.log("In Errr");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Get Tweets Profile Views
export const getTweetsWithProfileViews = (history) => dispatch => {
  axios
    .get("graphs/tweets_with_profile_views")
    .then(res => {
                  
                   let  dispatchType = GET_ERRORS;

                    if(res.data.success)
                          dispatchType = GET_TWEETS_WITH_PROFILE_VIEWS;

                  dispatch({
                    type: dispatchType,
                    payload: res.data
                  })

                }
         )
    .catch(err => 
      { console.log("In Errr");
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};