import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";
import { ACTIVEBOTS, ADD, ALLOWED_STRATEGIES, LOGIN, LOGOUT, USERCOUNT, USER_SHOWNOTIFICATION, USER_STARTLOADING } from "./action.type"


const initState = {
    Count: 0,
    ActiveBots: [],
    isLoading:false,
    error:null,
    AllowedStrategies:[]
}

export const UsersReducer = (state = initState, action) => {
    switch (action.type) {

        case USER_STARTLOADING:
            return { ...state, isLoading: true, error: null };
          case USER_SHOWNOTIFICATION:
            return { ...state, isLoading: false, error: action.payload };

        case USERCOUNT: {
            let Count = action.payload.Count
            return {
                ...state, Count,isLoading:false,error:null
            }
        }
        case ACTIVEBOTS: {

            let ActiveBots=action.payload.sort((a,b)=>{
                return +b.Orders - +a.Orders
            })
            return { ...state, ActiveBots,isLoading:false,error:null }
        }
        case ALLOWED_STRATEGIES: {

            let AllowedStrategies=action.payload
            return { ...state, AllowedStrategies,isLoading:false,error:null }
        }
        default: {
            return state
        }
    }
}