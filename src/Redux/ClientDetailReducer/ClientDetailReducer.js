import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";
import { CLIENT_DETAIL_SHOWNOTIFICATION, CLIENT_DETAIL_STARTLOADING, GET_CLIENT_DETAIL, GET_CLIENT_STRATEGIES_DETAIL, UPDATE_CLIENT_DETAIL_BROKER } from "./action.type"

const intitalState =  {
    clientDetailUser:null,
    clientStrategies:[],
    isLoading:false,
    error:null
}


export const ClientDetailReducer =(state= intitalState,action)=>{
    const{type,payload}  =  action
    switch(type){
        case CLIENT_DETAIL_STARTLOADING:
            return { ...state, isLoading: true, error: null };
          case CLIENT_DETAIL_SHOWNOTIFICATION:
            return { ...state, isLoading: false, error: payload };

        case GET_CLIENT_DETAIL:
            return {...state,clientDetailUser:payload,isLoading:false,error:null}

         case GET_CLIENT_STRATEGIES_DETAIL:
            return {...state,clientStrategies:payload,isLoading:false,error:null}   

            case UPDATE_CLIENT_DETAIL_BROKER:
                return{...state,clientDetailUser:{...state.clientDetailUser,Broker:payload},isLoading:false,error:null}
        default:return state
    
    }
}