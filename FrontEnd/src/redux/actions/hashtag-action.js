import { NEWSFEED_HASHTAG } from './action-types';
import axios from 'axios';
import config from './../../config/app-config'
import { startLoader, stopLoader, setMessage } from './util-action';

const getNewsFeedDispatcher = (payload) => {
    return {
        type: NEWSFEED_HASHTAG,
        payload
    }
}

export const getNewsFeed = (hashtag_id) => {
    return dispatch => {
        dispatch(startLoader());
        axios.get(config.base + "hashtag/", {
            params: { hashtag_id },
            withCredentials: false,
        })
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
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

