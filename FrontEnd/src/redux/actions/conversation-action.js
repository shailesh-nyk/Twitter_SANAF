import { FETCHHEADS } from "./action-types";
import config from './../../config/app-config'
import axios from 'axios';

export const fetchConversationheadsThunkHelper = (conversationheads) => {
    return {
        type: FETCHHEADS,
        conversationheads
    }
}

export const fetchConversationheads = (id) => {
    return (dispatch) => {
        axios.get("http://localhost:8000/conversation/heads", {
            params: { id },
            withCredentials: false,
        })
            .then(function (response) {
                dispatch(fetchConversationheadsThunkHelper(response.data.msgDesc));
            })
            .catch(function (error) {
                dispatch(fetchConversationheadsThunkHelper({}));
            });

    }
}

export const sendmessage = (message_payload) => {
    return (dispatch) => {
        axios.post("http://localhost:8000/conversation/save", {
            message: message_payload.message,
            users: message_payload.users,
        },
            { withCredentials: false })
            .then(function (response) {
                if (response.data.success) {
                    dispatch(fetchConversationheads(message_payload.users[0]));
                }
            })
            .catch(function (error) {

            });

    }
}

export const createConvHead = (message_payload) => {
    return (dispatch) => {
        axios.post("http://localhost:8000/conversation/create", {
            users: message_payload.users
        },
            { withCredentials: false })
            .then(function (response) {
                if (response.data.success) {
                    dispatch(fetchConversationheads(message_payload.users[0]));
                }
            })
            .catch(function (error) {

            });

    }
}