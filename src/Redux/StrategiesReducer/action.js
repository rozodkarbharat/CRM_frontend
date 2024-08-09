import axios from "axios";
import Cookies from "js-cookie";
import { EDIT_STRATEGIES_STATUS, GETSTRATEGIES, STRATEGIESLASTTENTRADS, STRATEGIES_SHOWNOTIFICATION, STRATEGIES_STARTLOADING, STRATEGIES_STOPLOADING } from "./action.type";
import { SHOWNOTIFICATION, STARTLOADING, STOPLOADING } from "../MiscReducer/action.type";

export const getStrategies = () => async (dispatch) => {
  dispatch({
    type:STRATEGIES_STARTLOADING
   })
  try {
    const response = await axios.get("https://crm-app-backend-akpj.onrender.com/strategies/strategies-table", {
      headers: { Token: `Bearer ${Cookies.get("Token")}` },
    });
    
    dispatch({
      type: GETSTRATEGIES,
      payload: {data:response.data.data,AMSID:response.data.AMSID},
    });
  } catch (error) {
    dispatch({
      type:STRATEGIES_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }
};


export const editStrategies = (state) => async (dispatch) => {
  dispatch({
    type:STRATEGIES_STARTLOADING
   })
  try {
    const response = await axios.put("https://crm-app-backend-akpj.onrender.com/strategies/strategies-edit",
    state, {
      headers: { Token: `Bearer ${Cookies.get("Token")}` },
    });

     dispatch({
      type:STRATEGIES_STOPLOADING
     })
     
  } catch (error) {
    dispatch({
      type:STRATEGIES_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }
};


export const editStrategiesStatus = (Name,Status)=>async(dispatch)=>{
  dispatch({
    type:STRATEGIES_STARTLOADING
   })
  try {
    const response = await axios.put("https://crm-app-backend-akpj.onrender.com/strategies/toggle-status",
    {Name,Status}, {
      headers: { Token: `Bearer ${Cookies.get("Token")}` },
    });
     
    const newStatus =  Status==="ON"?"OFF":"ON"
    if(response.status===200){

      dispatch({
        type:EDIT_STRATEGIES_STATUS,
        payload:{Status:newStatus,Name}
      })
      
    }else{
      console.log(response.message);
    }

    
  } catch (error) {
    dispatch({
      type:STRATEGIES_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }

}


export const getStrategiesLastTenTrads = (strategy) => async (dispatch) => {
  dispatch({
    type:STRATEGIES_STARTLOADING
   })
  try {
    const response = await axios.get(
      `https://crm-app-backend-akpj.onrender.com/strategies/strategies-last-ten-trads?strategy=${strategy}`,
      {
        headers: { Token: `Bearer ${Cookies.get("Token")}` },
      }
    );

    const sortedData = response.data.data.sort((a, b) => {
      return b.token - a.token;
    });

    const modfyData = [];

    for (let i = 0; i < sortedData.length; i = i + 2) {
      let trade1 = sortedData[i];
      let trade2 = sortedData[i + 1];
      if (trade1.Type === "SELL" || trade1.Type === "SL") {
        let sellPrice = trade1.Price;
        let buyPrice = trade2.Price;
        let buyDate = trade2.DateTime.split(".")[0];
        let sellDate = trade1.DateTime.split(".")[0];
        let diff = (parseFloat(sellPrice) - parseFloat(buyPrice)) * trade1.Qty;

        diff = parseFloat(diff.toFixed(2));
        let obj = {
          Name: trade1.Name,
          buyPrice,
          sellPrice,
          ProfitAndLoss: diff,
          buyDate,
          sellDate,
          Qty: trade1.Qty,
        };
        modfyData.push(obj);
      } else {
        let sellPrice = trade2.Price;
        let buyPrice = trade1.Price;
        let buyDate = trade1.DateTime.split(".")[0];
        let sellDate = trade2.DateTime.split(".")[0];
        let diff = (parseFloat(sellPrice) - parseFloat(buyPrice)) * trade1.Qty;

        diff = parseFloat(diff.toFixed(2));
        let obj = {
          Name: trade1.Name,
          buyPrice,
          sellPrice,
          ProfitAndLoss: diff,
          buyDate,
          sellDate,
          Qty: trade1.Qty,
        };
        modfyData.push(obj);
      }
    }

    const totalpnl = modfyData.reduce((acc, curr) => {
      return acc + curr.ProfitAndLoss;
    }, 0);

    dispatch({
      type: STRATEGIESLASTTENTRADS,
      payload: { data: modfyData, totalpnl },
    });
  } catch (error) {
    dispatch({
      type:STRATEGIES_SHOWNOTIFICATION,
      payload:"Something went wrong, Please trying again"
    })
  }
};
