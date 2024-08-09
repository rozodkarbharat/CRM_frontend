import React, { useEffect } from "react";
import styles from "../../Css/SubscriptionDetail/SubscriptionsTable.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSubscriptionDetail } from "../../Redux/SubscriptionDetailReducer/action";
import Loader from "../Common/Loader";
import toast from "react-hot-toast";
const SubscriptionsTable = () => {
  
  const{SubscriptionDetailUsers,isLoading,error}  = useSelector(state=>state.SubscriptionDetailReducer);
  if(error){
    toast.error("Something went wrong")
  }
  
  return (
    <div className={styles.sub_table_container}>
    {
      isLoading?<Loader/>:  <table className={styles.sub_table}>
        <tr>
          <th>Sr. No</th>
          <th>Client Name</th>
          <th>Client Number</th>
          <th>Strategy Name</th>
          <th>Amount</th>
          <th>Duration</th>
          <th>DateTime</th>
        </tr>
        {
          SubscriptionDetailUsers.length>0 &&  SubscriptionDetailUsers?.map((elm,index)=>(
           <tr key={index}>
          <td>{index+1}</td>
          <td>{elm.Name}</td>
          <td>{elm.Number}</td>
          <td>{elm.Strategy}</td>
          <td>{elm.Amount}</td>
          <td>1M</td>
          <td>{elm.DateTime}</td>
        </tr>
          ))
        }
      </table>
    }

    {
      SubscriptionDetailUsers.length ==0 && !isLoading && <p className={styles.no_data}>No Data Found</p>
      }
    
    </div>
  );
};

export default SubscriptionsTable;
