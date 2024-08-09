import React from 'react'
import styles from "../../Css/Dashboard/ActiveVouchers.module.css";
import { useSelector } from 'react-redux';
import Loader from '../Common/Loader';
import toast, { Toaster } from 'react-hot-toast';

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
const ActiveVoucherCode = () => {

    const{error,isLoading,vouchers} =  useSelector(state=> state.VoucherReducer);

if(error){
    return errorNitification("Something went wrong")
}


  return (
    <div className={styles.active_container}>
    <Toaster/>
    <div className={styles.active_header}>
      <p className={styles.head_txt}>Active Voucher code</p>
      {/* <button className={styles.view_btn}>VIEW ALL</button> */}
    </div>
    <hr className={styles.dashed_line} />
    {
        isLoading?<Loader/>:<div className={styles.table_box}>
        <table className={styles.active_table}>
        <thead className={styles.table_head}>
          <tr>
            <th>Voucher Code</th>
            <th>Amount</th>
            <th>Remaining Vouchers</th>
          </tr>
</thead>
          {vouchers.length > 0 &&
            vouchers.map((elem) => {
              return (
                <tr>
                  <td>{elem.Voucher_Code}</td>
                  <td>{elem.Amount}</td>
                  <td>{elem.Quantity}</td>
                </tr>
              );
            })}
        </table>
       
    </div>
    }
    

    {vouchers.length == 0 && !isLoading && (
      <p className={styles.no_data}>No Data Found</p>
    )}
  </div>
  )
}

export default ActiveVoucherCode
