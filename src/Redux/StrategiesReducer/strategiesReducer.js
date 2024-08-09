import { SHOWNOTIFICATION, STARTLOADING, STOPLOADING } from "../MiscReducer/action.type";
import { EDIT_STRATEGIES_STATUS, GETSTRATEGIES, STRATEGIESLASTTENTRADS, STRATEGIES_SHOWNOTICATION, STRATEGIES_SHOWNOTIFICATION, STRATEGIES_STARTLOADING, STRATEGIES_STOPLOADING } from "./action.type";

const intialState = {
  strategies: [],
  strategiesLastTenTrads: [],
  strategiesTotalPnl: 0,
  isLoading:false,
  error:null,
  AMSID:null
};

export const strategiesReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case STRATEGIES_STARTLOADING:
      return { ...state, isLoading: true, error: null };
    case STRATEGIES_SHOWNOTIFICATION:
      return { ...state, isLoading: false, error: payload };
      case STRATEGIES_STOPLOADING:
        return{...state,isLoading:false,error:null}
    case GETSTRATEGIES:
      return { ...state, strategies: payload.data,isLoading:false,error:null,AMSID:payload.AMSID};
    case STRATEGIESLASTTENTRADS:
      return {
        ...state,
        strategiesLastTenTrads: payload.data,
        strategiesTotalPnl: payload.totalpnl,
        isLoading:false,error:null
      };

      case EDIT_STRATEGIES_STATUS:
        const updatedStrategies = state.strategies.map((strategy) =>
        strategy.Name === action.payload.Name
          ? { ...strategy, Status: action.payload.Status }
          : strategy
      );
      return { ...state, strategies: updatedStrategies,isLoading:false,error:null };

    default:
      return state;
  }
};
