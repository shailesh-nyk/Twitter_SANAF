import { STARTLOADER, STOPLOADER, CLRMSG, SETMSG, NEWSFEED } from "./action-types";

export const startLoader = () => {
    return { 
        type: STARTLOADER 
    };
}
export const stopLoader = () => {
    return { 
        type: STOPLOADER
    };
}
export const setMessage = (payload) => {
    return { 
        type: SETMSG,
        payload: payload
    };
}
export const clearMessage = () => {
    return { 
        type: CLRMSG
    };
}
