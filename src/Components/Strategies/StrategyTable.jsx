import React, { useState } from "react";
import styles from "../../Css/Strategies/StrategyTable.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editStrategiesStatus, getStrategiesLastTenTrads } from "../../Redux/StrategiesReducer/action";
import StrategiesModel from "./StrategiesModel";
import Loader from "../Common/Loader";
import toast from "react-hot-toast";
let strategy = {
  BNF: "Bank Nifty Range Breakout",
  Saturn: "Trend Following",
  Candle_Master: "Candle Master",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  Scalper_Master_Reverse: "Scalper Master Reverse",
  Scalper_Master: "Scalper Master",
  Nifty_GOD:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BNF_Bramhastra:"Bank Nifty Bramhastra",
  TEST:"Test"
};
const StrategyTable = () => {
  const [strategiesModel, setStrategiesModel] = useState(false);
  const navigate = useNavigate();
  const { strategies, isLoading, error,AMSID } = useSelector((state) => state.strategiesReducer);
  const { Role } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  
  if (error) {
    toast.error("Something went wrong")
  }
 
  function handleviewPnl(strategy) {
    dispatch(getStrategiesLastTenTrads(strategy));
    setStrategiesModel(true);
  }

  function handleStatus(Name, Status) {
    dispatch(editStrategiesStatus(Name, Status));
  }

     
  function handleShare(strategyName) {
    const androidurl =  "https://play.google.com/store/apps/details?id=com.moneymakers.webbrowser"
    const baseUrl = "https://app.moneymakers-algo.com/";
    const shareMessage = `Start your Algo Trading with VP Algo for FREE\n\nYou will get:\n✅ AI-based Trades\n✅ Live Position Tracking\n✅ Free Trial\n\nDownload using my referral link to get Free Trial\n⬇link may expire within 48hrs\n Android: ${androidurl}\nIOS: ${baseUrl}\n\nOr use my Referral code ${AMSID}\nT&C Apply`;
  
    const shareTitle = `Check out ${strategy[strategyName]} strategy!`;
  
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareMessage,
        
      })
        .then(() => console.log("Share Successful"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
      copyToClipboard(shareMessage);
    }
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text copied to clipboard");
            alert("Referral link copied to clipboard!");
        })
        .catch((error) => console.error("Failed to copy text:", error));
}
  

  return (
    <>
      <div className={styles.strategy_table_box}>
        {
          isLoading ? <Loader /> :
            <table className={styles.strategy_table}>
              <tr>
                <th>Name</th>
                <th>Max Down</th>
                <th>Min Capital</th>
                <th>Last 10 trades P&L</th>
                <th>{""}</th>
                <th>{""}</th>
                <th>{""}</th>
              </tr>
              {strategies.length > 0 &&
                strategies.map((elm, index) => (
                  <tr key={index}>
                    <td>{strategy[elm.Name]}</td>
                    <td>{elm.Max_Down}%</td>
                    <td>{elm.Margin}</td>
                    <td>
                      <button
                        className={styles.extra_btn}
                        onClick={() => handleviewPnl(elm.Name)}
                      >
                        VIEW
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ backgroundColor: elm.Status === "OFF" ? "#04CF00" : "#DC143C" }}
                        className={styles.start_stop_btn}
                        onClick={() => handleStatus(elm.Name, elm.Status)}
                      >
                        {elm.Status === "ON" ? "STOP" : "START"}
                      </button>
                    </td>
                    <td>
                    {
                      Role !==  "Franchise" && <button className={styles.extra_btn} onClick={() => handleShare(elm.Name)}>SHARE</button>
                    }
                      
                    </td>
                    <td onClick={() => navigate(`/edit/${index}`)}>
                    {
                      Role !==  "Franchise" && <button className={styles.extra_btn}>EDIT</button>
                    }
                      
                    </td>
                  </tr>
                ))}
            </table>
        }

      </div>
      {strategiesModel && <StrategiesModel setStrategiesModel={setStrategiesModel} />}
    </>
  );
};

export default StrategyTable;
