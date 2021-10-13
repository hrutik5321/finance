import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserIcome } from "../../features/userIncomes/userIncomeSlice";
import fire from "../../firebase/fire";
import { adminUserIcome } from "../../features/admin/adminDashboardSlice";
import {
  updateIncomevalues,
  updateUserSpend,
} from "../../features/admin/adminDashboardSlice";
import {
  getUserSpendMoney,
  updateSpendMoney,
} from "../../features/userIncomes/userIncomeSlice";
import { Link } from "react-router-dom";

function AdminHome() {
  const dispatch = useDispatch();
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState(null);
  const [expence, setexpence] = useState(null);
  const [spendTitle, setSpendTitle] = useState("");
  const [changeCost, setChangeCost] = useState(null);
  const [index, setIndex] = useState(null);

  const { userincome, incomeExpenceLoader, isUpdated } = useSelector(
    (state) => state.admindashboard
  );

  const titles = ["AD Spend", "COG", "Shipping", "Tax", "Salary", "Domain"];
  const { spendMoney } = useSelector((state) => state.userincomes);

  const updateInfos = (e) => {
    e.preventDefault();
    const data = {
      name: month,
      amount: income,
      expence: expence,
    };
    dispatch(updateIncomevalues(data));
    console.log(data);
  };

  const userSpends = (e) => {
    e.preventDefault();
    const data = {
      index: index,
      value: changeCost,
    };
    dispatch(updateSpendMoney(data));
    // dispatch(updateUserSpend(data));
  };

  useEffect(() => {
    if (userincome.length <= 0) {
      dispatch(adminUserIcome());
    }
    if (spendMoney.length <= 0) {
      dispatch(getUserSpendMoney());
    }
  }, []);
  return (
    <div className="admin__table" style={{ marginBottom: "200px" }}>
      <div>
        <div>
          <form>
            <input type="text" disabled={true} value={month} />
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.valueAsNumber)}
            />
            <input
              type="number"
              value={expence}
              onChange={(e) => setexpence(e.target.valueAsNumber)}
            />
            <button onClick={updateInfos}>Update</button>
          </form>
        </div>
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Months</th>
            <th style={{ textAlign: "left" }}>Income</th>
            <th style={{ textAlign: "left" }}>Expences</th>
          </tr>
          {incomeExpenceLoader ? (
            <h1>loading</h1>
          ) : (
            userincome.map((info) => {
              return (
                <tr>
                  <td>{info.name}</td>
                  <td>{info.amount}</td>
                  <td>{info.expence}</td>
                  <button
                    onClick={() => {
                      setMonth(info.name);
                      setIncome(info.amount);
                      setexpence(info.expence);
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
      <div style={{ marginTop: "80px" }}>
        <div>
          <form>
            <input type="text" disabled={true} value={spendTitle} />
            <input
              type="number"
              value={changeCost}
              onChange={(e) => setChangeCost(e.target.valueAsNumber)}
            />
            <button onClick={userSpends}>Update</button>
          </form>
        </div>
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Spend</th>
          </tr>
          {incomeExpenceLoader ? (
            <h1>loading</h1>
          ) : (
            titles.map((info, i) => {
              return (
                <tr>
                  <td>{info}</td>
                  <td>{spendMoney[i]}</td>
                  <button
                    onClick={() => {
                      setSpendTitle(info);
                      setChangeCost(spendMoney[i]);
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
      <Link to="/dashboard">
        <h3>Dashboard</h3>
      </Link>
    </div>
  );
}

export default AdminHome;
