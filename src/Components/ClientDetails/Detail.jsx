import React from "react";
import styles from "../../Css/ClientDetails/Detail.module.css";
import { useSelector } from "react-redux";
const Detail = ({ setbrokerModal, setsubscriptionModal }) => {
const{clientDetailUser}  = useSelector(state=> state.ClientDetailReducer);
 

  return (
    <div className={styles.detail}>
      <table>
        <tr>
          <td className={styles.title}>Client ID</td>
          <td className={styles.desc}>{clientDetailUser?.UserID}</td>
        </tr>
        <tr>
          <td className={styles.title}>Client Name</td>
          <td className={styles.desc}>{clientDetailUser?.Name}</td>
        </tr>
        <tr>
          <td className={styles.title}>Signup Date & Time</td>
          <td className={styles.desc}>{clientDetailUser?.SignupDateTime}</td>
        </tr>
        <tr>
          <td className={styles.title}>Subscription Type</td>
          <td className={styles.desc}>
            {clientDetailUser?.Subcription||"None"}
            {/* <img
              className={styles.pen_img}
              src="/pen.png"
              alt=""
              onClick={() => setsubscriptionModal(true)}
            /> */}
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td className={styles.title}>Client Number</td>
          <td className={styles.desc}>{clientDetailUser?.Number}</td>
        </tr>
        <tr>
          <td className={styles.title}>Client Email ID</td>
          <td className={styles.desc}>{clientDetailUser?.Email}</td>
        </tr>
        <tr>
          <td className={styles.title}>Connect Broker Time</td>
          <td className={styles.desc}>{clientDetailUser?.APIDateTime||"None"}</td>
        </tr>
        <tr>
          <td className={styles.title}>Connected Broker</td>
          <td className={styles.desc}>
             {clientDetailUser?.Broker||"None"}
            <img
              className={styles.pen_img}
              src="/pen.png"
              alt=""
              onClick={() => setbrokerModal(true)}
            />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Detail;
