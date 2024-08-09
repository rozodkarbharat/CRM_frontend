import React, { useEffect, useState } from "react";
import styles from "../../Css/ManualTrade/Positions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetRunningTrades, InsertNewTrades, PlaceOrder } from "../../Redux/TradesReducer/action";
import io from "socket.io-client";
import Loader from "../Common/Loader";
import ExitModal from "../Dashboard/ExitModel";

let Strategies = {
  BNF_Bramhastra:"Bank Nifty Bramhastra",
  BNF: "Range Breakout",
  Saturn: "Trend Following",
  Candle_Master: "Candle Master",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  Venus: "Venus",
  Scalper_Master_Reverse: "Scalper Master Reverse",
  Scalper_Master: "Scalper Master",

  Nifty_GOD_1_1:"Nifty Trivikram 1 1", Nifty_GOD_1_2:"Nifty Trivikram 1 2",
  Nifty_GOD_1_3:"Nifty Trivikram 1 3", Nifty_GOD_1_4:"Nifty Trivikram 1 4",
  Nifty_GOD_3_1:"Nifty Trivikram 3 1", Nifty_GOD_3_2:"Nifty Trivikram 3 2",
  Nifty_GOD_3_3:"Nifty Trivikram 3 3", Nifty_GOD_3_4:"Nifty Trivikram 3 4",
  Nifty_GOD_5_1:"Nifty Trivikram 5 1", Nifty_GOD_5_2:"Nifty Trivikram 5 2",
  Nifty_GOD_5_3:"Nifty Trivikram 5 3", Nifty_GOD_5_4:"Nifty Trivikram 5 4",
  Nifty_GOD_15_1:"Nifty Trivikram 15 1", Nifty_GOD_15_2:"Nifty Trivikram 15 2",
  Nifty_GOD_15_3:"Nifty Trivikram 15 3", Nifty_GOD_15_4:"Nifty Trivikram 15 4",

  BankNifty_GOD_1_1:"Bank Nifty Trivikram 1 1", BankNifty_GOD_1_2:"Bank Nifty Trivikram 1 2",
  BankNifty_GOD_1_3:"Bank Nifty Trivikram 1 3", BankNifty_GOD_1_4:"Bank Nifty Trivikram 1 4",
  BankNifty_GOD_3_1:"Bank Nifty Trivikram 3 1", BankNifty_GOD_3_2:"Bank Nifty Trivikram 3 2",
  BankNifty_GOD_3_3:"Bank Nifty Trivikram 3 3", BankNifty_GOD_3_4:"Bank Nifty Trivikram 3 4",
  BankNifty_GOD_5_1:"Bank Nifty Trivikram 5 1", BankNifty_GOD_5_2:"Bank Nifty Trivikram 5 2",
  BankNifty_GOD_5_3:"Bank Nifty Trivikram 5 3", BankNifty_GOD_5_4:"Bank Nifty Trivikram 5 4",
  BankNifty_GOD_15_1:"Bank Nifty Trivikram 15 1", BankNifty_GOD_15_2:"Bank Nifty Trivikram 15 2",
  BankNifty_GOD_15_3:"Bank Nifty Trivikram 15 3", BankNifty_GOD_15_4:"Bank Nifty Trivikram 15 4"
};

function splitSymbol(inputString) {
  inputString = inputString.split("");
  // "BANKNIFTY24MAR2748500CE"
  let Months={"JAN":'1',"FEB":'2',"MAR":'3',"APR":'4',"MAY":'5',"JUN":'6',"JUL":'7',"AUG":'8',"SEP":'9',"OCT":'10',"NOV":'11',"DEC":'12'}
  let symbol = "";
  let ExpiryYear = "";
  let ExpiryMonth = "";
  let ExpiryDate = "";
  let strikeprice = "";
  let Type = "";
  for (var a = 0; a < inputString.length; a++) {
    if (symbol && ExpiryDate && !(+inputString[a] + 1) > 0&&ExpiryMonth.length>=3) {
      Type += inputString[a];
    } 
    else if (!(+inputString[a] + 1) > 0&&ExpiryDate.length==0) {
      symbol += inputString[a];
    }  
    else if (inputString[a] + 1 > 0 &&ExpiryDate.length >= 2 &&strikeprice.length <= 5&&ExpiryYear.length >= 2) {
      strikeprice += inputString[a];
    } 
    else if(symbol&&ExpiryDate.length >= 2&&ExpiryMonth.length >= 3&&ExpiryYear.length <= 2&&inputString[a] + 1 > 0){
      ExpiryYear+=inputString[a]
    }
    else if(symbol&&ExpiryDate.length >= 2&&(!(+inputString[a] + 1) > 0)&&ExpiryMonth.length<3){
      ExpiryMonth+=inputString[a]
    }
    else if(symbol&&!ExpiryYear&&ExpiryMonth.length===0&& +inputString[a] + 1 > 0){
      ExpiryDate+=inputString[a]
    }
    else {
      break;
    }
  }
  ExpiryMonth=Months[ExpiryMonth]
  return { symbol, ExpiryDate, ExpiryMonth, ExpiryYear, Type, strikeprice };
}

function splitSymbolinarray(inputString) {
  inputString = inputString.split("");
  // "BANKNIFTY24MAR2748500CE"
  let symbol = "";
  let ExpiryYear = "";
  let ExpiryMonth = "";
  let ExpiryDate = "";
  let strikeprice = "";
  let Type = "";
  for (var a = 0; a < inputString.length; a++) {
    if (symbol && ExpiryDate && !(+inputString[a] + 1) > 0) {
      Type += inputString[a];
    } 
    else if (!(+inputString[a] + 1) > 0&&ExpiryYear.length==0) {
      symbol += inputString[a];
    }  
    else if (inputString[a] + 1 > 0 &&ExpiryDate.length >= 2 &&strikeprice.length <= 5) {
      strikeprice += inputString[a];
    } 
    else if(symbol&&ExpiryYear.length < 2&&inputString[a] + 1 > 0){
      ExpiryYear+=inputString[a]
    }
    else if(symbol&&ExpiryYear.length >= 2&&(!(+inputString[a] + 1) > 0)&&ExpiryMonth.length <3){
      ExpiryMonth+=inputString[a]
    }
    else if(symbol&&ExpiryYear&&ExpiryMonth.length>1&& +inputString[a] + 1 > 0&&ExpiryDate.length<2){
      ExpiryDate+=inputString[a]
    }
    else {
      break;
    }
  }
  // ExpiryMonth=Months[ExpiryMonth]
  strikeprice=strikeprice.trim("\r")
  return [ symbol,ExpiryYear , ExpiryMonth,ExpiryDate , strikeprice,Type ]
}

const Positions = () => {
  const [livePrice, setlivePrice] = useState({})
  const [socket, setsocket] = useState("")
  const[exitModel,setExitModel]  = useState(false);
  const[exitelem, setExitElem]  = useState("");
  const { RunningTrades,isLoading } = useSelector((state) => state.TradesReducer);
  const dispatch = useDispatch();
  
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
    setsocket(() => socket);
    dispatch(GetRunningTrades());
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    const uniqueTrades = new Set(RunningTrades.map(trade => trade[0].Name));
    const handleConnection = (data) => {
      try {
        let formattedString = data.replace(/([\w]+)(?=,)/g, '"$1"');
        const array = JSON.parse(`[${formattedString}]`);
        if (array[0] && array[0][1]) {
          let newprice = { ...livePrice, [array[0][0]]: array[0][1] };
          setlivePrice((prevPrice) => {
            return { ...prevPrice, ...newprice };
          });
        }
          if(uniqueTrades.has(array[0][0])){
            const arr = splitSymbolinarray(array[0][0]);
            socket.emit("connection", arr);
          }
      } catch (e) {
        uniqueTrades.forEach((trade) => {
          const arr = splitSymbolinarray(trade);
          socket.emit("connection", arr);
        });
        console.log(e.message, "error in live data socket");
      }
    };

    socket.on("connection", handleConnection);

    const emitData = () => {
            uniqueTrades.forEach((trade) => {
        const arr = splitSymbolinarray(trade);
        socket.emit("connection", arr);
      });
    };

    const emitDataTimeout = setTimeout(emitData, 100);

    return () => {
      socket.off("connection", handleConnection); // Remove the event handler
       clearTimeout(emitDataTimeout); // Clear the timeout
    };
  }, [socket, RunningTrades]);

  const handleClick = (elem) => {
    setExitModel(()=> false)
    try {
      let Id = elem[0].Id;
      let Strategy = elem[0].Strategy;
      let transactiontype;
      if (elem[0].Type == "BUY") {
        transactiontype = "SELL";
      } else if (elem[0].Type == "SHORT") {
        transactiontype = "SHORTEXIT";
      }
      let Price=0
      let data = splitSymbol(elem[0].Name);
      if(livePrice.hasOwnProperty(elem[0].Name)){
        Price = livePrice[elem[0].Name]
      }
      data = { ...data, transactiontype, Id, Strategy,Price };
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
            let Price = array[0][1];

            data = { ...data, Price };
            socket.emit('trades', "new order");
            dispatch(InsertNewTrades(data));
            newsocket.disconnect();
            return;
          } else {
            let arr = splitSymbolinarray(elem[0].Name);
            newsocket.emit("connection", arr);
          }
        } catch (err) {
          console.log(
            err.message,
            "error while exiting in live price at Positions"
          );
          let arr = splitSymbolinarray(elem[0].Name);
          newsocket.emit("connection", arr);
        }
      });
      let arr = splitSymbolinarray(elem[0].Name);
      newsocket.emit("connection", arr);
    } catch (err) {
      alert("Something went wrong, please try again");
    }
  };
   const handleExitClick = (elem)=>{
    setExitModel(()=>true);
    setExitElem(()=>elem)

   }


  return (
    <div className={styles.positions}>
    {
      isLoading?<Loader/> : <table className={styles.position_table}>
      {
        exitModel  && <ExitModal  setExitModel={setExitModel} exitClick={()=>handleClick(exitelem)}/>
      }
        <tr>
          <th className={styles.strategy_name}>Strategy Name</th>
          <th>Symbol</th>
          <th>Buy Price</th>
          <th>LTP</th>
          <th>P&L</th>
          <th>{""}</th>
        </tr>
        {RunningTrades.length > 0 &&
          RunningTrades.map((elem) => {
            return (
              <tr>
                <td>{Strategies[elem[0].Strategy]||elem[0].Strategy}</td>
                <td>{elem[0].Name}</td>
                <td>{elem[0].Price}</td>
                <td>{livePrice[elem[0].Name.trim()]}</td>
                <td
                  style={{
                    color:
                      livePrice[elem[0].Name] - elem[0].Price >= 0
                        ? "#04CF00"
                        : "#ff0000",
                  }}
                >
                  {livePrice[elem[0].Name] - elem[0].Price >= 0 ? "+" : ""}
                  {(livePrice[elem[0].Name.trim()] - elem[0].Price).toFixed(2)}
                </td>
                <td>
                  <button
                    onClick={() => handleExitClick(elem)}
                    className={styles.exit_btn}
                  >
                    EXIT
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    }
     
    </div>
  );
};

export default Positions;
