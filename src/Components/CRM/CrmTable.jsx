import React from "react";
import styles from "../../Css/CRM/CrmTable.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import toast from "react-hot-toast";
const CrmTable = ({CRMUsers}) => {

const navigate  = useNavigate();
  const{isLoading,error} =  useSelector(state=>state.CRMReducer)
 
  if(error){
    toast.error("Something went wrong")
  }
  return (
    <div className={styles.crm_table_container}>
    {
      isLoading?<Loader/>:<table className={styles.crm_table}>
        <tr>
          <th>Sr. No</th>
          <th>Client ID</th>
          <th>Client Name</th>
          <th>Client Number</th>
          <th>Client Email ID</th>
          <th>Signup DateTime</th>
        </tr>
        {
          CRMUsers.length >0 && CRMUsers.map((elm,index)=>(
            <tr onClick={()=> navigate(`/client-detail/${elm.UserID}`)}>
          <td>{index+1}</td>
          <td>{elm.UserID}</td>
          <td>{elm.Name}</td>
          <td>{elm.Number}</td>
          <td>{elm.EmailID}</td>
          <td>{elm.DateTime}</td>
        </tr>
          ))
        }
        
      
      </table>
    }

    {
      CRMUsers.length ==0 && !isLoading && <p className={styles.no_data}>No Data Found</p>
      }
      
    </div>
  );
};

export default CrmTable;
