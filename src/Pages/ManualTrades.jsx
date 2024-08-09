import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Common/Sidebar";
import styles from "../Css/ManualTrade/ManualTrade.module.css";
import ManualTradePanel from "../Components/ManualTrades/ManualTradePanel";
import Positions from "../Components/ManualTrades/Positions";
import EquityManualTradePanel from "../Components/ManualTrades/EquityManualTradePanel";
import EquityPositions from "../Components/ManualTrades/EquityPositions";
import { useDispatch, useSelector } from "react-redux";
import { GetAllowedStrategies } from "../Redux/UsersReducer/action";


const ManualTrades = () => {
  const [Segmenttype, setSegmenttype] = useState(true);
  const [EquityAllowed, setEquityAllowed] = useState(false)
  const { AllowedStrategies } = useSelector((state) => state.UsersReducer)

  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(GetAllowedStrategies())
  }, [])
  useEffect(() => {
    let temp=AllowedStrategies.filter((elem)=>elem["Strategy"]==="Equity")
    if(temp.length){
      setEquityAllowed(()=>true)
    }
  }, [AllowedStrategies])
  return (
    <div className={styles.manual_trade}>
      <Sidebar />
      {Segmenttype && (
        <>
          <div className={styles.heading_cont}>
          <p className={styles.page_header}>Manual Trade</p>
            {EquityAllowed&&<button onClick={()=>setSegmenttype(false)} className={styles.switch_segment_btn}>Equity Trades</button>}
          </div>
          <ManualTradePanel />
          <hr className={styles.line} />
          <p className={styles.position_head}>Position</p>
          <Positions />
        </>
      )}
      {
        !Segmenttype && EquityAllowed && (
          <>
          <div className={styles.heading_cont}>
            <p className={styles.page_header}>Stocks Recommendation</p>
            <button onClick={()=>setSegmenttype(true)} className={styles.switch_segment_btn}>F&O Trades</button>
          </div>
            <EquityManualTradePanel />
            <hr className={styles.line} />
            <p className={styles.position_head}>Position</p>
            <EquityPositions />
          </>
        )
      }
    </div>
  );
};

export default ManualTrades;
