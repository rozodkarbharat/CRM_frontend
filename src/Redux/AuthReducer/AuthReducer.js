import Cookies from "js-cookie"
import { ADD, AUTH_GET_USER_NAME, AUTH_SHOWNOTIFICATION, AUTH_STARTLOADING, CLEAR_AUTH_ERROR_MESSAGE, LOGIN, LOGOUT } from "./action.type"
import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";


const initStatte = {
    Role: "",
    Name: "",
    Group_Name: "",
    EmailID: "",
    AMSID: "",
    isLoading:false,
    error:null,
}

export const AuthReducer = (state = initStatte, action) => {
    switch (action.type) {
        case AUTH_STARTLOADING:
            return { ...state, isLoading: true, error: null };
        case AUTH_SHOWNOTIFICATION:
            return { ...state, isLoading: false, error: action.payload };
        case CLEAR_AUTH_ERROR_MESSAGE:{
            return { ...state, isLoading: false, error: null };
        }
        case LOGIN: {
            
            return {
                ...state, Role: action.payload.data.Role,
                Name: action.payload.data.Name,
                Group_Name: action.payload.data.Group_Name,
                EmailID: action.payload.data.EmailID,
                AMSID: action.payload.data.AMSID,
                isLoading:false,
                error:null
            }
        }
        case AUTH_GET_USER_NAME:
            return {...state,Name:action.payload.Name,Role:action.payload.Role}
        case LOGOUT: {
            return {state,isLoading:false,error:null}
        }
        case ADD: {
            console.log("add user", action.payload)
            return {...state, isLoading:false,error:null}
        }
        default: {
            return {
                ...state
            }
        }
    }
}