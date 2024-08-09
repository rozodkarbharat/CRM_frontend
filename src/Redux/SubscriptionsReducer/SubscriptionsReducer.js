import {
  SHOWNOTIFICATION,
  STARTLOADING,
  STOPLOADING,
} from "../MiscReducer/action.type";
import { ALLSUBSCRIPTION, CURRENTMONTHSUBSCRIPTION, EXPIRINGSUBSCRIPTION, SUBSCRIPTION_SHOWNOTIFICATION, SUBSCRIPTION_STARTLOADING, TODAYSUBSCRIPTION, TRIAL } from "./action.type";

const initStatte = {
  NumberofTrial: 0,
  NumberofTotalSubscribed: 0,
  TrialUsers: [],
  TodaySubscribed: [],
  TodaySale: 0,
  IncomeTillToday: 0,
  CurrentMonthSubscription:0,
  Expiringsubscriptiondata:[],
  isLoading: false,
  error: null,
};

export const SubscriptionsReducer = (state = initStatte, action) => {
  switch (action.type) {
    case SUBSCRIPTION_STARTLOADING:
      return { ...state, isLoading: true, error: null };
    case SUBSCRIPTION_SHOWNOTIFICATION:
      return { ...state, isLoading: false, error: action.payload };
    case TODAYSUBSCRIPTION: {
      let sale = 0;
      let data = [];
      if (action.payload.data) {
        sale = action.payload.data.reduce((acc, elem) => {
          return acc + +elem.Amount;
        }, 0);

        data = action.payload.data;
      }

      return {
        ...state,
        TodaySale: sale,
        TodaySubscribed: data,
        isLoading: false,
        error: null,
      };
    }

    case ALLSUBSCRIPTION: {
      let Count = 0;
      let Amount = 0;
      if (action.payload.data && action.payload.data.length>0) {
        Amount = action.payload.data[0].Amount;
        Count = action.payload.data[0].Count;
      }
      return {
        ...state,
        IncomeTillToday: Amount||0,
        NumberofTotalSubscribed: Count,
        isLoading: false,
        error: null,
      };
    }
    case TRIAL: {
      let TrialUsers = [];
      let NumberofTrial = 0;
      if (action.payload.data && action.payload.data.length > 0) {
        TrialUsers = action.payload.data;
        NumberofTrial = action.payload.data.length;
      }
      return {
        ...state,
        TrialUsers,
        NumberofTrial,
        isLoading: false,
        error: null,
      };
    }
    case CURRENTMONTHSUBSCRIPTION:{
      let CurrentMonthSubscription=action.payload
      return {...state,CurrentMonthSubscription}
    }
    case EXPIRINGSUBSCRIPTION: {
      return {
        ...state, Expiringsubscriptiondata: action.payload, isLoading: false,
        error: null,
      }
    }

    default: {
      return state;
    }
  }
};
