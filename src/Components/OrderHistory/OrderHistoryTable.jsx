import React, { useEffect } from "react";
import styles from "../../Css/OrderHistory/OrderHistoryTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import {  ViewOrder } from "../../Redux/TradesReducer/action";
import toast from "react-hot-toast";
import Loader from "../Common/Loader";

function getTime(DateTime) {
  let time = "";
  if (DateTime && DateTime.split(" ").length == 2) {
    time =
      DateTime.split(" ")[1].split(":")[0] +
      ":" +
      DateTime.split(" ")[1].split(":")[1];
  }
  return time;
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

  Nifty_GOD_1_1:"Nifty God 1 1", Nifty_GOD_1_2:"Nifty God 1 2",
  Nifty_GOD_1_3:"Nifty God 1 3", Nifty_GOD_1_4:"Nifty God 1 4",
  Nifty_GOD_3_1:"Nifty God 3 1", Nifty_GOD_3_2:"Nifty God3 2 ",
  Nifty_GOD_3_3:"Nifty God 3 3", Nifty_GOD_3_4:"Nifty God 3 4",
  Nifty_GOD_5_1:"Nifty God 5 1", Nifty_GOD_5_2:"Nifty God 5 2",
  Nifty_GOD_5_3:"Nifty God 5 3", Nifty_GOD_5_4:"Nifty God 5 4",
  Nifty_GOD_15_1:"Nifty God 15 1", Nifty_GOD_15_2:"Nifty God 15 2",
  Nifty_GOD_15_3:"Nifty God 15 3", Nifty_GOD_15_4:"Nifty God 15 4",

  BankNifty_GOD_1_1:"Bank Nifty God 1 1", BankNifty_GOD_1_2:"Bank Nifty God 1 2",
  BankNifty_GOD_1_3:"Bank Nifty God 1 3", BankNifty_GOD_1_4:"Bank Nifty God 1 4",
  BankNifty_GOD_3_1:"Bank Nifty God 3 1", BankNifty_GOD_3_2:"Bank Nifty God 3 2",
  BankNifty_GOD_3_3:"Bank Nifty God 3 3", BankNifty_GOD_3_4:"Bank Nifty God 3 4",
  BankNifty_GOD_5_1:"Bank Nifty God 5 1", BankNifty_GOD_5_2:"Bank Nifty God 5 2",
  BankNifty_GOD_5_3:"Bank Nifty God 5 3", BankNifty_GOD_5_4:"Bank Nifty God 5 4",
  BankNifty_GOD_15_1:"Bank Nifty God 15 1", BankNifty_GOD_15_2:"Bank Nifty God 15 2",
  BankNifty_GOD_15_3:"Bank Nifty God 15 3", BankNifty_GOD_15_4:"Bank Nifty God 15 4"
};

const OrderHistoryTable = () => {
  const { Todaysorders, Orderdetail,isLoading,error } = useSelector((state) => state.TradesReducer);
  const dispatch = useDispatch();

  function handleclick(index){
    dispatch(ViewOrder(index));
  }
  if(error){
    toast.error("Something went wrong")
  }

  return (
    <div className={styles.order_table_container}>
    {
      isLoading?<Loader/>: <table className={styles.order_table}>
        <tr>
          <th>Client Name</th>
          <th>Symbol</th>
          <th>Strategy Name</th>
          <th>Price</th>
          <th>Type</th>
          <th>Status</th>
          <th>Qty</th>
          <th>Time</th>
        </tr>
        {Todaysorders.length > 0 &&
          Todaysorders.map((elem,index) => {
            return (
              <tr onClick={()=>handleclick(index)} key={index}>
                <td>{elem.Name}</td>
                <td>{elem.Symbol}</td>
                <td>{Strategies[elem.Strategy]||elem.Strategy}</td>
                <td>{elem.Price}</td>
                <td>{elem.type}</td>
                <td>{elem.Status}</td>
                <td>{elem.Quantity}</td>
                <td>{getTime(elem.DateTime)}</td>
              </tr>
            );
          })}
      </table>
    }
     
    </div>
  );
};

export default OrderHistoryTable;
