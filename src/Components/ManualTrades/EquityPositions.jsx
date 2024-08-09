import React, { useEffect, useState } from "react";
import styles from "../../Css/ManualTrade/EquityPositions.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEquityRunningTrades,
  InsertEquityTrade,
} from "../../Redux/TradesReducer/action";
import Loader from "../Common/Loader";
import ExitModal from "../Dashboard/ExitModel";
import { io } from "socket.io-client";

const EquityPositions = () => {
  const [exitModel, setExitModel] = useState(false);
  const [exitelem, setExitElem] = useState("");
  const [socket, setsocket] = useState("");
  const dispatch = useDispatch();
  const { EquityTrades, isLoading } = useSelector(
    (state) => state.TradesReducer
  );

  useEffect(() => {
    const socket = io("http://216.48.177.99:443", {
      transports: ["websocket"],
      cors: {
        origin: "*",
      },
    });
    socket.on("trades", (data) => {
      dispatch(GetEquityRunningTrades());
    });
    setsocket(() => socket);
    dispatch(GetEquityRunningTrades());
    return () => {
      socket.close();
    };
  }, []);

  const handleExitClick = (elem) => {
    setExitModel(() => true);
    setExitElem(() => elem);
  };

  const handleClick = (elem) => {
    setExitModel(() => false);
    try {
      let Type = "SELL";
      let data = { ...elem, Type };
      dispatch(InsertEquityTrade(data));
      socket.emit("trades", "new order");
    } catch (err) {
      alert("Something went wrong, please try again");
    }
  };

  return (
    <div className={styles.positions_container}>
      {exitModel && (
        <ExitModal
          setExitModel={setExitModel}
          exitClick={() => handleClick(exitelem)}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.positions_table}>
          <thead>
            <tr>
              <th>Stocks</th>
              <th>Recommended Price</th>
              <th>Current Price</th>
              <th>P&amp;L</th>
              <th>{""}</th>
            </tr>
          </thead>

          <>
            {EquityTrades.length > 0 &&
              EquityTrades.map((elem) => {
                return (
                  <tr>
                    <td>{elem.Symbol}</td>
                    <td>{elem.BuyPrice1}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>
                      <button
                        onClick={() => handleExitClick(elem)}
                        className={styles.exit_btn}
                      >
                        Exit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </>
        </table>
      )}
    </div>
  );
};

export default EquityPositions;
