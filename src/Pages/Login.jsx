import React, { useEffect, useState } from "react";
import styles from "../Css/Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Common/Loader";
import { ShowNotification, StartLoading } from "../Redux/MiscReducer/action";
import { Signout, Signin, Add, ClearAuthErrorMessage } from "../Redux/AuthReducer/action";
import toast, { Toaster } from "react-hot-toast";
// import Loader from "../Components/Common/Loader";

const successNitification = (message) =>
  toast.success(message, {
    duration: 3000,
    position: "top-center",
  });
const errorNitification = (message) =>
  toast.error(message, {
    duration: 3000,
    position: "top-center",
  });

const Login = () => {
  const [Number, setNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ispasswordVisible, setispasswordVisible] = useState(false);
  const navigate = useNavigate();

  const {error,isLoading} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  function handleSubmit() {
    if (Number.length == 0) {
      errorNitification("Please enter a valid Number");
      dispatch(ShowNotification);
    } else if (Password.length == 0) {
      errorNitification("Please enter a valid Password");
    } else {
      dispatch(
        Signin({ Number, Password }, () => {
          navigate("/");
        })
      );
    }
  }

  useEffect(() => {
    if(error){
      errorNitification(error);
      dispatch(ClearAuthErrorMessage())
    }
  }, [error])


  return (
    <div className={styles.login_page}>
      <Toaster />

      {isLoading && <Loader />}
      <div className={styles.form_box}>
        <p className={styles.login_title}>Login</p>
        <input
          className={styles.text_input}
          placeholder="Enter Your Number"
          type="number"
          value={Number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <div className={styles.password_container}>
          <input
            className={styles.text_input}
            placeholder="Enter Password"
            type={ispasswordVisible ? "text" : "password"}
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {ispasswordVisible ? (
            <img
              onClick={() => setispasswordVisible(() => false)}
              src="/hide_password.png"
              alt=""
            />
          ) : (
            <img
              onClick={() => setispasswordVisible(() => true)}
              src="/show_password.png"
              alt=""
            />
          )}
        </div>

        <button onClick={handleSubmit} className={styles.login_btn}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
