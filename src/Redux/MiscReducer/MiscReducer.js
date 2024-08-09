import {  SHOWNOTIFICATION, STARTLOADING, STOPLOADING } from "./action.type"



const initStatte = {
    isLoading: false,
    isNotification: false,
    Message: ""
}


export const MiscReducer = (state = initStatte, action) => {
    switch (action.type) {
        case STARTLOADING: {
            return { ...state, isLoading: true }
        }
        case STOPLOADING: {
            return { ...state, isLoading: false }
        }
        case SHOWNOTIFICATION: {
            return { ...state, Message: action.payload, isNotification: true }
        }

        default: {
            return state
        }
    }
}