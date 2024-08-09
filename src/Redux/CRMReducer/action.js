import axios from "axios";
import Cookies from "js-cookie";
import { CRM_SHOWNOTIFICATION, CRM_STARTLOADING, GET_CRM_LIST } from "./action.type";
 

export const getCrmUsers = (query,currentPage,active) => async (dispatch) => {
 
  dispatch({
    type:CRM_STARTLOADING
  })

    let api=`https://crm-backend-8ogr.onrender.com/crm?q=${query}&page=${currentPage}`
 
    if(active == "true"){
      api=`https://crm-backend-8ogr.onrender.com/ams_subscription/All-trial-users?search=${query}&page=${currentPage}&active=${active}`
    }


  try {
    const response = await axios.get(
      `${api}`,
      { headers: { Token: `Bearer ${Cookies.get("Token")}` } }
    );
     
    dispatch({
        type:GET_CRM_LIST,
        payload:response.data.data
    })

    
  } catch (error) {

    dispatch({
      type:CRM_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }
};
