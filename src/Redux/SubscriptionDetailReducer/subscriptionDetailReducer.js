import { SHOWNOTIFICATION, STARTLOADING } from "../MiscReducer/action.type";
import { SUBSCRIPTIONDETAIL, SUBSCRIPTIONDETAIL_SHOWNOTIFICATION, SUBSCRIPTIONDETAIL_STARTLOADING } from "./action.type";

const intialState =  {
    SubscriptionDetailUsers:[],
    NoOfPayment:0,
    TotalAmount:0,
    isLoading:false,
    error:null
    
}


  export const SubscriptionDetailReducer = (state=intialState,action)=> {
   const{type,payload} =  action;
 

   switch(type){
    case SUBSCRIPTIONDETAIL_STARTLOADING:
      return { ...state, isLoading: true, error: null };
    case SUBSCRIPTIONDETAIL_SHOWNOTIFICATION:
      return { ...state, isLoading: false, error: payload };
    case SUBSCRIPTIONDETAIL:

      let NoOfPayment=0;
      let TotalAmount=0;
      let SubscriptionDetailUsers = [];
      if(payload.data && payload.data.length>0){
        NoOfPayment=  payload.data.length;
        TotalAmount=payload.totalAmount;
        SubscriptionDetailUsers=payload.data

      }
        return {...state, SubscriptionDetailUsers,NoOfPayment,TotalAmount,error:null,isLoading:false}

    default: return state
   }

}

