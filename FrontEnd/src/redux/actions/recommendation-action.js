import { GET_RECOMMENDATION, HANDLE_SEARCH } from "./action-types";
import config from './../../config/app-config'
import axios from 'axios';


export const getRecommendationThunkHelper = (recommendation) => {
    return {
        type: GET_RECOMMENDATION,
        recommendation
    }
}

export const getRecommendation = (id) => {
    return (dispatch) => {
        axios.get(config.base + "recommendation/", {
            params: { id },
            withCredentials: false,
        })
            .then(function (response) {
                dispatch(getRecommendationThunkHelper(response.data.payload));
            })
            .catch(function (error) {
                dispatch(getRecommendationThunkHelper({}));
            });

    }
}


export const handleSearchThunkHelper = (searchResults) => {
    return {
        type: HANDLE_SEARCH,
        searchResults
    }
}

export const handleSearch = (query) => {
    return (dispatch) => {
        axios.get(config.base + "recommendation/search", { params: { query }, withCredentials: false, })
            .then(function (response) {
                dispatch(handleSearchThunkHelper(response.data.payload));
            })
            .catch(function (error) {
                dispatch(handleSearchThunkHelper({}));
            });

    }
}