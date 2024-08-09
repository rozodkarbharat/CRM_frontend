import axios from "axios";
import Cookies from "js-cookie";
import { ACTIVEBOTS, ALLOWED_STRATEGIES, USERCOUNT, USER_SHOWNOTIFICATION, USER_STARTLOADING } from "./action.type";
import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";




export const Usercount = () => (dispatch) => {
    dispatch({
        type:USER_STARTLOADING
    })
    try {
        axios
            .get("https://crm-backend-8ogr.onrender.com/ams_user/all-users-count",
                { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
            )
            .then((response) => {
                dispatch({ type: USERCOUNT, payload: response.data })
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: USER_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (err) {
        dispatch({ type: USER_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}




export const GetActiveBots = () => (dispatch) => {
    dispatch({
        type:USER_STARTLOADING
    })
    try {
        axios
            .get("https://crm-backend-8ogr.onrender.com/ams_user/active-users",
                { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
            )
            .then((response) => {
                if (response.data && response.data.data) {
                    dispatch({ type: ACTIVEBOTS, payload: response.data.data })
                }
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: USER_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (err) {
        dispatch({ type: USER_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const GetAllowedStrategies=()=>(dispatch)=>{
    dispatch({
        type:USER_STARTLOADING
    })
    try {
        axios
            .get("https://crm-backend-8ogr.onrender.com/ams_user/allowed-startegies", {
                headers: { Token: `Bearer ${Cookies.get("Token")}` },
            })
            .then((response) => {
                if (response.data && response.data.data) {
                    dispatch({ type: ALLOWED_STRATEGIES, payload: response.data.data||[] })
                }
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: USER_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (err) {
        dispatch({ type: USER_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

