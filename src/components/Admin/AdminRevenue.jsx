import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserTotalrevenue,
  getUserBrandrevenue,
} from "../../features/userIncomes/userIncomeSlice";
import {
  updateTotalrevenue,
  updateBrandrevenue,
} from "../../features/userIncomes/userIncomeSlice";
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

  const userSpends = (e) => {
    e.preventDefault();

    if (totalrevenueTitle) {
      const data = {
        index: index,
        value: totalrevenueCost,
      };
      dispatch(updateTotalrevenue(data));
    }
    if (brandrevenueTitle) {
      const data = {
        index: index,
        value: brandrevenueCost,
      };
      dispatch(updateBrandrevenue(data));
    }
  };

  useEffect(() => {
    if (totalRevenue.length <= 0) {
      dispatch(getUserTotalrevenue());
    }
    if (brandRevenue.length <= 0) {
      dispatch(getUserBrandrevenue());
    }
  }, []);
  return (
    <div>
      <div style={{ marginTop: "80px" }}>
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
        <Link to="/dashboard/revenue">
          <h3>Revenues</h3>
        </Link>
      </div>
      <div style={{ marginTop: "80px" }}>
        <div>
          <form>
            <input type="text" disabled={true} value={brandrevenueTitle} />
            <input
              type="number"
              value={brandrevenueCost}
              onChange={(e) => setBrandrevenuecost(e.target.valueAsNumber)}
            />
            <button onClick={userSpends}>Update</button>
          </form>
        </div>
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Spend</th>
          </tr>
          {brandRevenueLoader ? (
            <h1>loading</h1>
          ) : (
            brands.map((info, i) => {
              return (
                <tr>
                  <td>{info}</td>
                  <td>{brandRevenue[i]}</td>
                  <button
                    onClick={() => {
                      setBrandrevenuetitle(info);
                      setBrandrevenuecost(brandRevenue[i]);
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
        <Link to="/dashboard/revenue">
          <h3>Revenues</h3>
        </Link>
      </div>
    </div>
  );
}

export default AdminRevenue;
