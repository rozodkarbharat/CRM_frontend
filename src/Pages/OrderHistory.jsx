import React, { useEffect, useState } from "react";
import styles from "../Css/OrderHistory/OrderHistory.module.css";
import Sidebar from "../Components/Common/Sidebar";
import OrderHistoryTable from "../Components/OrderHistory/OrderHistoryTable";
import OrderDetail from "../Components/OrderHistory/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { GetTodayOrders, GetUserwiseOrder } from "../Redux/TradesReducer/action";
import { useSearchParams } from "react-router-dom";


const OrderHistory = () => {
  const {  Orderdetail } = useSelector((state) => state.TradesReducer);
  const [detailPopUp, setdetailPopUp] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    let UserID=searchParams.get("UserID")
    if(UserID){
      dispatch(GetUserwiseOrder({UserID}));
    }
    else{
      dispatch(GetTodayOrders());
    }
  }, []);
  
  useEffect(() => {
    if(Object.keys(Orderdetail).length>0)
   { setdetailPopUp(()=>true)}
  }, [Orderdetail])
  return (
    <div className={styles.orders}>
      <Sidebar />
      <p className={styles.page_header}>Order History</p>
      <OrderHistoryTable />
      { detailPopUp&& <OrderDetail setdetailPopUp={setdetailPopUp} Orderdetail={Orderdetail} />}
    </div>
  );
};

export default OrderHistory;
