import React, { useEffect, useState } from "react";
import style from "../../Css/ClientDetails/ConnectBrokerForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateBrokerapi } from "../../Redux/ClientDetailReducer/action";

let Brokers = [
  { Name: "Upstox", Symbol: "UPSTOX" },
  { Name: "Angel One", Symbol: "ANGEL" },
];
const ConnectBrokerForm = ({ setbrokerModal }) => {
  const [firstplaceholder, setfirstplaceholder] = useState("");
  const [secondplaceholder, setsecondplaceholder] = useState("");
  const [thirdplaceholder, setthirdplaceholder] = useState("");
  const [Api_Key, setApi_Key] = useState("");
  const [Secret_Key, setSecret_Key] = useState("");
  const [TOTP_Secret, setTOTP_Secret] = useState("");
  const [Client_ID, setClient_ID] = useState("");
  const [Password, setPassword] = useState("");
  const [selectedBroker, setselectedBroker] = useState("");

  useEffect(() => {
    if (selectedBroker === "UPSTOX") {
      setfirstplaceholder(() => "API Key");
      setsecondplaceholder(() => "API Secret");
    }
    if (selectedBroker === "ANGEL") {
      setfirstplaceholder(() => "API Key");
      setthirdplaceholder(() => "MPIN");
      setsecondplaceholder(() => "Validity Key");
    }
  }, [selectedBroker]);

  // function connectBroker() {
  //   let data = {
  //     Api_Key,
  //     Secret_Key,
  //     TOTP_Secret,
  //     Client_ID,
  //     Password,
  //     Broker: selectedBroker,
  //   };

  //   if(Api_Key.length==0||Secret_Key.length==0){
  //     // errorNitification("Invalid data")
  //   }
  //   else if(setselectedBroker=="ANGEL"&&(TOTP_Secret.length==0||Client_ID.length==0||Password.length==0)){
  //     // errorNitification("Invalid data")
  //   }
  //   else{
  //     axios
  //       .post(
  //         "https://crm-app-backend-akpj.onrender.com/broker/add_broker",
  //         {
  //           data,
  //         },
  //         {
  //           headers: {
  //             token: `Bearer ${Cookies.get("Token")}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         if (!response.data.error) {
  //           // navigate("/dashboard");
  //           setisPopup(()=>true)

  //         } else {
  //           // errorNitification("Invalid Data")
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error.message, "message");
  //       });
  //   }
  // }

  
  const{clientDetailUser}  = useSelector(state=> state.ClientDetailReducer);
console.log(clientDetailUser);
const dispatch =  useDispatch();

  function connectbroker(){
      let data = {
      Api_Key,
      Secret_Key,
      TOTP_Secret,
      Client_ID,
      Password,
      Broker: selectedBroker,
    };

    if(Api_Key.length==0||Secret_Key.length==0){
    return alert("Invalid Api_Key or Secret_Key")
    }
    else if(setselectedBroker=="ANGEL"&&(TOTP_Secret.length==0||Client_ID.length==0||Password.length==0)){
      return alert("Invalid Data")
    }

    dispatch(updateBrokerapi(clientDetailUser.UserID, data))
    setbrokerModal(false);

  }


  return (
    <div className={style.connect_broker_form}>
      <p className={style.close_btn} onClick={() => setbrokerModal(false)}>
        X
      </p>
      <p className={style.modal_title}>Add New Broker</p>
      <select
        value={selectedBroker}
        onChange={(e) => setselectedBroker(e.target.value)}
        className={style.selecte_broker}
        type="select"
      >
        <option value="">Choose a Broker</option>
        {Brokers.map((value, index) => {
          return (
            <option key={index} value={value.Symbol}>
              {value.Name}
            </option>
          );
        })}
      </select>
      {selectedBroker && (
        <>
          <input
            value={Api_Key}
            onChange={(e) => setApi_Key(() => e.target.value)}
            className={style.input}
            type="text"
            placeholder={firstplaceholder}
          />
          <input
            value={Secret_Key}
            onChange={(e) => setSecret_Key(() => e.target.value)}
            className={style.input}
            type="text"
            placeholder={secondplaceholder}
          />
          {selectedBroker === "ANGEL" && (
            <>
              <input
                value={Password}
                onChange={(e) => setPassword(() => e.target.value)}
                className={style.input}
                type="text"
                placeholder={thirdplaceholder}
              />
              <input
                value={TOTP_Secret}
                onChange={(e) => setTOTP_Secret(() => e.target.value)}
                className={style.input}
                type="text"
                placeholder="TOTP Secret"
              />
              <input
                value={Client_ID}
                onChange={(e) => setClient_ID(() => e.target.value)}
                className={style.input}
                type="text"
                placeholder="Client ID"
              />
            </>
          )}
        </>
      )}
      <button onClick={connectbroker} className={style.submit_btn}>
        Connect
      </button>
    </div>
  );
};

export default ConnectBrokerForm;
