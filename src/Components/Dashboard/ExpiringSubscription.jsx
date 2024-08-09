import React from "react";
// import styles from "../../Css/Dashboard/ExitModel.module.css"
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import styles from "../../Css/Dashboard/ExpiringSubscription.module.css";
import { useNavigate } from "react-router-dom";

function getDaysDifference(dateString) {
  try {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("-");
    let [hours, minutes, seconds] = timePart.split(":");
    if (!seconds) {
      seconds = "10";
    }
    const givenDate = new Date(year, month - 1, day, hours, minutes, seconds);
    const today = new Date();
    const diffInMs = today - givenDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return 45 - diffInDays;
  } catch (err) {
    return 0;
  }
}

let Strategies = {
  BNF: "Range Breakout",
  BNF_Bramhastra: "BankNifty Bramhastra",
  Saturn: "Trend Following",
  Scalper_Master: " Scalper Master",
  Candle_Master: "Candle Master",
  Nifty_GOD: "Nifty Trivikram",
  BankNifty_GOD: "BnakNifty Trivikram",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  Venus: "Venus",
};

const ExpiringSubscription = () => {
  const { Expiringsubscriptiondata, isLoading } = useSelector(
    (state) => state.SubscriptionsReducer
  );
  const navigate = useNavigate();

  return (
    <div className={styles.active_container}>
      <div className={styles.active_header}>
        <p className={styles.head_txt}>Subscriptions Expiring in 7 Days</p>
        <button
          on
          onClick={() => navigate("/expiring-subscription")}
          className={styles.view_btn}
        >
          VIEW ALL
        </button>
      </div>
      <hr className={styles.dashed_line} />
      <div className={styles.table_box}>
        {isLoading ? (
          <Loader />
        ) : (
          <table className={styles.active_table}>
            <tr>
              <th>Client Name</th>
              <th>Stragetgy</th>
              <th>Remaining days</th>
            </tr>

            {Expiringsubscriptiondata.length > 0 &&
              Expiringsubscriptiondata.map((elem) => {
                return (
                  <tr className={styles.sub_row}>
                    <td>{elem.Name}</td>
                    <td>{elem.Strategy && Strategies[elem.Strategy]}</td>
                    <td>{getDaysDifference(elem.DateTime)}</td>
                  </tr>
                );
              })}
          </table>
        )}
      </div>

      {Expiringsubscriptiondata.length == 0 && !isLoading && (
        <p className={styles.no_data}>No Data Found</p>
      )}
    </div>
  );
};

export default ExpiringSubscription;
