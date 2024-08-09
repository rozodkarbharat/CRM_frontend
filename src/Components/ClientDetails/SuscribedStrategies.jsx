import React, { useEffect } from "react";
import styles from "../../Css/ClientDetails/SubscribedStrategies.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailStrategies } from "../../Redux/ClientDetailReducer/action";
const SubscribedStrategies = () => {
const{id}  = useParams();
const dispatch =  useDispatch();
useEffect(()=>{
dispatch(getUserDetailStrategies(id));
},[id])

const{clientStrategies} =  useSelector(state=> state.ClientDetailReducer);
  

  return (
    <div>
      <p className={styles.table_title}>Subscribed Strategies</p>
      <table className={styles.crm_table}>
        <tr>
          <th>Sr. No</th>
          <th>Strategy Name</th>
          <th>Amount</th>
          <th>Duration</th>
          <th>Subscription Date</th>
          <th>Subscription End Date</th>
        </tr>
        {
          clientStrategies.length>0 && clientStrategies.map((elm,index)=>(
            <tr>
          <td>{index+1}</td>
          <td>{elm.Strategy}</td>
          <td>{elm.Amount/100}</td>
          <td>1M</td>
          <td>{elm.SubscriptionDateTime}</td>
          <td>{elm.SubscriptionEndDate}</td>
        </tr>
          ))
        }
    
      </table>
    </div>
  );
};

export default SubscribedStrategies;
