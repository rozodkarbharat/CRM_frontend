import axios from "axios";
import Cookies from "js-cookie";
import { CLIENT_DETAIL_SHOWNOTIFICATION, CLIENT_DETAIL_STARTLOADING, GET_CLIENT_DETAIL, GET_CLIENT_STRATEGIES_DETAIL, UPDATE_CLIENT_DETAIL_BROKER } from "./action.type";
import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";

export const getUserDetails = (id) => async (dispatch) => {
  dispatch({
    type:CLIENT_DETAIL_STARTLOADING
  })
  try {
    const response = await axios.get(
      `https://crm-app-backend-akpj.onrender.com/client_detail/single_user/${id}`,
      { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
    );
    dispatch({
      type: GET_CLIENT_DETAIL,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type:CLIENT_DETAIL_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }
};

export const getUserDetailStrategies = (id) => async (dispatch) => {
  dispatch({
    type:CLIENT_DETAIL_STARTLOADING
   })
  try {
    const response = await axios.get(
      `https://crm-app-backend-akpj.onrender.com/client_detail/subscribed_strategies/${id}`,
      { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
    );
 
    const newData = [];

    response.data.data.forEach((item) => {
      const match = item.Strategies.match(/\[([^\]]+)\]/);
      const arrayString = match[1];
      const strategies = arrayString.split(',');
       

      strategies.forEach((strategy) => {
        newData.push({
          Amount: item.Amount,
          SignupDateTime: item.SignupDateTime,
          Strategy: strategy,
          SubscriptionDateTime: item.SubscriptionDateTime,
          SubscriptionEndDate:item.EndDate
        });
      });
    });

    

    dispatch({
      type: GET_CLIENT_STRATEGIES_DETAIL,
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type:CLIENT_DETAIL_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }
};

export const  updateBrokerapi = (id,data) => async (dispatch) => {
   dispatch({
    type:CLIENT_DETAIL_STARTLOADING
   })

  try {
    const response = await axios.put(
      `https://crm-app-backend-akpj.onrender.com/client_detail/update_api/${id}`,data,
      { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
    );
    
    dispatch({
      type:UPDATE_CLIENT_DETAIL_BROKER,
      payload:data.Broker
    })
 
  } catch (error) {
    dispatch({
      type:CLIENT_DETAIL_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }
};
