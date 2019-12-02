import { GET_USER_LISTS, GET_LIST_DETAILS } from "./action-types";
import axios from 'axios';
import { startLoader, stopLoader, setMessage } from './util-action';
import store from './../../store';

const getUserListsDispatcher = (payload) => {
    return {
        type: GET_USER_LISTS,
        payload
    }
}

const getListDetailsDispatcher = (payload) => {
    return {
        type: GET_LIST_DETAILS,
        payload
    }
}



export const getUserLists = () => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.get("/api/list")
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                    let payload = {
                        ownedList : resp.data.payload.lists.filter(list => list.createdBy._id == store.getState().auth.user.id),
                        subscribedList: resp.data.payload.lists.filter(list => list.createdBy._id != store.getState().auth.user.id)
                    }
                    dispatch(getUserListsDispatcher(payload))
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

export const createUserList = (payload) => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.post("/api/list", payload)
            .then(resp => {
                dispatch(stopLoader());
                dispatch(getUserLists());
                if (resp.data.success) {
                    dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    }))
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

export const getListDetails = (payload) => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.get("/api/list/details" , { params : payload})
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                     dispatch(getListDetailsDispatcher(resp.data.payload))
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

export const removeUserFromList = (payload) => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.delete("/api/list/member" , { data: payload } )
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                    dispatch(getListDetails({
                        list_id: payload.list_id
                    }))
                    dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    }))
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


export const editList = (payload) => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.put("/api/list" , payload )
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                    dispatch(getListDetails({
                        list_id: resp.data.payload._id
                    }))
                    dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    }))
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

export const subscribeToList = (payload) => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.post("/api/list/subscribe" , payload )
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                    dispatch(getListDetails({
                        list_id: payload.list_id
                    }))
                    dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    }))
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

export const unsubscribeToList = (payload) => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.post("/api/list/unsubscribe" , payload )
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                    dispatch(getListDetails({
                        list_id: payload.list_id
                    }))
                    dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    }))
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

export const addUserToList = (payload) => {
    return (dispatch) => {
        dispatch(startLoader());
        axios.put("/api/list/member" , payload)
            .then(resp => {
                dispatch(stopLoader());
                if (resp.data.success) {
                    dispatch(getListDetails({
                        list_id: payload.list_id
                    }))
                    dispatch(setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    }))
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