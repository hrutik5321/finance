import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
    setOpen(true);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div style={{ marginTop: "20px", marginLeft: "50px" }}>
        <h3 style={{ width: "100%", textAlign: "center" }}>Total Revenues</h3>
        <div>
          <form>
            {/* <input type="text" disabled={true} value={totalrevenueTitle} /> */}
            <label style={{ marginRight: "30px", fontWeight: "bolder" }}>
              {totalrevenueTitle}
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
              value={totalrevenueCost}
              onChange={(e) => setTotalrevenuecost(e.target.valueAsNumber)}
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
                <TableCell>Months</TableCell>
                <TableCell align="center">Expence</TableCell>
                <TableCell align="right">update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalRevenueLoader ? (
                <h1>Loading</h1>
              ) : (
                titles.map((info, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {info}
                    </TableCell>
                    <TableCell align="center">{totalRevenue[i]}</TableCell>

                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setTotalrevenuetitle(info);
                          setTotalrevenuecost(totalRevenue[i]);
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
      <div>
        <h3 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Brand Revenues
        </h3>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ marginTop: "20px", marginLeft: "50px" }}>
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
                  {revenueLoader ? (
                    <h1>Loading</h1>
                  ) : (
                    userBranRevenue.map((data, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {data.title}
                        </TableCell>
                        <TableCell align="center">{data.expences}</TableCell>

                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              changeActiveAd(i);
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
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {activeBrand.title}
                </DialogTitle>
                <DialogContent>
                  <DetailAdminrevenue />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Done</Button>
                </DialogActions>
              </Dialog>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRevenue;

{
  /* <table>
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
                    {/* <DetailAdExpence title={data.title} data={data.values} /> */
}
//         </tr>
//       );
//     })
//   )}
// </table> */}
