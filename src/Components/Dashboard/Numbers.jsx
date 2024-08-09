import React from "react";
import styles from "../../Css/Dashboard/Numbers.module.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../Common/Loader";


const Numbers = () => {
  const {
    TodaySale,
    NumberofTotalSubscribed,
    IncomeTillToday,
    NumberofTrial,
    CurrentMonthSubscription,
    isLoading,
    error,
  } = useSelector((State) => State.SubscriptionsReducer);
  const { Count } = useSelector((State) => State.UsersReducer);
  if (error) {
    toast.error("Something went wrong");
  }

  return (
    <div className={styles.numbers}>
      <div className={styles.number_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <p className={styles.numbers_number}>{Count}</p>
        )}

        <p className={styles.numbers_txt}>Registered Users</p>
      </div>
      <div className={styles.number_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <p className={styles.numbers_number}>{NumberofTrial}</p>
        )}

        <p className={styles.numbers_txt}>Trial Account Live</p>
      </div>
      <div className={styles.number_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <p className={styles.numbers_number}>{NumberofTotalSubscribed}</p>
        )}

        <p className={styles.numbers_txt}>No. Subscribed Accounts</p>
      </div>
      <div className={styles.number_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <p className={styles.numbers_number}>{IncomeTillToday}</p>
        )}

        <p className={styles.numbers_txt}>Income Till today</p>
      </div>
      <div className={styles.number_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <p className={styles.numbers_number}>{TodaySale}</p>
        )}

        <p className={styles.numbers_txt}>Todays Sales</p>
      </div>
      <div className={styles.number_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <p className={styles.numbers_number}>{CurrentMonthSubscription}</p>
        )}

        <p className={styles.numbers_txt}>Current Month Sale</p>
      </div>
    </div>
  );
};

export default Numbers;
