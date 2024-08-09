import React from "react";
import styles from "../../Css/OrderHistory/OrderDetail.module.css";
const OrderDetail = ({ setdetailPopUp, Orderdetail, idOfOpenPopup }) => {
  return (
    <div className={styles.order_details}>
      <p
        onClick={() => setdetailPopUp(() => false)}
        className={styles.close_btn}
      >
        X
      </p>
      <div className={styles.order_overview}>
        <div className={styles.order_detail_component}>
          <p>Quantity</p>
          <p>{Orderdetail.Quantity}</p>
        </div>
        <div className={styles.order_detail_component}>
          <p>Order Type</p>
          <p>{Orderdetail.Type}</p>
        </div>
        <div className={styles.order_detail_component}>
          <p>Price</p>
          <p>{Orderdetail.Price}</p>
        </div>
      </div>
      <div className={styles.order_desc}>
        <p className={styles.order_desc_heading}>Order Details</p>
        <p className={styles.order_desc_date}>
          Order Placed on {Orderdetail.DateTime}
        </p>
        <div className={styles.order_desc_status}>
          <p>Status:</p>
          <p>{Orderdetail.Message}</p>
        </div>
        <div className={styles.order_desc_row}>
          <p>Symbol</p>
          <p>{Orderdetail.Symbol}</p>
        </div>
        <div className={styles.order_desc_row}>
          <p>Broker Order ID</p>
          <p>{Orderdetail.OrderID}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
