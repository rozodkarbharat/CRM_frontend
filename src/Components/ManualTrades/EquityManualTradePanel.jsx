import React, { useEffect, useState } from "react";
import styles from "../../Css/ManualTrade/EquityManualTradePanel.module.css";
import { useDispatch } from "react-redux";
import {
  GetEquityRunningTrades,
  InsertEquityTrade,
} from "../../Redux/TradesReducer/action";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

const errorNitification = (message) =>
  toast.error(message, {
    duration: 3000,
    position: "top-center",
  });

function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2); // Get last 2 digits of the year
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Get month (add 1 since it's zero-based)
  const day = today.getDate().toString().padStart(2, "0"); // Get day
  return year + month + day;
}

const EquityManualTradePanel = () => {
  const [price1, setprice1] = useState("");
  const [price2, setprice2] = useState("");
  const [Symbol, setSymbol] = useState("");
  const [TargetPrice, setTargetPrice] = useState("");
  const [SLPrice, setSLPrice] = useState("");
  const [Duration, setDuration] = useState("");
  const [Reason1, setReason1] = useState("");
  const [Reason2, setReason2] = useState("");
  const [searchOptions, setsearchOptions] = useState([]);
  const [selectedOption, setselectedOption] = useState("");
  const [socket, setsocket] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://216.48.177.99:443", {
      transports: ["websocket"],
      cors: {
        origin: "*",
      },
    });
    socket.on("trades", (data) => {
      dispatch(GetEquityRunningTrades());
    });
    setsocket(() => socket);
  }, []);

  function AddTrade() {
    if (
      selectedOption.length > 0 &&
      Reason1.length > 0 &&
      Reason2.length > 0 &&
      TargetPrice &&
      SLPrice &&
      Duration.length > 0 &&
      price1 &&
      price2
    ) {
      let data = {
        Symbol: selectedOption,
        Reason: [Reason1, Reason2],
        Target: TargetPrice,
        SL: SLPrice,
        Duration,
        BuyPrice1: price1,
        BuyPrice2: price2,
        Type: "BUY",
        Id: Date.now(),
      };

      dispatch(InsertEquityTrade(data));
      socket.emit("trades", "new order");
    } else {
      errorNitification("Please Enter all data");
    }
  }

  function SelectSymbol(data) {
    setsearchOptions(() => "");
    setselectedOption(() => data);
    setSymbol(() => "");
  }

  function SymbolChange(data) {
    setSymbol(() => data);
    setselectedOption(() => data);
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      if (Symbol.length > 0) {
        fetch("/symbols.txt")
          .then((response) => response.text())
          .then((text) => {
            const dataArray = text.split("\n");
            let date = getFormattedDate();
            let nifty = "NIFTY" + date;
            let bank = "BANKNIFTY" + date;
            let Symbols = Symbol.split(" ");
            if (Symbols.length == 1) {
              Symbols[1] = "";
            }
            let data = dataArray.filter((elem) => {
              let temp = "";
              if (elem.includes("BANKNIFTY")) {
                temp = bank;
              }
              if (elem.includes("NIFTY")) {
                temp = nifty;
              } else {
              }
              if (
                elem > temp &&
                elem.toLowerCase().includes(Symbols[0].toLowerCase()) &&
                elem.toLowerCase().includes(Symbols[1].toLowerCase())
              ) {
                return elem;
              } else {
                return "";
              }
            });
            if (data.length == 0) {
              data = dataArray.filter((elem) => {
                if (
                  (elem > nifty || elem > bank) &&
                  (elem
                    .toLocaleLowerCase()
                    .includes(Symbols[0].toLowerCase()) ||
                    elem.toLocaleLowerCase().includes(Symbols[1].toLowerCase()))
                ) {
                  return elem;
                } else {
                  return "";
                }
              });
            }
            setsearchOptions(() => data);
          })
          .catch((error) => console.log("Error fetching data:", error));
      }
    }, 1000);
    return () => clearTimeout(getData);
  }, [Symbol]);

  return (
    <div className={styles.stock_recommendations_container}>
      <div className={styles.stock_recommendations_form_group}>
        <Toaster />
        <div>
          <input
            onChange={(e) => SymbolChange(e.target.value)}
            value={Symbol || selectedOption}
            type="text"
            placeholder="Stocks"
            className={styles.stock_recommendations_input}
          />
          {searchOptions.length > 0 && Symbol && (
            <div className={styles.search_options_container}>
              {searchOptions.map((searchOption) => {
                return (
                  <p
                    onClick={() => SelectSymbol(searchOption)}
                    className={styles.search_option}
                  >
                    {searchOption}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <input
          onChange={(e) => setprice1(e.target.value)}
          value={price1}
          type="text"
          placeholder="Recommended Price 1"
          className={styles.stock_recommendations_input}
        />
        <input
          onChange={(e) => setprice2(e.target.value)}
          value={price2}
          type="text"
          placeholder="Recommended Price 2"
          className={styles.stock_recommendations_input}
        />
        <input
          onChange={(e) => setTargetPrice(e.target.value)}
          value={TargetPrice}
          type="text"
          placeholder="Target Price"
          className={styles.stock_recommendations_input}
        />
        <input
          onChange={(e) => setSLPrice(e.target.value)}
          value={SLPrice}
          type="text"
          placeholder="Stop Loss Price"
          className={styles.stock_recommendations_input}
        />
        <input
          onChange={(e) => setDuration(e.target.value)}
          value={Duration}
          type="text"
          placeholder="Duration"
          className={styles.stock_recommendations_input}
        />
      </div>
      <div className={styles.stock_recommendations_textarea_group}>
        <textarea
          onChange={(e) => setReason1(e.target.value)}
          value={Reason1}
          placeholder="Reason 1"
          className={styles.stock_recommendations_textarea}
        ></textarea>
        <textarea
          onChange={(e) => setReason2(e.target.value)}
          value={Reason2}
          placeholder="Reason 2"
          className={styles.stock_recommendations_textarea}
        ></textarea>
      </div>
      <button
        onClick={AddTrade}
        className={styles.stock_recommendations_submit_button}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default EquityManualTradePanel;
