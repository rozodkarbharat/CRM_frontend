import {  SHOWNOTIFICATION, STARTLOADING, STOPLOADING } from "./action.type"



export const StartLoading = () => (dispatch) => {
    dispatch({ type: STARTLOADING })
}

export const StopLoading = () => (dispatch) => {
    dispatch({ type: STOPLOADING })
}


export const ShowNotification = ({ Message }) => (dispatch) => {
    dispatch({ type: SHOWNOTIFICATION, payload: Message })
}


