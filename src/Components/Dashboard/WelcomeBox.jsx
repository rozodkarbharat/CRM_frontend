import React, { useState } from "react";
import styles from "../../Css/Dashboard/WelcomeBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster,toast } from "react-hot-toast";
import { getVouchers } from "../../Redux/VoucherReducers/action";
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
const WelcomeBox = () => {
  const { Name, AMSID } = useSelector((state) => state.AuthReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ voucherCode: "", quantity: "", amount: "" });
  const [error, setError] = useState("");
 const dispatch =  useDispatch();

  function handleShare() {
    const androidurl = "https://play.google.com/store/apps/details?id=com.moneymakers.webbrowser";
    const baseUrl = "https://app.moneymakers-algo.com/";
    const shareMessage = `Start your Algo Trading with VP Algo for FREE\n\nYou will get:\n✅ AI-based Trades\n✅ Live Position Tracking\n✅ Free Trial\n\nDownload using my referral link to get Free Trial\n⬇link may expire within 48hrs\n  https://app.moneymakers-algo.com/signup?ref=${AMSID}\nOr use my Referral code ${AMSID}\nT&C Apply`;

    if (navigator.share) {
      navigator.share({ text: shareMessage })
        .then(() => console.log("Share Successful"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      copyToClipboard(shareMessage);
      console.log("Web Share API not supported");
    }
  }
  
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log("Text copied to clipboard");
          alert("Referral link copied to clipboard!");
        })
        .catch((error) => console.error("Failed to copy text:", error));
    } else {
      // Fallback method for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
  
      try {
        document.execCommand('copy');
        console.log("Text copied to clipboard");
        alert("Referral link copied to clipboard!");
      } catch (error) {
        console.error("Fallback: Oops, unable to copy", error);
      }
  
      document.body.removeChild(textarea);
    }
  }
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ voucherCode: "", quantity: "", amount: "" });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async() => {
    const { voucherCode, quantity, amount } = formData;
    if (!voucherCode || !quantity || !amount) {
      setError("All fields are required");
      return;
    }
  
    try {
      const response  = await axios.post("https://crm-backend-8ogr.onrender.com/ams_user/voucher-create", formData, 
      {headers:{ token:`Bearer ${Cookies.get("Token")}` }}
    )
    successNitification(response?.data?.message)
    closeModal();
    dispatch(getVouchers());
    } catch (error) {
      console.log(error);
      errorNitification(error?.response?.data?.message)

    }
    
    console.log("Voucher Created:", formData);
   
  };

 

  return (
    <div className={styles.welcome_box}>
      <p className={styles.welcome_txt}>
        <span className={styles.welcome_word}>Welcome,</span> {Name}
      </p>
      <div>
        <button className={styles.create_voucher_btn} onClick={openModal}>CREATE VOUCHER</button>
        <button className={styles.refferal_btn} onClick={handleShare}>REFFERAL LINK</button>
      </div>
      {isModalOpen && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal}>
            <h2>Create Voucher</h2>
            {error && <p className={styles.error_message}>{error}</p>}
            <label className={styles.modal_label}>
              Voucher Code:
              <input
                className={styles.modal_input}
                type="text"
                name="voucherCode"
                placeholder="Enter Voucher Code"
                value={formData.voucherCode}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.modal_label}>
              Quantity:
              <input
                className={styles.modal_input}
                type="number"
                name="quantity"
                placeholder="Enter Quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.modal_label}>
              Amount:
              <input
                className={styles.modal_input}
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </label>
            <button className={styles.modal_button} onClick={closeModal}>Close</button>
            <button className={styles.modal_button} onClick={handleCreate}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeBox;
