import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Css/TradedUsers/TradedUsers.module.css";
import Loader from "../Components/Common/Loader";
import toast from "react-hot-toast";
import Sidebar from "../Components/Common/Sidebar";
import { Tradedusers } from "../Redux/TradesReducer/action";
import { useNavigate } from "react-router-dom";

const TradedUsers = () => {
  const { TradesUsers, isLoading, error } = useSelector(
    (state) => state.TradesReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Tradedusers());
  }, []);
  if (error) {
    toast.error("Something went wrong");
  }
  return (
    <div style={{ paddingLeft: "22%" }}>
      <Sidebar />
      <p className={styles.pagename}>Traded Users</p>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.order_table}>
          <tr>
            <th>Client Name</th>
            <th>Client ID</th>
            <th>{""}</th>
            <th>{""}</th>
          </tr>
          {TradesUsers.length > 0 &&
            TradesUsers.map((elem, index) => {
              return (
                <tr key={index}>
                  <td>{elem.Name}</td>
                  <td>{elem.UserID}</td>
                  <td>
                    <button onClick={() => navigate(`/orders?UserID=${elem.UserID}`)} className={styles.detail_btn}>Orders</button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/users-trades/${elem.UserID}`)}
                      className={styles.detail_btn}
                    >
                      P&L
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
        </table>
      )}
    </div>
  );
};

export default TradedUsers;
