import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDynamicAds } from "../../features/admin/adminDashboardSlice";
import DetailAdExpence from "./AdminExpences/DetailAdExpence";
import { updateActiveAd } from "../../features/admin/adminDashboardSlice";
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

function AdminAdExpences() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { userAdexpences, activeAdTitle } = useSelector(
    (state) => state.admindashboard
  );

  const changeActiveAd = (i) => {
    console.log(i);
    dispatch(updateActiveAd(i));
    setOpen(true);
  };

  useEffect(() => {
    if (userAdexpences.length <= 0) {
      dispatch(getDynamicAds());
    }
  }, []);
  return (
    <div>
      <div style={{ marginTop: "20px", marginLeft: "80px", width: "60%" }}>
        <h3 style={{ marginBottom: "20px" }}>User Ad Expences</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ad Title</TableCell>
                <TableCell align="center">Expences</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userAdexpences.map((data, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {data.title}
                  </TableCell>
                  <TableCell align="center">{data.expences}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => changeActiveAd(i)}
                    >
                      update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {activeAdTitle.title}
            </DialogTitle>
            <DialogContent>
              <DetailAdExpence />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Done</Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminAdExpences;
