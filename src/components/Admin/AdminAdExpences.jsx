import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDynamicAds } from "../../features/admin/adminDashboardSlice";
import DetailAdExpence from "./AdminExpences/DetailAdExpence";
import { updateActiveAd } from "../../features/admin/adminDashboardSlice";

function AdminAdExpences() {
  const dispatch = useDispatch();

  const { userAdexpences, userAdLoader } = useSelector(
    (state) => state.admindashboard
  );

  const changeActiveAd = (i) => {
    console.log(i);
    dispatch(updateActiveAd(i));
  };

  useEffect(() => {
    if (userAdexpences.length <= 0) {
      dispatch(getDynamicAds());
    }
  }, []);
  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{ marginTop: "80px" }}>
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Spend</th>
          </tr>
          {userAdLoader ? (
            <h1>loading</h1>
          ) : (
            userAdexpences.map((data, i) => {
              return (
                <tr>
                  <td>{data.title}</td>
                  <td>{data.expences}</td>
                  <button
                    onClick={() => {
                      changeActiveAd(i);
                    }}
                  >
                    update
                  </button>
                  {/* <DetailAdExpence title={data.title} data={data.values} /> */}
                </tr>
              );
            })
          )}
        </table>
      </div>
      <DetailAdExpence />
    </div>
  );
}

export default AdminAdExpences;
