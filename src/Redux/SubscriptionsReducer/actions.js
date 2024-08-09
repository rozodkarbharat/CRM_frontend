import axios from "axios";
import Cookies from "js-cookie";
import { ALLSUBSCRIPTION, CURRENTMONTHSUBSCRIPTION, EXPIRINGSUBSCRIPTION, SUBSCRIPTION_SHOWNOTIFICATION, SUBSCRIPTION_STARTLOADING, TODAYSUBSCRIPTION, TRIAL } from "./action.type";
import { SHOWNOTIFICATION, STARTLOADING, STOPLOADING } from "../MiscReducer/action.type";
import { HideNotification, ShowNotification, StartLoading, StopLoading } from "../MiscReducer/action";



export const GetTodaySubscription = () => (dispatch) => {
  dispatch({
    type:SUBSCRIPTION_STARTLOADING
  })
    try {
        axios
            .get("https://crm-backend-8ogr.onrender.com/ams_subscription/today-subscription",
                { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
            )
            .then((response) => {
                dispatch({ type: TODAYSUBSCRIPTION, payload: response.data })
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload:"Something went wrong, Please trying again" });
            });
    }

    catch (e) {
        
        dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
    
}

export const GetCurrentMonthSubscription = () => (dispatch) => {
    dispatch({
      type:SUBSCRIPTION_STARTLOADING
    })
      try {
          axios
              .get("https://crm-backend-8ogr.onrender.com/ams_subscription/current-month-subscription",
                  { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
              )
              .then((response) => {
                let Amount=response.data.data.Sum||0
                  dispatch({ type: CURRENTMONTHSUBSCRIPTION, payload: Amount })
              })
              .catch((error) => {
                  console.log(error.message, "error")
                  dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload:"Something went wrong, Please trying again" });
              });
      }
  
      catch (e) {
          
          dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
      }
      
  }

export const GetAllSubscriptions = () => (dispatch) => {
    dispatch({
        type:SUBSCRIPTION_STARTLOADING
      })
    try {
        axios
            .get("https://crm-backend-8ogr.onrender.com/ams_subscription/all-subscription",
                { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
            )
            .then((response) => {
                dispatch({ type: ALLSUBSCRIPTION, payload: response.data })
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const GetTrial = () => (dispatch) => {
    dispatch({
        type:SUBSCRIPTION_STARTLOADING
      })
    try {
        axios
            .get("https://crm-backend-8ogr.onrender.com/ams_subscription/All-trial-users?active=true",
                { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
            )
            .then((response) => {
                dispatch({ type: TRIAL, payload: response.data })
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });

    }
}


export const GetExpiringSubscriptions=()=>(dispatch)=>{
    dispatch({
        type:SUBSCRIPTION_STARTLOADING
      })
    try {
        axios
            .get("https://crm-backend-8ogr.onrender.com/ams_subscription/subscription-expiring-in-seven-days",
                { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
            )
            .then((response) => {

                dispatch({ type: EXPIRINGSUBSCRIPTION, payload: response.data&&response.data.data?response.data.data:[] })
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: SUBSCRIPTION_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });

    }
}
