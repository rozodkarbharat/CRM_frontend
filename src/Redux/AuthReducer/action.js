import axios from "axios";
import { ADD, AUTH_GET_USER_NAME, AUTH_SHOWNOTIFICATION, AUTH_STARTLOADING, CLEAR_AUTH_ERROR_MESSAGE, LOGIN, LOGOUT } from "./action.type"
import Cookies from "js-cookie";


export const getUserName = ()=> async(dispatch)=>{
  try {

    const response =  await axios.get("https://crm-backend-8ogr.onrender.com/ams_user/get-user-name",
    { headers: { Token: `Bearer ${Cookies.get("Token")}` } })
     
    dispatch({
      type:AUTH_GET_USER_NAME,
      payload:response.data
    })
    
  } catch (error) {

    console.log(error.message, "error")
    dispatch({ type: AUTH_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" })
  }
}

export const Signin = ({ Number, Password }, onSuccess) => (dispatch) => {
  dispatch({
    type:AUTH_STARTLOADING
  })
  axios
    .post("https://crm-backend-8ogr.onrender.com/ams_user/login", { Number, Password })
    .then((response) => {
      if (response.data.Token) {
        Cookies.set("Token", response.data.Token)
        dispatch({ type: LOGIN, payload: response.data })
        onSuccess()
      } else {
        dispatch({ type: AUTH_SHOWNOTIFICATION, payload: "Invalid Credentials" });

      }
    })
    .catch((error) => {
      dispatch({ type: AUTH_SHOWNOTIFICATION, payload: "Something went wrong, Please trying again" });
    });
}


export const Signout = () => (dispatch) => {
  Cookies.remove("Token")
  dispatch({ type: LOGOUT })
}

export const ClearAuthErrorMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_ERROR_MESSAGE })
}


export const Add = () => (dispatch) => {
  console.log("Add")
  return dispatch({ type: ADD, payload: "Hello" })
}