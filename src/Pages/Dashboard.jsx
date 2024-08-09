import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Common/Sidebar";
import styles from "../Css/Dashboard/Dashboard.module.css";
import Numbers from "../Components/Dashboard/Numbers";
import LivePAndLTable from "../Components/Dashboard/LivePAndLTable";
import WelcomeBox from "../Components/Dashboard/WelcomeBox";
import TodaySubscriptions from "../Components/Dashboard/TodaySubscriptions";
import TrialUsers from "../Components/Dashboard/TrialUsers";
import TodaysActiveUser from "../Components/Dashboard/TodaysActiveUser";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllSubscriptions,
  GetCurrentMonthSubscription,
  GetExpiringSubscriptions,
  GetTodaySubscription,
  GetTrial,
} from "../Redux/SubscriptionsReducer/actions";
import { GetActiveBots, Usercount } from "../Redux/UsersReducer/action";
import { GetRunningTrades } from "../Redux/TradesReducer/action";
import ExpiringSubscription from "../Components/Dashboard/ExpiringSubscription";
import ActiveVoucherCode from "../Components/Dashboard/ActiveVoucherCode";
import { getVouchers } from "../Redux/VoucherReducers/action";


const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getVouchers())
    dispatch(GetTodaySubscription());
    dispatch(GetAllSubscriptions());
    dispatch(Usercount());
    dispatch(GetActiveBots());
    dispatch(GetTrial());
    dispatch(GetRunningTrades());
    dispatch(GetCurrentMonthSubscription());
    dispatch(GetExpiringSubscriptions())
  }, []);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <WelcomeBox />
      <Numbers />
      <div className={styles.tables}>
        <LivePAndLTable />
        <TodaySubscriptions />
      </div>
      <div className={styles.tables}>
        <TrialUsers />
        <ExpiringSubscription/>
      </div>
      <div className={styles.tables}>
        <TodaysActiveUser />
        <ActiveVoucherCode/>
      </div>
    </div>
  );
};

export default Dashboard;
