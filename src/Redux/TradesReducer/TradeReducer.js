import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";
import { RUNNINGTRADES, TODAYSORDERS, TRADES_SHOWNOTIFICATION, TRADES_STARTLOADING, VIEWORDERS, PLACEORDER, TRADES_SHOW_SUCCESS_NOTIFICATION, TRADEDUSERS, USERWISE_TRADES, GETRUNNINGEQUITYTRADES } from "./action.type"



let Months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

const initState = {
    RunningTrades: [],
    Todaysorders: [],
    EquityTrades:[],
    TradesUsers: [],
    Orderdetail: {},
    UsersTrades: [],
    isLoading: false,
    error: null,
    successMessage: null,

}

export const TradesReducer = (state = initState, action) => {
    switch (action.type) {
        case TRADES_SHOW_SUCCESS_NOTIFICATION:
            return { ...state, error: null, isLoading: false, successMessage: action.payload };
        case TRADES_STARTLOADING:
            return { ...state, isLoading: true, error: null, successMessage: null };
        case TRADES_SHOWNOTIFICATION:
            return { ...state, isLoading: false, error: action.payload, successMessage: null };
        case RUNNINGTRADES: {
            let RunningTrades = action.payload.filter((elem) => {
                if (elem.length == 1) {
                    return elem[0]
                }
                else {
                    return ""
                }
            }
            )
            return { ...state, RunningTrades, error: null, isLoading: false, successMessage: null }
        }
        case TODAYSORDERS: {
            let Todaysorders = []
            if (action.payload.data) {
                Todaysorders = action.payload.data
            }
            return { ...state, Todaysorders, error: null, isLoading: false, successMessage: null }
        }
        case VIEWORDERS: {
            let Orderdetail = {}
            if (action.payload || action.payload === 0) {
                Orderdetail = state.Todaysorders[action.payload]
            }

            return { ...state, Orderdetail, isLoading: false, error: null, successMessage: null }
        }


        case PLACEORDER: {

            let arr = state.RunningTrades.filter((elem) => {

                if (elem[0] && action.payload.Id != elem[0].Id) {
                    return elem
                }
                else {
                }
            })
            if (arr.length == state.RunningTrades.length) {
                let Name = action.payload.symbol + action.payload.ExpiryYear + Months[+action.payload.ExpiryMonth - 1] + action.payload.ExpiryDate + action.payload.strikeprice + action.payload.Type
                action.payload = { ...action.payload, Name }
                return { ...state, RunningTrades: [...state.RunningTrades, [action.payload]], isLoading: false, error: null, successMessage: null }
            }
            else {
                return { ...state, RunningTrades: arr, isLoading: false, error: null, successMessage: null }
            }

        }

        case TRADEDUSERS: {
            let TradesUsers = []
            if (action.payload.data) {
                TradesUsers = action.payload.data
            }
            return { ...state, TradesUsers, error: null, isLoading: false, successMessage: null }
        }

        case USERWISE_TRADES: {
            return { ...state, UsersTrades: action.payload || [], error: null, isLoading: false, successMessage: null }
        }
        case GETRUNNINGEQUITYTRADES:{
            let EquityTrades=action.payload||[]
            return{ ...state,EquityTrades, error: null, isLoading: false, successMessage: null}
        }
        default: {
            return state
        }
    }
}
