import React from "react";
import styles from "../../Css/Strategies/StrategiesHeader.module.css";
const StrategiesHeader = () => {
  return (
    <div className={styles.header_box}>
      <p className={styles.page_name}> Strategies</p>
      {/* <button className={styles.create_btn}>Create New Strategy</button> */}
    </div>
  );
};

export default StrategiesHeader;
