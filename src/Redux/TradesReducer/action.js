import axios from "axios";
import Cookies from "js-cookie";

import { RUNNINGTRADES, TODAYSORDERS, TRADES_SHOWNOTIFICATION, TRADES_STARTLOADING, VIEWORDERS,PLACEORDER, TRADES_SHOW_SUCCESS_NOTIFICATION, TRADEDUSERS, USERWISE_TRADES, GETRUNNINGEQUITYTRADES} from "./action.type";



function combineWithID({ data }) {
    return new Promise((resolve, reject) => {
      try {
        let newdata = {};
  
        for (var a = 0; a < data.length; a++) {
          if (newdata.hasOwnProperty(data[a].Id)) {
            newdata[data[a].Id].push(data[a]);
          } else {
            newdata[data[a].Id] = [data[a]];
          }
        }
        let Data =
          Object.values(newdata).length > 0 ? Object.values(newdata) : [];
        resolve(Data);
      } catch (error) {
        reject(error);
      }
    });
  }


export const GetRunningTrades=()=>(dispatch)=>{
   
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
        .get("https://crm-backend-8ogr.onrender.com/ams_strategy/running-trades",
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
        )
        .then((response) => {
                if(response.data){
                    
                    dispatch({ type: RUNNINGTRADES, payload: response.data })
                }
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}


export const GetTodayOrders = ()=>(dispatch) => {
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
        .get("https://crm-backend-8ogr.onrender.com/ams_strategy/todays-order",
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
        )
        .then((response) => {
                if(response.data){
                    dispatch({ type: TODAYSORDERS, payload: response.data })
                }
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const GetUserwiseOrder = ({UserID})=>(dispatch) => {
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
        .get(`https://crm-backend-8ogr.onrender.com/ams_strategy/orders-by-userid/${UserID}`,
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
        )
        .then((response) => {
                if(response.data){
                    dispatch({ type: TODAYSORDERS, payload: response.data })
                }
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const ViewOrder=(data)=>(dispatch)=>{
    dispatch({ type: VIEWORDERS, payload:data})
}


export const PlaceOrder=(data)=>(dispatch)=>{
    dispatch({
        type:TRADES_STARTLOADING
    })
    axios.post("http://216.48.177.99:7000/place_order",data).then((response)=>{
        dispatch({type: TRADES_SHOW_SUCCESS_NOTIFICATION,payload:"Order Placed Successfully!"})

    }).catch((error) => {
        console.log(error.message, "error")
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    });
 
}

export const InsertNewTrades=(data)=>(dispatch)=>{
    axios.post(
        "https://crm-backend-8ogr.onrender.com/ams_strategy/insert-trade",
        data,
        {
          headers: {
            token: `Bearer ${Cookies.get("Token")}`
          }
        }
      ).then((response)=>{
        if(response.status!==201){
            dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
        }
        else{
            dispatch({type: PLACEORDER,payload:data})         
        }
    }).catch((error) => {
        console.log(error.message, "error")
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    });

}

export const Tradedusers=()=>(dispatch)=>{
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
        .get("https://crm-backend-8ogr.onrender.com/ams_strategy/today-traded-users",
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
        )
        .then((response) => {
                if(response.data){
                    dispatch({ type: TRADEDUSERS, payload: response.data })
                }
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const UserWiseTrades=({UserID})=>(dispatch)=>{
    
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
        .get(`https://crm-backend-8ogr.onrender.com/ams_strategy/users-live-trades/${UserID}`,
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
        )
        .then(async(response) => {
                if(response.data){
                    let payload = await combineWithID({ data: response.data.data });
                    dispatch({ type: USERWISE_TRADES, payload})
                }
        })
        .catch((error) => {
            console.log(error.message, "error")
            dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
        });
    }
    catch (e) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const GetUsersTrades=({startDate,endDate,UserID})=>(dispatch)=>{
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
        .post(`https://crm-backend-8ogr.onrender.com/ams_strategy/users-trades/${UserID}`,{
            startDate,endDate
        },
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
        )
        .then(async(response) => {
                if(response.data){
                    let payload = await combineWithID({ data: response.data.data });
                    dispatch({ type: USERWISE_TRADES, payload})
                }
        })
        .catch((error) => {
            console.log(error.message, "error")
            dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
        });
    }
    catch (e) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const InsertEquityTrade=(data)=>(dispatch)=>{
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
            .post("https://crm-backend-8ogr.onrender.com/ams_strategy/insert-equity-trade",data, {
                headers: { Token: `Bearer ${Cookies.get("Token")}` },
            })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (err) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}

export const GetEquityRunningTrades=()=>(dispatch) => {
    dispatch({
        type:TRADES_STARTLOADING
    })
    try {
        axios
        .get("https://crm-backend-8ogr.onrender.com/ams_strategy/running-equity-trades",
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
        )
        .then((response) => {
                if(response.data && response.data.data){
                    dispatch({ type: GETRUNNINGEQUITYTRADES, payload: response.data.data })
                }
                else{
                    dispatch({ type: GETRUNNINGEQUITYTRADES, payload: [] })
                }
            })
            .catch((error) => {
                console.log(error.message, "error")
                dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
            });
    }
    catch (e) {
        dispatch({ type: TRADES_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    }
}