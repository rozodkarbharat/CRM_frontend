import React, { useEffect, useState } from "react";
import styles from "../../Css/Stocks/StocksExited.module.css";
import ExitedStockCard from "./ExitedStockCard";
import Loader from "../Common/Loader";
 
const ExitedCalls = ({ExitedCalls,isLoading}) => {
 
  return (
    <div className={styles.ExitedCalls_container}>
    {
        isLoading?<Loader/>: ExitedCalls.length > 0 &&
        ExitedCalls.map((elm, index) => (
          <ExitedStockCard key={index} stock={elm} />
        ))
    }
      
    </div>
  );
};

export default ExitedCalls;