import React, { useEffect, useState } from 'react'
import TradesPAndL from '../Components/TradeHistory/TradePAndL'
import Sidebar from '../Components/Common/Sidebar'
import styles from "../Css/UsersTrades/UsersTrades.module.css"
import Trades from '../Components/TradeHistory/Trades'
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsersTrades, UserWiseTrades } from '../Redux/TradesReducer/action'


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

const UsersTrades = () => {

  const [tradesData, settradesData] = useState([]);
  const [totelPNL , setTotelPNL]  = useState(0);
  const {UsersTrades, isLoading , error}=useSelector((state) => state.TradesReducer)
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const param=useParams()
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(UserWiseTrades({UserID:param.id}))
  }, []);

  function getTrades() {
    dispatch(GetUsersTrades({startDate,endDate,UserID:param.id}))
  }

  if (error) {
    toast.error("Something went wrong");
  }

  return (
    <div className={styles.users_trades}>
      <p className={styles.page_name}>Users Trades</p>
      <p className={styles.user_detail}>{param.id||""}</p>
      <Sidebar/>

      <TradesPAndL data={UsersTrades} setTotelPNL={setTotelPNL}/>
      <div className={styles.select_strategy_box}>
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
            className={styles.input_date}
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
        </div>
      <Trades data={UsersTrades}  isLoading={isLoading}/>
    </div>
  )
}

export default UsersTrades
