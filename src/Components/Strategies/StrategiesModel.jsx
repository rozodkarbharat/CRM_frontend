import React from "react";
import styles from "../../Css/Strategies/Strategiesmodel.module.css";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
const StrategiesModel = ({setStrategiesModel}) => {
  const { strategiesLastTenTrads, strategiesTotalPnl,isLoading,error } = useSelector(
    (state) => state.strategiesReducer
  );
 

  return (
    <div className={styles.strategies_model_box}>
    {
      isLoading?<Loader/>: <>
      <p className={styles.strategies_model_cross_icon} onClick={()=>setStrategiesModel(false)}>X</p>
      <div className={styles.strategies_model_total_PNl}>
        <p>Total P&L</p>
        <p> <b style={{color:strategiesTotalPnl < 0 ? '#DC143C' : '#4BB543' }}> ₹{strategiesTotalPnl}</b> </p>
      </div>
      <hr />

      {strategiesLastTenTrads.length > 0 &&
        strategiesLastTenTrads.map((elm, index) => (
          <div className={styles.strategies_model_trad_box} style={{ backgroundColor: elm.ProfitAndLoss < 0 ? '#DC143C' : '#4BB543' }}>
            <div className={styles.strategies_model_trad_box_left_box}>
              <p>{elm.Name}</p>
              <div>
                <div>
                  <p><b> BUY:</b> ₹{elm.buyPrice}</p>
                  <p>{elm.buyDate}</p>
                </div>
                <div>
                  <p><b>SELL:</b> ₹{elm.sellPrice}</p>
                  <p>{elm.sellDate}</p>
                </div>
              </div>
            </div>

            <div className={styles.strategies_model_trad_box_right_box}>
            <div>
              <p>{elm.Qty}</p>
              <p> <b>QTY</b></p>
            </div>
            <div>
              <p>₹{elm.ProfitAndLoss}</p>
              <p><b>P&L</b> </p>
            </div>
            </div>
          </div>
        ))}
      </>
    }
      
    </div>
  );
};

export default StrategiesModel;
