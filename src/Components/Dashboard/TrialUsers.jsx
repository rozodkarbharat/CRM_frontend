import React from "react";
import styles from "../../Css/Dashboard/TrialUsers.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader"
import toast from "react-hot-toast";
const TrialUsers = () => {
  const {TrialUsers,isLoading,error} = useSelector((state) => state.SubscriptionsReducer)
  const navigate=useNavigate()
  if(error){
    
    toast.error("Someting went wrong")
  }
  return (
    <div className={styles.trial_container}>
      <div className={styles.trial_header}>
        <p className={styles.head_txt}>Trial Users</p>
        <button onClick={()=>navigate('/crm?active=true')} className={styles.view_btn}>VIEW ALL</button>
      </div>
      <hr className={styles.dashed_line} />
      {
        isLoading? <Loader/>:<table className={styles.trial_table}>
        <tr>
          <th>Client Name</th>
          <th>Strategy</th>
          <th>Number</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
        {
          TrialUsers.length >0 &&TrialUsers.map((elem)=>{
            return <tr>
            <td>{elem.Name}</td>
            <td>{elem.Strategies.trim('"')}</td>
            <td>{elem.Number}</td>
            <td>{elem.DateTime&&elem.DateTime.split(" ")[0]}</td>
            <td>{elem.endDate&&elem.endDate.split(" ")[0].split("/").join("-")}</td>
          </tr>
          })
        }
      </table>
      }
      
      {
        TrialUsers.length ==0 &&<p className={styles.no_data}>No Data Found</p>
      }
    </div>
  );
};

export default TrialUsers;
