import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Common/Sidebar";
import styles from "../Css/EditStrategy/EditStrategy.module.css";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editStrategies,
  getStrategies,
} from "../Redux/StrategiesReducer/action";

const EditStrategy = () => {
  const [state, setState] = useState({
    Name: null,
    Description: null,
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStrategies());
  }, []);

  function handleStateChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const { strategies } = useSelector((state) => state.strategiesReducer);
  
  useEffect(() => {
    if (strategies && strategies[id]) {
      const { Name, Description } = strategies[id];
      setState({
        Name,
        Description,
      });
    }
  }, [strategies, id]);


  const navigate = useNavigate();
  function handleEditSubmit() {
    dispatch(editStrategies(state));
    navigate("/strategies");
  }

  console.log(id);
  return (
    <div>
      <Sidebar />
      <div className={styles.edit_form}>
        <p className={styles.page_name}>Edit Strategy</p>
        <p className={styles.edit_title}>Strategy Name</p>
        <input
          className={`${styles.input_strategy} ${styles.non_editable}`}
          type="text"
          placeholder="Strategy Name"
          value={state.Name}
          readOnly
        />
        <p className={styles.edit_title}>Description</p>
        <textarea
          onChange={handleStateChange}
          value={state.Description}
          name="Description"
          className={styles.textarea}
          placeholder="Description"
        />
        <button className={styles.submit_btn} onClick={handleEditSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default EditStrategy;
