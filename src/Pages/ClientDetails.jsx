import React, { useEffect, useState } from "react";
import styles from "../Css/ClientDetails/ClientDetails.module.css";
import Sidebar from "../Components/Common/Sidebar";
import Detail from "../Components/ClientDetails/Detail";
import SubscribedStrategies from "../Components/ClientDetails/SuscribedStrategies";
import ConnectBrokerForm from "../Components/ClientDetails/ConnectBrokerForm";
import AddSubscription from "../Components/ClientDetails/AddSubscription";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../Redux/ClientDetailReducer/action";
const ClientDetails = () => {
  const [brokerModal, setbrokerModal] = useState(false);
  const [subscriptionModal, setsubscriptionModal] = useState(false);
  
  const navigate=useNavigate() 
  const{id} =  useParams();
  const dispatch =  useDispatch();
  useEffect(()=>{
    dispatch(getUserDetails(id))
  },[id])



  

  return (
    <div className={styles.client_detail}>
      <Sidebar />
      <p className={styles.page_header}>Client Detail</p>
      <Detail
        setbrokerModal={setbrokerModal}
        setsubscriptionModal={setsubscriptionModal}
      />
      
      <button className={styles.trade_history_btn} onClick={()=>navigate(`/users-trades/${id}`)}>Trade History</button>
      
      <SubscribedStrategies />
      {brokerModal && <ConnectBrokerForm setbrokerModal={setbrokerModal} />}
      {/* {subscriptionModal && (
        <AddSubscription setsubscriptionModal={setsubscriptionModal} />
      )} */}
    </div>
  );
};

export default ClientDetails;
