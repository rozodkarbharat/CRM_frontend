import React from "react";
import styles from "../../Css/SubscriptionDetail/SubscriptionOverview.module.css";
import { useSelector } from "react-redux";

const SubscriptionOverview = () => {

  const {isLoading,error,NoOfPayment,TotalAmount} =  useSelector(state=> state.SubscriptionDetailReducer)

  return (
    <div className={styles.overview}>
      <div>
    {
      NoOfPayment?<p className={styles.overview_number}>{NoOfPayment}</p>:
      <p className={styles.overview_noData}>0</p>
    }
        <p className={styles.overview_txt}>No of Payments</p>
      </div>

      <div>
      {
        TotalAmount? <p className={styles.overview_number}>₹{TotalAmount}</p>:
        <p className={styles.overview_noData}>0</p>
      }
       
        <p className={styles.overview_txt}>Total Amount</p>
      </div>
    </div>
  );
};

export default SubscriptionOverview;
