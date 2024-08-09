import React, { useDebugValue, useEffect } from "react";
import styles from "../Css/Strategies/Strategies.module.css";
import StrategiesHeader from "../Components/Strategies/StrategiesHeader";
import Sidebar from "../Components/Common/Sidebar";
import StrategyTable from "../Components/Strategies/StrategyTable";
import { useDispatch } from "react-redux";
import { getStrategies } from "../Redux/StrategiesReducer/action";

const Strategies = () => {
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getStrategies());
},[])

  return (
    <div className={styles.strategies}>
      <Sidebar />
      <StrategiesHeader />
      <StrategyTable />
    </div>
  );
};

export default Strategies;
