import { FOLLOWING, SET_BOOKMARKS } from "./action-types";
import config from './../../config/app-config'
import axios from 'axios';
import { startLoader, stopLoader, setMessage } from './util-action';
import { getRecommendation } from './recommendation-action';


export const fetchFollowingThunkHelper = (following) => {
    return {
        type: FOLLOWING,
        following
    }
}
const getBookmarksDispatcher = (payload) => {
    return {
        type: SET_BOOKMARKS,
        payload
    }
}

export const fetchFollowing = (id) => {
    return (dispatch) => {
        axios.get("http://localhost:8000/user/following", {
            params: { id },
            withCredentials: false,
        })
            .then(function (response) {
                dispatch(fetchFollowingThunkHelper(response.data));
            })
            .catch(function (error) {
                dispatch(fetchFollowingThunkHelper({}));
            });

    }
}

export const getBookmarks = () => {
    return (dispatch) => {
        axios.get("/user/bookmark")
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                    dispatch(getBookmarksDispatcher(resp.data.payload))
                } else {
                    dispatch(setMessage({
                        msg: resp.data.msg,
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
    }
}

export const followUser = (id, target_id) => {
    return (dispatch) => {
        axios.post(config.base + "user/follow", {
            user_id: id,
            follow_id: target_id
        },
            { withCredentials: false })
            .then(function (response) {
                dispatch(getRecommendation(id));
            })
            .catch(function (error) {

            });

    }
}