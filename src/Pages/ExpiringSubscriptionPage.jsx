import React, { useEffect } from "react";
import Sidebar from "../Components/Common/Sidebar";
import { useDispatch } from "react-redux";
import { GetExpiringSubscriptions } from "../Redux/SubscriptionsReducer/actions";
import ExpiringSubscriptionsTable from "../Components/ExpiringSubscriptionPage/ExpiringSubscriptionsTable";
import styles from "../Css/ExpiringSubscriptionPage/ExpiringSubscriptionPage.module.css";

const ExpiringSubscriptionPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetExpiringSubscriptions());
  }, []);

  return (
    <div className={styles.expiring_page}>
      <p className={styles.page_header}>Expiring Subscription In 7 Days</p>
      <Sidebar />
      <ExpiringSubscriptionsTable />
    </div>
  );
};

export default ExpiringSubscriptionPage;
