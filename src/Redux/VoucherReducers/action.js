import axios from "axios";
import Cookies from "js-cookie";

export const getVouchers = () => async (dispatch) => {
  dispatch({
    type: "GET_VOUCHERS_REQUEST",
  });
  try {
    const response = await axios.get(
      "https://crm-backend-8ogr.onrender.com/ams_user/left-voucher",
      { headers: { token: `Bearer ${Cookies.get("Token")}` } }
    );
    let arr =[];
    if(response.data?.data){
        arr =response.data.data
    }
    dispatch({
      type: "GET_VOUCHERS_SUCCESS",
      payload: arr,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "GET_VOUCHERS_FAILED",
      payload: error?.response?.data?.message,
    });
  }
};
