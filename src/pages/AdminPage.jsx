import React from "react";
import "../assets/styles/AdminPage.css";
import { Switch, Link, Route } from "react-router-dom";
import AdminHome from "../components/Admin/AdminHome";
import AdminAdExpences from "../components/Admin/AdminAdExpences";
import AdminRevenue from "../components/Admin/AdminRevenue";

function AdminPage() {
  return (
    <div className="admin">
      <div className="sidebar__wrapper">
        <div>
          <h1>Add Dynamic</h1>
        </div>
        <ul className="admin__sidebar">
          <li>
            <Link to="/admin">
              <span style={{ marginLeft: "15px", color: "black" }}>
                Update Income
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/advertise">
              <span style={{ marginLeft: "15px", color: "black" }}>
                Update Advertise
              </span>
            </Link>
          </li>
          <li>
            <Link to="/admin/adspend">
              <span style={{ marginLeft: "15px", color: "black" }}>
                Update AdSpend
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
