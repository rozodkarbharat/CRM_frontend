import React, { useEffect, useState } from "react";
import styles from "../../Css/Stocks/StocksCard.module.css";
const ExitedStockCard = ({ stock, onclick }) => {
  const [result, setResult] = useState("loss");
  const [resultPercentage, setResultperice] = useState(0);
  useEffect(() => {
    let buy = Number(stock[0].Price);
    let sell = Number(stock[1].Price);
    if (stock[0].Type === "SELL") {
      buy = Number(stock[1].Price);
      sell = Number(stock[0].Price);
      if (sell - buy > 0) {
        setResult(() => "profit");
      } else {
        setResult(() => "loss");
      }
      setResultperice(() => (((sell - buy) / buy) * 100).toFixed(2));
    }
  }, [stock]);

  if (
    (stock[0].Type === "BUY" && stock[1].Type === "BUY") ||
    (stock[0].Type === "SELL" && stock[1].Type === "SELL")
  ) {
    return;
  }

  return (
    <div className={styles.Stock_card}>
      <div onClick={() => onclick(stock.Symbol)}>
        <div className={styles.stock_company}>
          <div className={styles.Stock_logo}></div>
          <div>{stock[0]?.StockName}</div>
        </div>
        <div className={styles.Stock_details}>
          <div className={styles.priceRange}>
            <p className={styles.priceRange_price}>
              ₹{stock[0].Type==="BUY"?`${stock[0]?.BuyPrice1} - ${stock[0]?.BuyPrice2}` :`${stock[1]?.BuyPrice1}-${stock[1]?.BuyPrice2}`}
            </p>
            <p>Recommendation Price</p>
          </div>
          <div className={styles.stock_duration}>
            <p className={styles.duration_time}>{stock[0]?.Duration}</p>
            <p>duration</p>
          </div>
        </div>
        <div className={styles.stock_pricing}>
          <div className={styles.stock_targetPrice}>
            <p className={styles.targetPrice_price}>
              ₹{stock[0]?.Target}
            </p>
            <p>Target Price</p>
          </div>
          <div
            className={`${
              result == "profit" ? styles.return_profit : styles.return_loss
            }`}
          >
            <p className={styles.targetPrice_stopploss}>
              { resultPercentage + "%"}
            </p>
            <p>% Returns</p>
          </div>
        </div>
      </div>
      <button
        className={` ${styles.stock_card_btn} ${
          result == "profit" ? styles.booked_Profit : styles.hit_Stop_loss
        }`}
      >
        {result == "profit" ? "BOOKED PROFIT" : "HIT STOP LOSS"}
      </button>

      <div className={styles.footer_small}>
        <p>Recommended on {stock[0].Type ==='Buy'?stock[0]?.DateTime:stock[1]?.DateTime}</p>
        <p>
          {result == "profit"
            ? `Profit Booked on  ${stock[0].Type==="SELL"?stock[0].DateTime:stock[1].DateTime}`
            : `Hit Stopp loss on  ${stock[0].Type==="SELL"?stock[0].DateTime:stock[1].DateTime}`}
        </p>
      </div>
    </div>
  );
};

export default ExitedStockCard;
