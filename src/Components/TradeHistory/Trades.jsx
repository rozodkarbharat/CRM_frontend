import React, { useState } from "react";
import styles from "../../Css/TradeHistory/Trades.module.css";
import { useEffect } from "react";
import Loader from "../Common/Loader";

let Titles = {
  BNF: "Bank Nifty Range Breakout",
  Saturn: "Trend Following",
  Candle_Master: "Candle Master",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  Venus: "Venus",
  Scalper_Master_Reverse: "Scalper Master Reverse",
  Scalper_Master: "Scalper Master",
  BNF_Bramhastra:"Bank Nifty Bramhastra",
  Nifty_GOD_1_1:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_1_2:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD_1_3:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_1_4:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD_3_1:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_3_2:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD_3_3:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_3_4:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD_5_1:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_5_2:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD_5_3:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_5_4:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD_15_1:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_15_2:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD_15_3:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS", Nifty_GOD_15_4:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",

  BankNifty_GOD_1_1:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_1_2:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD_1_3:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_1_4:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD_3_1:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_3_2:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD_3_3:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_3_4:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD_5_1:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_5_2:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD_5_3:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_5_4:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD_15_1:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_15_2:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD_15_3:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS", BankNifty_GOD_15_4:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS"
};

function formatdate(date) {
  let newdate = "";
  if (date && date.includes(":") && date.includes(" ")) {
    let temp = date.split(" ");
    newdate = temp[0];
    let time = temp[1].split(":");
    newdate += " " + time[0] + ":" + time[1];
    return newdate;
  }
  return "None";
}

function tradetypeforsell(trade) {
  const type = trade[1]?.Type;
  return (type === "SELL" || type === "SL" || type === "SHORTEXIT") ? (type === "SHORTEXIT" ? "EXIT" : type) : type;
}

function tradetypeforbuy(trade) {
  const type = trade[0]?.Type === "BUY" || trade[0]?.Type === "SHORT" ? trade[0]?.Type : trade[1]?.Type;
  return type === "SHORTEXIT" ? "EXIT" : type;
}

function buyprice(trade) {
  let price = 0;
  if (trade[0]?.Type === "BUY" || trade[0]?.Type === "SHORT") {
    if (trade[0] !== "None" ) {
      price = trade[0]?.Price ||0
    }
  } else {
    if (trade[1] !== "None" ) {
      price = trade[1]?.Price ||0
    } 
  }
  return price;
}

function sellprice(trade) {
  let price = 0;
  if (
    trade[0]?.Type === "SELL" ||
    trade[0]?.Type === "SL" ||
    trade[0]?.Type === "SHORTEXIT"
  ) {
    if (trade[0] !== "None") {
      price = trade[0]?.Price || 0
    } 
  } else {
    if (trade[1] !== "None" ) {
      price = trade[1]?.Price || 0
    } 
  }
  return price;
}

function calculatteProfitPerTrade(trade, buy, sell) {
  let profit = 0;
  console.log()
  if (trade[0]?.Type == "BUY" || trade[1]?.Type == "SHORT") {
    profit = sell - buy;
  }
  else if(trade[0].Type === "SHORT") {
    profit =  buy-sell;
  }
   else {
    profit = buy - sell;
  }
  return (profit * +trade[0].Qty).toFixed(0);
}

const Trades = ({ data = [],isLoading }) => {
  const [trades, settrades] = useState(data);
  useEffect(() => {
    let array = data.sort((a, b) => a[0].Strategy.localeCompare(b[0].Strategy));
    settrades(() => array);
  }, [data]);
  return (
    <div className={styles.trade_history}>
    {
      isLoading?<Loader/>:<div className={styles.all_trades}>
        {trades.map((trade, index) => {

          let  buy = buyprice(trade);
          let  sell = sellprice(trade);

          return trade[0].Qty !== "[value-4]" ? (
            <div
              key={index}
              className={styles.trade_container}
              style={{
                background:
                  calculatteProfitPerTrade(trade, buy, sell) <= 0
                    ? "#DC143C"
                    : "#4BB543",
              }}
            >
              <div className={styles.trade_detail_left}>
                <div>
                  <div>
                    <p className={styles.strategy_name}>
                      {Titles[trade[0].Strategy]}
                    </p>
                    <p className={styles.trade_name}>{trade[0].Name||trade[0].Symbol}</p>
                  </div>
                  <div className={styles.trade_detail}>
                    <div>
                      <p className={styles.trade_price}>
                        <b className={styles.buy}>
                        {tradetypeforbuy(trade)}
                        </b>
                        :₹{buy}
                      </p>
                      <p className={styles.trade_date}>
                        {trade[0]?.Type == "BUY" || trade[0]?.Type == "SHORT"
                          ? formatdate(trade[0]?.DateTime)
                          : formatdate(trade[1]?.DateTime)}
                      </p>
                    </div>
                    <div>
                      <p className={styles.trade_price_sell}>
                        <b className={styles.sell}>{tradetypeforsell(trade)}</b>: ₹
                        {sell}
                      </p>
                      <p className={styles.trade_date}>
                        {trade[0]?.Type == "SELL" ||
                        trade[0]?.Type == "SL" ||
                        trade[0]?.Type == "SHORTEXIT"
                          ? formatdate(trade[0]?.DateTime)
                          : formatdate(trade[1]?.DateTime)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.trade_detail_right}>
                <p className={styles.qty}>
                  {trade[0].Qty||trade[0].Quantity}{" "}
                  <p>
                    <b>QTY</b>
                  </p>
                </p>
                <p className={styles.p_and_l}>
                  {" "}
                  ₹{calculatteProfitPerTrade(trade, buy, sell)}
                  <p>
                    <b>P&L</b>
                  </p>
                </p>
              </div>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    }
      
    </div>
  );
};

export default Trades;
