import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";
import { CRM_SHOWNOTIFICATION, CRM_STARTLOADING, GET_CRM_LIST } from "./action.type";

const intialState ={
    CRMUsers:[],
    isLoading:false,
    error:null,

}


export const CRMReducer  = (state=intialState,action)=>{
const{type,payload}  =action;

switch(type){
    case CRM_STARTLOADING:
        return { ...state, isLoading: true, error: null };
      case CRM_SHOWNOTIFICATION:
        return { ...state, isLoading: false, error: payload };
    case GET_CRM_LIST:
        return {...state,CRMUsers:payload,isLoading:false,error:null}
        default:return state

}



}