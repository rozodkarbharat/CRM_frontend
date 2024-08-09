const intialstate = {
    vouchers:[],
    isLoading:false,
    error:null,
}



export const VoucherReducer = (state=intialstate,action)=>{

const{type,payload} =  action
switch (type) {
    case "GET_VOUCHERS_REQUEST":
        return {...state,isLoading:true, error:null}
    case "GET_VOUCHERS_SUCCESS":
          return {...state, isLoading:false,vouchers:payload}
    case "GET_VOUCHERS_FAILED":
        return {...state,isLoading:false, error:payload,vouchers:[]}

    default:
        return state;
}

}