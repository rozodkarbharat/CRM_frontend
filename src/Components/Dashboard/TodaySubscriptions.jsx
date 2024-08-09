import React, { memo } from "react";
import styles from "../../Css/Dashboard/TodaySubscriptions.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import toast, { Toaster } from "react-hot-toast";
const TodaySubscriptions = () => {
  const { TodaySubscribed,isLoading,error } = useSelector(
    (State) => State.SubscriptionsReducer
  );
  const navigate=useNavigate()

   if(error){
    console.log(error);
    toast.error("something went wrong")
   }
 
  return (
    <div className={styles.subscription_container}>
      <div className={styles.subscription_header}>
        <p className={styles.head_txt}>Today's Subscriptions</p>
        <button onClick={()=>navigate("/subscription-detail")} className={styles.view_btn}>VIEW ALL</button>
      </div>
      <hr className={styles.dashed_line} />
      <Toaster/>
      {
        isLoading? <Loader/>  :<table className={styles.subscription_table}>
        <tr>
          <th>Client Name</th>
          <th>Strategy Name</th>
          <th>Amount</th>
          <th>Duration</th>
        </tr>
        {TodaySubscribed.length>0&&TodaySubscribed.map((elem) => {
          return (
            <tr>
              <td>{elem.Name}</td>
              <td>{elem.Strategy}</td>
              <td>{elem.Amount}</td>
              <td>1M</td>
            </tr>
          );
        })}
      </table>
      }
    
      {
        TodaySubscribed.length ==0 && !isLoading &&<p className={styles.no_data}>No Data Found</p>
      }
    </div>
  );
};

export default memo(TodaySubscriptions);
