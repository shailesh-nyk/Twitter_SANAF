import { POST_TWEET } from './action-types';
import axios from 'axios';
import config from './../../config/app-config'
import {startLoader, stopLoader, setMessage } from './util-action';

// const postTweetDispatcher = (payload) => {
//     return {
//         type: POST_TWEET,
//         payload
//     }
// }

export const postTweet = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post('/api/tweet', payload)
        .then(resp => {
            dispatch(stopLoader());
            if(resp.data.success) {
                dispatch(setMessage({
                    msg: resp.data.msg,
                    name: 'success'
                }))
            } else {
                dispatch(setMessage({
                    msg: "We couldn't post your tweet. Please try again",
                    name: 'danger'
                }))
            }
        }, err => {
            dispatch(stopLoader());
            dispatch(setMessage({
                msg: "Something went wrong",
                name: 'danger'
            }))
        });
    };
}

export const bookmarkTweet = (payload) => {
    return dispatch => {
        dispatch(startLoader());
        axios.post('/api/tweet/bookmark', payload)
        .then(resp => {
            dispatch(stopLoader());
            if(resp.data.success) {
                dispatch(setMessage({
                    msg: resp.data.msg,
                    name: 'success'
                }))
            } else {
                dispatch(setMessage({
                    msg: "We couldn't bookmark this tweet. Please try again",
                    name: 'danger'
                }))
            }
        }, err => {
            dispatch(stopLoader());
            dispatch(setMessage({
                msg: "Something went wrong",
                name: 'danger'
            }))
        });
    };
}


