import axios from "axios";
import { SUBSCRIPTIONDETAIL, SUBSCRIPTIONDETAIL_SHOWNOTIFICATION, SUBSCRIPTIONDETAIL_STARTLOADING } from "./action.type";
import Cookies from "js-cookie";
import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";

export const GetSubscriptionDetail = () => async (dispatch) => {
   dispatch({
    type:SUBSCRIPTIONDETAIL_STARTLOADING
   })
    try {
      const response = await axios.get(
        "https://crm-backend-8ogr.onrender.com/ams_subscription/subscription-details",
        { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
      );
    if(response.data  && response.data.length>0){
      const totalAmount =  response.data.reduce((acc,curr)=>  acc+Number(curr.Amount),0)  
       
      dispatch({ type: SUBSCRIPTIONDETAIL, payload: {data:response.data, totalAmount}});
    }else{
      dispatch({ type: SUBSCRIPTIONDETAIL, payload: {data:[], totalAmount:0}});
    }
    
    } catch (error) {
      dispatch({
        type:SUBSCRIPTIONDETAIL_SHOWNOTIFICATION,
        payload:"Something went wrong, Please trying again"
      })
      
    }
  };

  
  
export const GetSubscriptionDetailFilter = (startDate,endDate,selectedStrategy,currentPage) => async (dispatch) => {
  dispatch({
    type:SUBSCRIPTIONDETAIL_STARTLOADING
   })
   const body = {startDate,endDate,selectedStrategy}
   
  try {
    const response = await axios.post(
      `https://crm-backend-8ogr.onrender.com/ams_subscription/subscription-details-filter?page=${currentPage}`,
      body,
      { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
    );
const totalAmount =  response.data.data.reduce((acc,curr)=>  acc+Number(curr.Amount),0)
 

    dispatch({ type: SUBSCRIPTIONDETAIL, payload:{data:response.data.data,totalAmount} });
  } catch (error) {
    dispatch({
      type:SUBSCRIPTIONDETAIL_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })

  }
};