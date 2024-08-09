import React, { useState } from "react";
import styles from "../Css/TradeHistory/TradeHistory.module.css";
import TradesPAndL from "../Components/TradeHistory/TradePAndL";
import Sidebar from "../Components/Common/Sidebar";
import Trades from "../Components/TradeHistory/Trades";
import axios from "axios";
 import jsPDF from "jspdf";
 import 'jspdf-autotable';
import ExitedCalls from "../Components/Stocks/ExitedCalls";
import toast, { Toaster } from "react-hot-toast";
let strategy = {
  BNF: "Bank Nifty Range Breakout",
  Saturn: "Trend Following",
  Candle_Master: "Candle Master",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  BNF_Bramhastra:"BNF Bramhastra",
  Scalper_Master_Reverse: "Scalper Master Reverse",
  Scalper_Master: "Scalper Master",
  BankNifty_GOD:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  Nifty_GOD:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
   Stocks:"Stocks"
};
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

function combineWithID({ data }) {
  return new Promise((resolve, reject) => {
    try {
      let newdata = {};

      for (var a = 0; a < data.length; a++) {
        if (newdata.hasOwnProperty(data[a].Id)) {
          newdata[data[a].Id].push(data[a]);
        } else {
          newdata[data[a].Id] = [data[a]];
        }
      }
      let Data =
        Object.values(newdata).length > 0 ? Object.values(newdata) : [];
      resolve(Data);
    } catch (error) {
      reject(error);
    }
  });
}

function convertWithIDStocks(data) {
  return new Promise((resolve, reject) => {
    const newData = {};

    for (let i = 0; i < data.length; i++) {
      if (newData[data[i].Id]) {
        newData[data[i].Id].push(data[i]);
      } else {
        newData[data[i].Id] = [data[i]];
      }
    }
    const updatedData =
      Object.values(newData).length > 0
        ? Object.values(newData).filter((elm) => elm.length == 2)
        : [];
    resolve(updatedData);
  });
}

const TradeHistory = () => {
  const [strategies, setstrategies] = useState(Object.keys(strategy));
  const [selectedStrategy, setselectedStrategy] = useState("All");
  const [Activestrategies, setActivestrategies] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [tradesData, settradesData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [totelPNL , setTotelPNL]  = useState(0);
  
  function getTrades() {
    setisLoading(() => true);
    if(selectedStrategy==="Stocks"){
      getStocksExited()
    }else{
    axios
      .post("https://crm-app-backend-akpj.onrender.com/trades/all", { startDate, endDate, selectedStrategy })
      .then(async (response) => {
        setisLoading(() => false);
        if (response.data && response.data.data) {
          let temp = await combineWithID({ data: response.data.data });
          temp = temp.sort((a, b) =>
            a[0].Strategy.localeCompare(b[0].Strategy)
          );
          temp = temp.filter((elem) => elem.length > 1);
          settradesData(() => temp);
        }
      })
      .catch((err) => {
        setisLoading(() => false);
      });
    }
  }


  const generatePDF = async () => {
    // const doc = new jsPDF(); 

    const sortedTradesData = [...tradesData].sort((a, b) => {
      let tradeTimeA, tradeTimeB;
      if (a[0].Type === "BUY" || a[0].Type === "SHORTEXIT") {
        tradeTimeA = new Date(a[0].DateTime);
      } else {
        tradeTimeA = new Date(a[1].DateTime);
      }
      if (b[0].Type === "BUY" || b[0].Type === "SHORTEXIT") {
        tradeTimeB = new Date(b[0].DateTime);
      } else {
        tradeTimeB = new Date(b[1].DateTime);
      }
      return tradeTimeA - tradeTimeB;
    });

    const doc = new jsPDF({
      orientation: 'p', // landscape
      unit: 'pt', // points, pixels won't work properly
      format: [1090.55, 741.89] // A0 size in points
  });
  

     
    // Center align the text
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold');
   
    // Add text with different font size and font weight
    doc.text('VP ALGO', 20, 42);
    doc.setFontSize(14)
   
    doc.setFont("helvetica", "normal");
    if(selectedStrategy === 'All'){
      doc.text(`Strategy Name : All`, 40, 90);
    }else{
      doc.text(`Strategy Name : ${strategy[selectedStrategy]}`, 40, 90);
    }
    
    doc.text(`Date : ${startDate} - ${endDate}`, 40, 120);
    doc.text(`No of Trades : ${tradesData.length}`, 40, 150);
   

// Add Total P&L
if (totelPNL >= 0) {
  doc.setTextColor(0, 128, 0); // Green color
} else {
  doc.setTextColor(255, 0, 0); // Red color
}
doc.text(`Total P&L : ${totelPNL}`, 520, 90);

// Reset text color to black
doc.setTextColor(0);


doc.text(`Brokerage : ${tradesData.length * 60}`, 520, 120);

// Calculate Net P&L
const netPNL = totelPNL - (tradesData.length * 60);

// Add Net P&L
if (netPNL >= 0) {
  doc.setTextColor(0, 128, 0); // Green color
} else {
  doc.setTextColor(255, 0, 0); // Red color
}
doc.text(`Net P&L : ${netPNL}`, 520, 150);

// Reset text color to black
doc.setTextColor(0);

   
    // Add table headers
    const tableHeaders = [
        'Symbol',
        'Buy_Price',
        'Buy Date/Time',
        'Sell_Price',
        'Sell Date/Time',
        'Quantity',
        'P&L',
        'Strategy'
    ];

    
    // Prepare table data
    const tableData = [];
    sortedTradesData.forEach(tradePair => {
        let buyTrade, sellTrade;
        // Determine buy and sell trades based on their type
        if (tradePair[0].Type === "BUY" || tradePair[0].Type === "SHORTEXIT") {
            buyTrade = tradePair[0];
            sellTrade = tradePair[1];
        } else {
            buyTrade = tradePair[1];
            sellTrade = tradePair[0];
        }
        
        if (buyTrade && sellTrade) {
            const profit = (parseFloat(sellTrade.Price) - parseFloat(buyTrade.Price)) * parseFloat(buyTrade.Qty);
            tableData.push([
                buyTrade.Name,
                buyTrade.Price,
                buyTrade.DateTime,
                sellTrade.Price,
                sellTrade.DateTime,
                buyTrade.Qty,
                profit.toFixed(2),
                buyTrade.Strategy
            ]);
        }
    });
 
 
    // Generate table
    doc.autoTable({
        startY: 200,
        head: [tableHeaders],
        body: tableData,
        columnWidth: 'auto'
    });
let fileName;
if(selectedStrategy === 'All'){
  fileName = `ALL-trades.pdf`;
}else{
   fileName = `${strategy[selectedStrategy]}-trades.pdf`;
}
    

    // Save the PDF
    doc.save(fileName);
};

async function getStocksExited(){
  try {

    const res = await axios.get(`https://back.moneymakers-algo.com/stocks/exited_calls?startDate=${startDate}&endDate=${endDate}`);
    setisLoading(()=>false)
    const data = await convertWithIDStocks(res.data.data);
    settradesData(()=>data)
  } catch (error) {
    setisLoading(()=>false)
      errorNitification("Something went wrong, Please try again later");
  }
}


  return (
    <div className={styles.trade_history}>
    <Toaster/>
      <p className={styles.page_name}>Trade History</p>
      <Sidebar />
      <TradesPAndL data={tradesData}  setTotelPNL={setTotelPNL}/>
      <div className={styles.trades_form}>
        <div className={styles.select_strategy_box}>
          <div className={styles.input_wrapper}>
            <select
              value={selectedStrategy}
              onChange={(e) => {
                settradesData(()=>[])
                setselectedStrategy(e.target.value)}}
              className={styles.select_strategy}
              type="select"
            >
              <option value="All" defaultValue={"All"}>
                All
              </option>
              {strategies.map((value, index) => {
                if (
                  value == "Scalper_Master_Reverse" ||
                  value == "Scalper_Master"
                ) {
                  if (Activestrategies.includes(value)) {
                    return (
                      <option key={index} value={value}>
                        {strategy[value]}
                      </option>
                    );
                  }
                } else {
                  return (
                    <option key={index} value={value}>
                      {strategy[value]}
                    </option>
                  );
                }
              })}
            </select>
            <p className={styles.input_desc}>strategy</p>
          </div>
          <div className={styles.input_wrapper}>
            <input
              className={styles.input_date}
              value={startDate}
              onChange={(e) => setstartDate(e.target.value)}
              type="date"
              placeholder="From Date"
            />
            <p className={styles.input_desc}>From Date</p>
          </div>
          <div className={styles.input_wrapper}>
            <input
              value={endDate}
              onChange={(e) => setendDate(e.target.value)}
              type="date"
              placeholder="To Date"
            />
            <p className={styles.input_desc}>To date</p>
          </div>
          <button onClick={getTrades} className={styles.submit_btn}>
            SUBMIT
          </button>
          <button onClick={generatePDF} className={styles.submit_btn}>
            Export
          </button>
        </div>
      </div>
      {
        selectedStrategy==="Stocks"?  <ExitedCalls ExitedCalls={tradesData} isLoading={isLoading}/>:<Trades data={tradesData}  isLoading={isLoading}/>
      }
      
    </div>
  );
};

export default TradeHistory;
