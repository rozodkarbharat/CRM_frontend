import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Common/Sidebar";
import styles from "../Css/CRM/CRM.module.css";
import CrmTable from "../Components/CRM/CrmTable";
import { useDispatch, useSelector } from "react-redux";
import { getCrmUsers } from "../Redux/CRMReducer/action";
import Pagination from "../Components/Common/Pagination";
import { useSearchParams } from "react-router-dom";

const CRM = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {CRMUsers}  =  useSelector(state=>state.CRMReducer)
 const  [searchParams] = useSearchParams()


  const len  =  CRMUsers.length/10
 
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      dispatch(getCrmUsers(searchQuery, currentPage,searchParams.get("active")));
       
    }, 800);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);  
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    dispatch(getCrmUsers(searchQuery, currentPage+1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    dispatch(getCrmUsers(searchQuery, currentPage-1));
    
  };

  return (
    <div className={styles.crm}>
      <Sidebar />
      <p className={styles.page_header}>CRM</p>
      <div className={styles.search_container}>
        <input
          className={styles.search_inp}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className={styles.search_btn}>Search</button>
      </div>
      <CrmTable  CRMUsers={CRMUsers} />
      {
        CRMUsers.length>0 &&  <Pagination len={len} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} currentPage={currentPage}/> }
     
    </div>
  );
};

export default CRM;
