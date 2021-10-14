import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DetailAdminrevenue from "./AdminRevenue/DetailAdminrevenue";
import {
  getUserTotalrevenue,
  getUserBrandrevenue,
} from "../../features/userIncomes/userIncomeSlice";
import {
  updateTotalrevenue,
  updateBrandrevenue,
} from "../../features/userIncomes/userIncomeSlice";
import { updateActiveRevenue } from "../../features/admin/adminRevenueSlice";
import { getBrandRevenues } from "../../features/admin/adminRevenueSlice";
import { Link } from "react-router-dom";

function AdminRevenue() {
  const dispatch = useDispatch();
  const [totalrevenueTitle, setTotalrevenuetitle] = useState("");
  const [totalrevenueCost, setTotalrevenuecost] = useState(null);
  const [brandrevenueTitle, setBrandrevenuetitle] = useState("");
  const [brandrevenueCost, setBrandrevenuecost] = useState(null);
  const [index, setIndex] = useState(null);
  const titles = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const brands = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  const { totalRevenue, totalRevenueLoader, brandRevenue, brandRevenueLoader } =
    useSelector((state) => state.userincomes);

  const { brandrevenues, activeBrand, userBranRevenue, revenueLoader } =
    useSelector((state) => state.adminrevenue);

  const userSpends = (e) => {
    e.preventDefault();

    if (totalrevenueTitle) {
      const data = {
        index: index,
        value: totalrevenueCost,
      };
      dispatch(updateTotalrevenue(data));
    }
    // if (brandrevenueTitle) {
    //   const data = {
    //     index: index,
    //     value: brandrevenueCost,
    //   };
    //   dispatch(updateBrandrevenue(data));
    // }
  };

  useEffect(() => {
    if (totalRevenue.length <= 0) {
      dispatch(getUserTotalrevenue());
    }
    if (userBranRevenue.length <= 0) {
      dispatch(getBrandRevenues());
    }
  }, []);
  const changeActiveAd = (i) => {
    console.log(i);
    dispatch(updateActiveRevenue(i));
  };

  // const addFirebaseValues = () => {
  //   fire
  //     .firestore()
  //     .collection("dynamicData")
  //     .doc("dynamicBrandRevenue")
  //     .set({
  //       data: [
  //         {
  //           color: "#7b61ff",
  //           title: "stripe",
  //           percent: 35,
  //           expences: 12300,
  //           values: [10, 15, 10, 20, 10, 15],
  //         },
  //         {
  //           color: "#ff5e2f",
  //           title: "Razerpay",
  //           percent: 35,
  //           expences: 21400,
  //           values: [10, 15, 10, 20, 10, 15],
  //         },
  //         {
  //           color: "#0bafff",
  //           title: "Cashfree",
  //           percent: 35,
  //           expences: 9200,
  //           values: [10, 15, 10, 20, 10, 15],
  //         },
  //         {
  //           color: "#4fbf67",
  //           title: "Paytm",
  //           percent: 35,
  //           expences: 2700,
  //           values: [10, 15, 10, 20, 10, 15],
  //         },
  //         {
  //           color: "#fead36",
  //           title: "Vimbus",
  //           percent: 35,
  //           expences: 4500,
  //           values: [10, 15, 10, 20, 10, 15],
  //         },
  //         {
  //           color: "#1ad492",
  //           title: "MICS",
  //           percent: 35,
  //           expences: 23200,
  //           values: [10, 15, 10, 20, 10, 15],
  //         },
  //       ],
  //     })
  //     .then(() => alert("data Added"))
  //     .catch(() => alert("Error to add"));
  // };
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <div>
          <form>
            <input type="text" disabled={true} value={totalrevenueTitle} />
            <input
              type="number"
              value={totalrevenueCost}
              onChange={(e) => setTotalrevenuecost(e.target.valueAsNumber)}
            />
            <button onClick={userSpends}>Update</button>
          </form>
        </div>
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Spend</th>
          </tr>
          {totalRevenueLoader ? (
            <h1>loading</h1>
          ) : (
            titles.map((info, i) => {
              return (
                <tr>
                  <td>{info}</td>
                  <td>{totalRevenue[i]}</td>
                  <button
                    onClick={() => {
                      setTotalrevenuetitle(info);
                      setTotalrevenuecost(totalRevenue[i]);
                      setIndex(i);
                    }}
                  >
                    update
                  </button>
                </tr>
              );
            })
          )}
        </table>
      </div>
      <hr style={{ marginTop: "20px" }} />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ marginTop: "80px" }}>
          <table>
            <tr>
              <th style={{ textAlign: "left" }}>Title</th>
              <th style={{ textAlign: "left" }}>Spend</th>
            </tr>
            {revenueLoader ? (
              <h1>loading</h1>
            ) : (
              userBranRevenue.map((data, i) => {
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
        <DetailAdminrevenue />
      </div>
    </div>
  );
}

export default AdminRevenue;
