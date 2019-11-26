import { NEWSFEED, SET_TWEET_VIEW_DATA } from './action-types';
import axios from 'axios';
import config from './../../config/app-config'
import {startLoader, stopLoader, setMessage } from './util-action';

const getNewsFeedDispatcher = (payload) => {
    return {
        type: NEWSFEED,
        payload
    }
}

export const getNewsFeed = () => {
    return dispatch => {
        dispatch(startLoader());
        axios.get('/user/newsfeed')
        .then(resp => {
            dispatch(stopLoader());
            if(resp.data.success) {
                dispatch(getNewsFeedDispatcher(resp.data.payload));
            } else {
                dispatch(setMessage({
                    msg: "We couldn't fetch your newsfeed. Try to refresh the page",
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

export const setTweetViewData = (payload) => {
    return {
        type: SET_TWEET_VIEW_DATA,
        payload
    }
}
