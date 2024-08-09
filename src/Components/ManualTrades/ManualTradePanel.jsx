import React, { useEffect, useState } from "react";
import styles from "../../Css/ManualTrade/ManualTradePanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetRunningTrades, InsertNewTrades, PlaceOrder } from "../../Redux/TradesReducer/action";
 
import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import Loader from "../Common/Loader";
import toast, { Toaster } from "react-hot-toast";

function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2); // Get last 2 digits of the year
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Get month (add 1 since it's zero-based)
  const day = today.getDate().toString().padStart(2, "0"); // Get day
  return year + month + day;
}


let Months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

function splitSymbolinarray(inputString) {
  inputString = inputString.split("");

  let symbol = "";
  let date = "";
  let strikeprice = "";
  let Type = "";
  for (var a = 0; a < inputString.length; a++) {
    if (symbol && date && !(+inputString[a] + 1) > 0) {
      Type += inputString[a];
    } else if (!(+inputString[a] + 1) > 0) {
      symbol += inputString[a];
    } else if (inputString[a] + 1 > 0 && date.length < 6) {
      date += +inputString[a];
    } else if (
      inputString[a] + 1 > 0 &&
      date.length >= 6 &&
      strikeprice.length <= 5
    ) {
      strikeprice += inputString[a];
    } else {
      break;
    }
  }
  strikeprice = +strikeprice.trim("\r");
  let ExpiryYear = date[0] + date[1];
  let ExpiryMonth = "";
  let ExpiryDate = date[4] + date[5];
  if (date[2] == "0") {
    ExpiryMonth = date[3];
  } else {
    ExpiryMonth = date[2] + date[3];
  }
  ExpiryMonth=Months[ExpiryMonth-1]

  return [ symbol,ExpiryDate, ExpiryMonth,ExpiryYear , strikeprice.toString(),Type ]
}

function splitSymbol(inputString) {
  inputString = inputString.split("");

  let symbol = "";
  let date = "";
  let strikeprice = "";
  let Type = "";
  for (var a = 0; a < inputString.length; a++) {
    if (symbol && date && !(+inputString[a] + 1) > 0) {
      Type += inputString[a];
    } else if (!(+inputString[a] + 1) > 0) {
      symbol += inputString[a];
    } else if (inputString[a] + 1 > 0 && date.length < 6) {
      date += +inputString[a];
    } else if (
      inputString[a] + 1 > 0 &&
      date.length >= 6 &&
      strikeprice.length <= 5
    ) {
      strikeprice += inputString[a];
    } else {
      break;
    }
  }
  strikeprice = +strikeprice.trim("\r");
  let ExpiryYear = date[0] + date[1];
  let ExpiryMonth = "";
  let ExpiryDate = date[4] + date[5];
  if (date[2] == "0") {
    ExpiryMonth = date[3];
  } else {
    ExpiryMonth = date[2] + date[3];
  }

  return { symbol, ExpiryDate, ExpiryMonth, ExpiryYear, Type, strikeprice };
}
const successNitification = (message) =>
  toast.success(message, {
    duration: 3000,
    position: "top-center",
  });
const errorNitification = (message) =>
  toast.error(message, {
    duration: 3000,
    position: "top-center",
  });
let Strategies = {
  BNF: "Range Breakout",
  BNF_Bramhastra:"BankNifty Bramhastra",
  Saturn: "Trend Following",
  Scalper_Master:" Scalper Master",
  Candle_Master: "Candle Master",
  Nifty_GOD:"Nifty God",
  BankNifty_GOD:"BnakNifty God",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  Venus: "Venus",
  TEST:"Test"
};

const ManualTradePanel = () => {
  const [symbol, setsymbol] = useState("");
  const [searchOptions, setsearchOptions] = useState([]);
  const [selectedOption, setselectedOption] = useState("");
  const [selectedStrategy, setselectedStrategy] = useState("");
  const [allowedStrategies, setallowedStrategies] = useState([])
  const [socket, setsocket] = useState("")
  
  const dispatch = useDispatch();

  const { RunningTrades, isLoading, error, successMessage } = useSelector(
    (state) => state.TradesReducer
  );
  const { AllowedStrategies } = useSelector((state) => state.UsersReducer)

  const handleclick = (data) => {
    setsearchOptions(() => "");
    setsymbol(() => "");
    setselectedOption(() => data);
  };

  const handleSymbolChange = (data) => {
    setselectedOption(() => "");
    setsymbol(() => data);
  };

  useEffect(() => {
    if (successMessage) {
      successNitification(successMessage);
    }
    else if (error) {
      errorNitification(error);
    }
  }, [successMessage, error]);

  useEffect(() => {
    const socket = io("http://216.48.177.99:443", {
      transports: ["websocket"],
      cors: {
        origin: "*",
      },
    });
    socket.on("trades", (data) => {
      dispatch(GetRunningTrades());
    })
    setsocket(()=>socket)
    axios
      .get("https://crm-backend-8ogr.onrender.com/ams_user/allowed-startegies", {
        headers: { Token: `Bearer ${Cookies.get("Token")}` },
      })
      .then((response) => {
        if (response.data && response.data.data){
          setallowedStrategies(() => response.data.data);
        }
      }).catch(() => {

      })
    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePlaceOrder = (transactiontype) => {
    if (selectedOption && selectedStrategy) {
      try {
        let epoc = Date.now();
        let data = splitSymbol(selectedOption);
        let Price = 0;
        data = {
          ...data,
          Strategy: selectedStrategy,
          transactiontype,
          Id: epoc,
          Price,
        };
        dispatch(PlaceOrder(data));
        const newsocket = io("http://216.48.177.99:443", {
          transports: ["websocket"],
          cors: {
            origin: "*",
          },
        });
        newsocket.on("connection", (res) => {
          try {
            let formattedString = res.replace(/([\w]+)(?=,)/g, '"$1"');
            const array = JSON.parse(`[${formattedString}]`);
            if (array[0] && array[0][1]) {
              Price = array[0][1];
              data = {
                ...data,
                Price,
              };
              dispatch(InsertNewTrades(data));
              socket.emit("trades", "new order")
              newsocket.disconnect()
              return;
            } else {
              let arr = splitSymbolinarray(selectedOption);
              newsocket.emit("connection", arr);
            }
          } catch (err) {
            console.log(
              err.message,
              "error while getting live price at ManualTradePanel"
            );
            let arr = splitSymbolinarray(selectedOption);
            newsocket.emit("connection", arr);
          }
        });

        let arr = splitSymbolinarray(selectedOption);
        newsocket.emit("connection", arr);
      } catch (err) {
        errorNitification("Something went wrong, please try again");
      }
    } else if (!selectedOption) {
      errorNitification("Please enter a symbol");
    } else if (!selectedStrategy) {
      errorNitification("Please select strategy");
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (symbol.length > 0) {
        fetch("/symbols.txt") // Assuming the file is located in the public folder
          .then((response) => response.text())
          .then((text) => {
            const dataArray = text.split("\n");
            let date = getFormattedDate();
            let nifty = "NIFTY" + date;
            let bank = "BANKNIFTY" + date;
            let Symbols = symbol.split(" ");
            if (Symbols.length == 1) {
              Symbols[1] = "";
            }
            let data = dataArray.filter((elem) => {
              let temp=""
              if(elem.includes('BANKNIFTY')){
                temp = bank
              }
              else{
                temp = nifty
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
  }, [symbol]);
  return (
        <>
          <div className={styles.panel}>
            <div className={styles.input_container}>
              <input
                onChange={(e) => handleSymbolChange(e.target.value)}
                value={symbol || selectedOption}
                className={styles.trade_input}
                type="text"
                placeholder="Select Symbol"
              />
              {searchOptions.length > 0 && symbol && (
                <div className={styles.search_options_container}>
                  {searchOptions.map((searchOption) => {
                    return (
                      <p
                        onClick={() => handleclick(searchOption)}
                        className={styles.search_option}
                      >
                        {searchOption}
                      </p>
                    );
                  })}
                </div>
              )}
              <p className={styles.input_txt}>Symbol</p>
            </div>
            <div className={styles.input_container}>
              <select
                value={selectedStrategy}
                onChange={(e) => setselectedStrategy(e.target.value)}
                className={styles.select_strategy}
                type="select"
              >
                <option value="">Choose a Strategy</option>
                {AllowedStrategies.length > 0 &&
                  AllowedStrategies.map((value, index) => {
                    const strategy =
                      Strategies[value.Strategy] || value.Strategy;
                    const isDisabled = RunningTrades.some((tradeArr) => {
                      return tradeArr.some(
                        (trade) => trade.Strategy === value.Strategy
                      );
                    });
                    return (
                      <option
                        key={index}
                        value={value.Strategy}
                        disabled={isDisabled}
                        className={isDisabled ? styles.disabledOption : ""}
                      >
                        {strategy}
                        {isDisabled && (
                          <span className={styles.notAllowed}>⊘</span>
                        )}
                      </option>
                    );
                  })}
              </select>
              <p className={styles.input_txt}>Strategy</p>
            </div>
          </div>
          <div className={styles.buy_sell_btn}>
            <button
              onClick={() => handlePlaceOrder("BUY")}
              className={styles.buy_btn}
            >
              BUY
            </button>
            <button
              onClick={() => handlePlaceOrder("SHORT")}
              className={styles.sell_btn}
            >
              SHORT
            </button>
          </div>
        </>
  );
};

export default ManualTradePanel;
