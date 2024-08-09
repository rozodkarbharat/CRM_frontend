import React, { useEffect, useState } from "react";
import styles from "../Css/SubscriptionDetail/SubscriptionDetail.module.css";
import Sidebar from "../Components/Common/Sidebar";
import SubscriptionOverview from "../Components/Common/SubscriptionOverview";
import SubscriptionsTable from "../Components/SubscriptionDetail/SubscriptionsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSubscriptionDetail,
  GetSubscriptionDetailFilter,
} from "../Redux/SubscriptionDetailReducer/action";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "../Components/Common/Pagination";
import toast, { Toaster } from "react-hot-toast";
const errorNitification = (message) =>
  toast.error(message, {
    duration: 3000,
    position: "top-center",
  });
let strategy = {
  BNF: "Bank Nifty Range Breakout",
  Saturn: "Trend Following",
  Candle_Master: "Candle Master",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  Scalper_Master_Reverse: "Scalper Master Reverse",
  Scalper_Master: "Scalper Master",
  Nifty_GOD:"NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BankNifty_GOD:"BANK NIFTY TRIVIKRAM ALGO SMARAT TRADERS",
  BNF_Bramhastra:"BankNifty Bramhastra"
};

const SubscriptionDetail = () => {
  const [strategies, setstrategies] = useState(Object.keys(strategy));
  const [selectedStrategy, setselectedStrategy] = useState("All");
  const [Activestrategies, setActivestrategies] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSubscriptionDetail());
    axios
      .get("https://crm-backend-8ogr.onrender.com/ams_user/allowed-startegies", {
        headers: { Token: `Bearer ${Cookies.get("Token")}` },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setActivestrategies(response.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const { SubscriptionDetailUsers } = useSelector(
    (state) => state.SubscriptionDetailReducer
  );
  const len = SubscriptionDetailUsers.length / 10;

  

  const handleSubmit = (currentpage) => {
    if (!startDate || !endDate){
      return errorNitification("Please select all fields");
  }
    dispatch(
      GetSubscriptionDetailFilter(
        startDate,
        endDate,
        selectedStrategy,
        currentpage
      )
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    handleSubmit(currentPage+1)
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    handleSubmit(Math.max(currentPage - 1, 1))
  };

  return (
    <div className={styles.subscription_detail}>
      <p className={styles.page_header}>Subscription details</p>
      <Sidebar />
      <Toaster/>
      <SubscriptionOverview />
      <div className={styles.trades_form}>
        <div className={styles.select_strategy_box}>
          <div className={styles.input_wrapper}>
            <select
              value={selectedStrategy}
              onChange={(e) => setselectedStrategy(e.target.value)}
              className={styles.select_strategy}
              type="select"
            >
              <option value="All" defaultValue={"All"}>
                All
              </option>

              {Activestrategies.length > 0 &&
                Activestrategies?.map((value, index) => (
                  <option key={index} value={value.Strategy}>
                    {strategy[value.Strategy]}
                  </option>
                ))}
            </select>
            <p className={styles.input_desc}>strategy</p>
          </div>
          <div className={styles.input_wrapper}>
            <input
              className={styles.input_date}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              placeholder="From Date"
            />
            <p className={styles.input_desc}>From Date</p>
          </div>
          <div className={styles.input_wrapper}>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              placeholder="To Date"
            />
            <p className={styles.input_desc}>To date</p>
          </div>
          <button onClick={()=>handleSubmit(currentPage)} className={styles.submit_btn}>
            SUBMIT
          </button>
        </div>
      </div>
      <SubscriptionsTable />
      {SubscriptionDetailUsers.length > 0 && <Pagination len={len} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} currentPage={currentPage}/>}
    </div>
  );
};

export default SubscriptionDetail;
