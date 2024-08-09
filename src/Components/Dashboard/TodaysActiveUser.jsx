import React from "react";
import styles from "../../Css/Dashboard/TodaysActiveUser.module.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../Common/Loader";

function getTime(DateTime) {
  let time = "";
  if (DateTime && DateTime.split(" ").length == 2) {
    time =
      DateTime.split(" ")[1].split(":")[0] +
      ":" +
      DateTime.split(" ")[1].split(":")[1];
  }
  return time;
}

const TodaysActiveUser = () => {
  const { ActiveBots, isLoading, error } = useSelector(
    (state) => state.UsersReducer
  );

  if (error) {
    toast.error("Something went wrong");
  }
  return (
    <div className={styles.active_container}>
      <div className={styles.active_header}>
        <p className={styles.head_txt}>Today's Active Users</p>
        {/* <button className={styles.view_btn}>VIEW ALL</button> */}
      </div>
      <hr className={styles.dashed_line} />
      <div className={styles.table_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <table className={styles.active_table}>
            <tr>
              <th>Client Name</th>
              <th>Strategy</th>
              <th>Active Trade</th>
              <th>Bot Start Time</th>
            </tr>

            {ActiveBots.length > 0 &&
              ActiveBots.map((elem) => {
                return (
                  <tr>
                    <td>{elem.Name}</td>
                    <td>{elem.Script}</td>
                    <td>{elem.Orders == 0 ? "No" : "Yes"}</td>
                    <td>{getTime(elem.Date_Time)}</td>
                  </tr>
                );
              })}
          </table>
        )}
      </div>

      {ActiveBots.length == 0 && !isLoading && (
        <p className={styles.no_data}>No Data Found</p>
      )}
    </div>
  );
};

export default TodaysActiveUser;
