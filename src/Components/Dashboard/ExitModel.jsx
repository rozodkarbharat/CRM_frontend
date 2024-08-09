import React from "react";
import styles from "../../Css/Dashboard/ExitModel.module.css"
const ExitModal = ({setExitModel,exitClick}) => {
  return (
    <div className={styles.exit_modal}>
      <p>Are you sure you want to exit?</p>

      <div className={styles.exit_modal_buttons}>
        <button onClick={()=>setExitModel(false)}>Cancel</button>
        <button onClick={exitClick}>Exit</button>
      </div>
    </div>
  );
};

export default ExitModal;
