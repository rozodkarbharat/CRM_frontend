import React, { useEffect, useState } from 'react'
import Positions from '../Components/ManualTrades/Positions'
import styles from "../Css/LiveTrades/LiveTrades.module.css"
import Sidebar from '../Components/Common/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { GetRunningTrades } from '../Redux/TradesReducer/action';
import Loader from '../Components/Common/Loader';

function splitSymbolinarray(inputString) {
  inputString = inputString.split("");
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
  strikeprice=strikeprice.trim("\r")
  return [ symbol,ExpiryYear , ExpiryMonth,ExpiryDate , strikeprice,Type ]
}

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

const LiveTrades = () => {
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
    setsocket(() => socket);
    dispatch(GetRunningTrades
      ());
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

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
        
        setTimeout(() => {
          const arr = splitSymbolinarray(array[0][0]);
          socket.emit("connection", arr);
        }, 800);
      } catch (e) {
        RunningTrades.forEach((trade) => {
          const arr = splitSymbolinarray(trade[0].Name);
          socket.emit("connection", arr);
        });
        console.log(e.message, "error in live data socket");
      }
    };

    socket.on("connection", handleConnection);

    const emitData = () => {
      RunningTrades.forEach((trade) => {
        const arr = splitSymbolinarray(trade[0].Name);
        socket.emit("connection", arr);
      });
    };

    const emitDataTimeout = setTimeout(emitData, 1000);

    return () => {
      socket.off("connection", handleConnection); // Remove the event handler
      clearTimeout(emitDataTimeout); // Clear the timeout
    };
  }, [socket, RunningTrades]);
  return (
    <div>
      <Sidebar/>
      <p className={styles.page_header}>Live Trades</p>
      <div className={styles.positions}>
    {
      isLoading?<Loader/> : <table className={styles.position_table}>

        <tr>
          <th className={styles.strategy_name}>Strategy Name</th>
          <th>Symbol</th>
          <th>Buy Price</th>
          <th>LTP</th>
          <th>P&L</th>
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
              </tr>
            );
          })}
      </table>
    }
     
    </div>
    </div>
  )
}

export default LiveTrades
