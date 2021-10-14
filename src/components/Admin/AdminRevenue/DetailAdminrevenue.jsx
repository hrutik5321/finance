import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDynamicAds,
  updateUserAdExpences,
} from "../../../features/admin/adminDashboardSlice";
import { updateUserBrandRevenues } from "../../../features/admin/adminRevenueSlice";

function DetailAdminrevenue() {
  const dispatch = useDispatch();
  const [field, setField] = useState("");
  const [value, setValue] = useState(null);
  const [index, setIndex] = useState(null);
  // const { activeAdExpences, activeAdTitle, userAdexpences } = useSelector(
  //   (state) => state.admindashboard
  // );
  const { brandrevenues, activeBrand, userBranRevenue } = useSelector(
    (state) => state.adminrevenue
  );
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  useEffect(() => {}, []);
  const updatevalues = (e) => {
    e.preventDefault();
    setField("");
    setValue(0);
    const data = {
      color: activeBrand.color,
      expences: activeBrand.expences,
      percent: activeBrand.percent,
      title: activeBrand.title,
      index: index,
      value: value,
    };
    dispatch(updateUserBrandRevenues(data));
  };
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  useEffect(() => {
    setField("");
    setValue(0);
  }, [activeBrand]);
  return (
    <div style={{ marginLeft: "80px" }}>
      <h3>Brand Name = {activeBrand.title}</h3>
      <h4>{`Toatal ${activeBrand.title} expences =  ₹${kFormatter(
        activeBrand.expences
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
        {brandrevenues.map((info, i) => {
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

export default DetailAdminrevenue;
