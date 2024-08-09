import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HasAuth = ({ children }) => {
  const [token, settoken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let Token = Cookies.get("Token");
    settoken(() => Token);
  }, []);

  if (token) {
    navigate("/");
  } else {
    return children;
  }
};

export default HasAuth;
