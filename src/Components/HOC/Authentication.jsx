import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Authentication = ({ children }) => {
  const [token, settoken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    settoken(Cookies.get("Token"));
  }, []);

  if (token) {
    return children;
  } else {
    navigate("/login");
  }
};

export default Authentication;
