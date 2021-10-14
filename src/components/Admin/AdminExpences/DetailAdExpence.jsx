import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDynamicAds,
  updateUserAdExpences,
} from "../../../features/admin/adminDashboardSlice";

function DetailAdExpence() {
  const dispatch = useDispatch();
  const [field, setField] = useState("");
  const [value, setValue] = useState(null);
  const [index, setIndex] = useState(null);
  const { activeAdExpences, activeAdTitle, userAdexpences } = useSelector(
    (state) => state.admindashboard
  );
  const months = ["Dec 10", "Dec 18", "Dec 26", "Jan 3", "Jan 9"];
  useEffect(() => {}, []);
  const updatevalues = (e) => {
    e.preventDefault();
    setField("");
    setValue(0);
    const data = {
      color: activeAdTitle.color,
      expences: activeAdTitle.expences,
      percent: activeAdTitle.percent,
      title: activeAdTitle.title,
      index: index,
      value: value,
    };
    dispatch(updateUserAdExpences(data));
  };
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  useEffect(() => {
    setField("");
    setValue(0);
  }, [activeAdTitle]);
  return (
    <div style={{ marginLeft: "80px" }}>
      <h3>Ad Title = {activeAdTitle.title}</h3>
      <h4>{`Toatal ${activeAdTitle.title} expences =  ₹${kFormatter(
        activeAdTitle.expences
      )}`}</h4>
      <form>
        <input type="text" disabled={true} value={field} />
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
        />
        <button onClick={updatevalues}>Update</button>
      </form>
      <table>
        <tr>
          <th style={{ textAlign: "left" }}>Months</th>
          <th style={{ textAlign: "left" }}>series 1</th>
        </tr>
        {activeAdExpences.map((info, i) => {
          return (
            <tr>
              <td>{months[i]}</td>
              <td>{info}</td>
              <button
                onClick={() => {
                  setField(months[i]);
                  setValue(info);
                  setIndex(i);
                }}
              >
                update
              </button>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default DetailAdExpence;
