import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Common/Loader";
import styles from "../../Css/ExpiringSubscriptionPage/ExpiringSubscriptionsTable.module.css";

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

const ExpiringSubscriptionsTable = () => {
  const { isLoading, Expiringsubscriptiondata } = useSelector(
    (state) => state.SubscriptionsReducer
  );

  return (
    <div className={styles.sub_table_container}>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.sub_table}>
          <tr>
            <th>Sr. No</th>
            <th>Client Name</th>
            <th>Client Number</th>
            <th>Strategy Name</th>
            <th>Amount</th>
            <th>DateTime</th>
            <th>Remaining days</th>
          </tr>
          {Expiringsubscriptiondata.length > 0 &&
            Expiringsubscriptiondata?.map((elem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{elem.Name}</td>
                <td>{elem.Number}</td>
                <td>{elem.Strategy && Strategies[elem.Strategy]}</td>
                <td>{elem.Amount}</td>
                <td>{elem.DateTime}</td>
                <td>{getDaysDifference(elem.DateTime)}</td>
              </tr>
            ))}
        </table>
      )}

      {Expiringsubscriptiondata.length == 0 && !isLoading && (
        <p className={styles.no_data}>No Data Found</p>
      )}
    </div>
  );
};

export default ExpiringSubscriptionsTable;
