import React, { useState } from "react";
import style from "../../Css/ClientDetails/AddSubscription.module.css";

let Strategies = {
  BNF: "Range Breakout",
  Saturn: "Trend Following",
  Candle_Master: "Candle Master",
  UV5_BankNifty: "UV5 Bank Nifty",
  UV5_Nifty: "UV5 Nifty",
  Venus: "Venus",
  Scalper_Master_Reverse: "Scalper Master Reverse",
  Scalper_Master: "Scalper Master",
};

const AddSubscription = ({ setsubscriptionModal }) => {
  const [selectedStrategy, setselectedStrategy] = useState("");
  return (
    <div className={style.connect_broker_form}>
      <p
        className={style.close_btn}
        onClick={() => setsubscriptionModal(false)}
      >
        X
      </p>
      <p className={style.modal_title}>Add New Subscription</p>
      <select
        value={selectedStrategy}
        onChange={(e) => setselectedStrategy(e.target.value)}
        className={style.selecte_broker}
        type="select"
      >
        <option value="">Choose a Strategy</option>
        {Object.keys(Strategies).map((value, index) => {
          return (
            <option key={index} value={value}>
              {Strategies[value]}
            </option>
          );
        })}
      </select>
      <input
        className={style.input}
        type="number"
        placeholder="Duration (Number of days)"
      />

      <button onClick={""} className={style.submit_btn}>
        ADD
      </button>
    </div>
  );
};

export default AddSubscription;
