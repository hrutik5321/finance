import React, { useEffect } from "react";
import "../assets/styles/AdminPage.css";
import { Switch, Link, Route } from "react-router-dom";
import AdminHome from "../components/Admin/AdminHome";
import AdminAdExpences from "../components/Admin/AdminAdExpences";
import AdminRevenue from "../components/Admin/AdminRevenue";
import fire from "../firebase/fire";
import { useDispatch } from "react-redux";
import { getDynamicAds } from "../features/admin/adminDashboardSlice";
import AdminTableTest from "../components/Admin/AdminTableTest";

function AdminPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDynamicAds());
  }, []);

  const addFirebasedata = () => {
    fire
      .firestore()
      .collection("dynamicData")
      .doc("dynamicAds")
      .set({
        data: [
          {
            title: "AD SPENDING",
            expences: 12300,
            percent: 35,
            color: "#7b61ff",
            values: [59, 40, 28, 51, 42],
          },
          {
            title: "COGS",
            expences: 21400,
            percent: 35,
            color: "#ff5e2f",
            values: [59, 40, 28, 51, 42],
          },
          {
            title: "SHIPPING",
            expences: 9200,
            percent: 35,
            color: "#0bafff",
            values: [59, 40, 28, 51, 42],
          },
          {
            title: "SHOPIFY",
            expences: 2700,
            percent: 35,
            color: "#4fbf67",
            values: [59, 40, 28, 51, 42],
          },
          {
            title: "GST TAX",
            expences: 4500,
            percent: 35,
            color: "#fead36",
            values: [59, 40, 28, 51, 42],
          },
          {
            title: "MICS",
            expences: 23200,
            percent: 35,
            color: "#1ad492",
            values: [59, 40, 28, 51, 42],
          },
        ],
      })
      .then(() => alert("data added"))
      .catch(() => alert("nai zala"));
  };
  return (
    <div className="admin">
      <div className="sidebar__wrapper">
        <ul className="admin__sidebar">
          <li>
            <Link to="/admin">
              <span style={{ marginLeft: "15px", color: "black" }}>
                User Incomes
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/advertise">
              <span style={{ marginLeft: "15px", color: "black" }}>
                User Expences
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/adspend">
              <span style={{ marginLeft: "15px", color: "black" }}>
                User Revenues
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="admin__main">
        <Switch>
          <Route path="/admin/" exact>
            <AdminHome />
          </Route>
          <Route path="/admin/advertise" exact>
            <AdminAdExpences />
          </Route>
          <Route path="/admin/adspend" exact>
            <AdminRevenue />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminPage;
