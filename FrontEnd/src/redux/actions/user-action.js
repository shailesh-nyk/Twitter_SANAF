import { FOLLOWING } from "./action-types";
import config from './../../config/app-config'
import axios from 'axios';


export const fetchFollowingThunkHelper = (following) => {
    return {
        type: FOLLOWING,
        following
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