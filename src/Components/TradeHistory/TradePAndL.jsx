import React, { useEffect, useState } from "react";
import styles from "../../Css/TradeHistory/TradePAndL.module.css";

const TradesPAndL = ({ width = "100%", data = [],setTotelPNL }) => {
  const [Profit, setProfit] = useState(0);

  useEffect(() => {
    let profit = data.reduce((acc, elem) => {
      let qty = 0;
      if (elem.length < 2) {
        return acc;
      } else {
        qty = Number(elem[0]&&elem[0].Qty ? elem[0]?.Qty : elem[0]?.Quantity) || 1 ;
        if (elem[0]?.Type == "SHORTEXIT" || elem[0]?.Type == "BUY") {
          acc =
          parseFloat(acc) + ( parseFloat(elem[1]?.Price == 0 || elem[1]?.Price == "None"? 0: Number(elem[1]?.Price)) -  
          parseFloat(elem[0]?.Price == 0 || elem[0]?.Price == "None"? 0: Number(elem[0]?.Price))) 
          * qty;
        } else {
          acc =
          parseFloat(acc) + (  parseFloat(elem[0]?.Price == 0 || elem[0]?.Price == "None"? 0: Number(elem[0]?.Price)) - 
          parseFloat(elem[1]?.Price == 0 || elem[1]?.Price == "None"? 0: Number(elem[1]?.Price))) 
          * qty;
        }
      }
      return parseFloat(acc.toFixed(2));
    }, 0);
    
    setProfit(() => profit);
  }, [data]);
  return (
    <div style={{ width }} className={styles.trade_PandL}>
      <div>
        <p className={styles.trades_qty}>{data.length}</p>
        <p className={styles.headings}>No. Trades</p>
      </div>
      <div>
        <p
          style={{ color: Profit > 0 ? "#4BB543" : "#DC143C" }}
          className={styles.trades_profit}
        >
          {Profit}
        </p>
        <p className={styles.headings}>P&L</p>
      </div>
    </div>
  );
};

export default TradesPAndL;
