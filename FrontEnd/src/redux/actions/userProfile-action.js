import { GETUSERPROFILE, SET_TWEET_VIEW_DATA } from './action-types';
import axios from 'axios';
import config from './../../config/app-config'
import {startLoader, stopLoader, setMessage } from './util-action';

const getUserProfileDispatcher = (payload) => {
    return {
        type: GETUSERPROFILE,
        payload
    }
}

export const getUserProfile = (_id) => {
    console.log("here"+_id)
    return dispatch => {
       // dispatch(startLoader());
        axios.get('/user/userProfile?_id='+_id)
        .then(resp => {
         //   dispatch(stopLoader());
            if(resp.data.success) {
              //  console.log("Aishwarya");
              //  console.log(resp.data);
                dispatch(getUserProfileDispatcher(resp.data.userDetails));
            } else {
                dispatch(setMessage({
                    msg: "We couldn't fetch your profile. Try to refresh the page",
                    name: 'danger'
                }))
            }
        }, err => {
           // dispatch(stopLoader());
            dispatch(setMessage({
                msg: "Something went wrong",
                name: 'danger'
            }))
        });
    };
}

/* export const setTweetViewData = (payload) => {
    return {
        type: SET_TWEET_VIEW_DATA,
        payload
    }
}
 */