import React, { useEffect } from "react";
import styles from "../../Css/Common/Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "../../Redux/AuthReducer/action";

const Sidebar = () => {
  const navigate = useNavigate();

  function logout() {
    Cookies.remove("Token");
    navigate("/login");
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserName());
  }, []);

  const { Role } = useSelector((state) => state.AuthReducer);

  return (
    <div className={styles.sidebar}>
      <div onClick={() => navigate("/")} className={styles.logo}>
        {/* <img className={styles.logo_img} src="Red_Bull.png" alt="" /> */}
        <p className={styles.logo_txt}>VP Algo</p>
      </div>
      <div className={styles.options}>
        <p onClick={() => navigate("/")}>Dashboard</p>
        <p onClick={() => navigate("/strategies")}>Strategies</p>
        <p onClick={() => navigate("/trade-history")}>Trade History</p>
        <p onClick={() => navigate("/orders")}>Order History</p>
        {Role !== "Franchise" ? 
          <p onClick={() => navigate("/manual-trade")}>Manual Trade</p>
          :<p onClick={() => navigate("/live-trades")}>Live Trades</p>
        }
        <p onClick={() => navigate("/subscription-detail")}>
          Subscription Details
        </p>

        <p onClick={() => navigate("/traded-users")}>Traded Users</p>

        <p onClick={() => navigate("/crm?active=false")}>CRM</p>

        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
