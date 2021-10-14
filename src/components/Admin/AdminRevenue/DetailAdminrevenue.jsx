import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
    <div>
      <h4>{`Toatal ${activeBrand.title} expences =  ₹${kFormatter(
        activeBrand.expences
      )}`}</h4>
      <form style={{ padding: "4px 8px", marginTop: "10px" }}>
        <label>{field}</label>
        <input
          style={{
            padding: "6px 10px",
            outline: "none",
            border: "none",
            marginLeft: "20px",
            borderBottom: "1px solid black",
          }}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.valueAsNumber)}
        />
        <Button
          variant="outlined"
          style={{ marginLeft: "10px" }}
          onClick={updatevalues}
        >
          Update
        </Button>
      </form>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Months</TableCell>
              <TableCell align="center">Series 1</TableCell>
              <TableCell align="right">update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brandrevenues.map((info, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {months[i]}
                </TableCell>
                <TableCell align="center">{info}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setField(months[i]);
                      setValue(info);
                      setIndex(i);
                    }}
                  >
                    update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DetailAdminrevenue;

{
  /* <table>
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
</table> */
}
