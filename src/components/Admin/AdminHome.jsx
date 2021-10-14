import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
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
    <div
      className="admin__table"
      style={{ marginBottom: "200px", display: "flex", overflowX: "scroll" }}
    >
      <div style={{ padding: "0 10px", width: "50%" }}>
        <h3 style={{ marginBlock: "20px" }}>Income And Expences</h3>
        <div>
          <form>
            {/* <input type="text" disabled={true} value={totalrevenueTitle} /> */}
            <label style={{ marginRight: "30px", fontWeight: "bolder" }}>
              {month}
            </label>
            <input
              style={{
                maxWidth: "70px",
                padding: "5px 10px",
                fontSize: "16px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid black",
              }}
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.valueAsNumber)}
            />
            <input
              style={{
                maxWidth: "70px",
                padding: "5px 10px",
                fontSize: "16px",
                outline: "none",
                border: "none",
                marginLeft: "20px",
                borderBottom: "1px solid black",
              }}
              type="number"
              value={expence}
              onChange={(e) => setexpence(e.target.valueAsNumber)}
            />
            <Button
              variant="contained"
              onClick={updateInfos}
              style={{ marginLeft: "20px" }}
            >
              Update
            </Button>
          </form>
        </div>
        {/* Table */}
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Months</TableCell>
                <TableCell align="center">Income</TableCell>
                <TableCell align="right">Expence</TableCell>
                <TableCell align="right">update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomeExpenceLoader ? (
                <h1>Loading</h1>
              ) : (
                userincome.map((info, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {info.name}
                    </TableCell>
                    <TableCell align="center">{info.amount}</TableCell>
                    <TableCell align="right">{info.expence}</TableCell>

                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setMonth(info.name);
                          setIncome(info.amount);
                          setexpence(info.expence);
                        }}
                      >
                        update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ marginTop: "20px", marginLeft: "25px" }}>
        <h3 style={{ marginBlock: "20px" }}>Statictics</h3>
        <div>
          <form>
            {/* <input type="text" disabled={true} value={totalrevenueTitle} /> */}
            <label style={{ marginRight: "30px", fontWeight: "bolder" }}>
              {spendTitle}
            </label>
            <input
              style={{
                padding: "5px 10px",
                fontSize: "16px",
                outline: "none",
                border: "none",
                borderBottom: "1px solid black",
              }}
              type="number"
              value={changeCost}
              onChange={(e) => setChangeCost(e.target.valueAsNumber)}
            />
            <Button
              variant="contained"
              onClick={userSpends}
              style={{ marginLeft: "20px" }}
            >
              Update
            </Button>
          </form>
        </div>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Spend</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomeExpenceLoader ? (
                <h1>Loading</h1>
              ) : (
                titles.map((info, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {info}
                    </TableCell>
                    <TableCell align="center">{spendMoney[i]}</TableCell>

                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSpendTitle(info);
                          setChangeCost(spendMoney[i]);
                          setIndex(i);
                        }}
                      >
                        update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminHome;

{
  /* <table>
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
        </table> */
}
