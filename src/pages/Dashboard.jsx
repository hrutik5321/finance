import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import { Box } from "@mui/system";
import "../assets/styles/Dashboard.css";
import CircularProgress from "@mui/material/CircularProgress";
import WalletIcon from "../assets/icons/wallet-add.svg";
import DollarIcon from "../assets/icons/dollar-circle.svg";
import BankIcon from "../assets/icons/bankcard.svg";
import CardIcon from "../assets/icons/card-send.svg";
import PlusIcon from "../assets/icons/plus-circle.svg";
import Divider from "../assets/icons/divider.svg";
import Chart from "react-apexcharts";
import fire from "../firebase/fire";
import { useDispatch, useSelector } from "react-redux";
import { changeUpdateCall } from "../features/admin/adminDashboardSlice";
import {
  getUserSpendMoney,
  getUserIcome,
} from "../features/userIncomes/userIncomeSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const {
    moneyLoader,
    spendMoney,
    incomeExpenceLoader,
    income,
    expences,
    startUpdate,
    months,
  } = useSelector((state) => state.userincomes);
  const { isUpdated } = useSelector((state) => state.admindashboard);

  const data = {
    options: {
      theme: {
        mode: "dark",
      },
      title: {
        text: "Income Vs Expences",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          offsetY: 40,
        },
      },
      chart: {
        id: "realtime",
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        background: "#35373D",
        foreColor: "#fff",
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -40,
        offsetX: -5,
        markers: {
          width: 10,
          height: 10,
          offsetX: -3,
          offsetY: 1.1,
        },
      },
      xaxis: {
        categories: months,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#84818A",
          },
        },
      },
      yaxis: {
        min: 0,
        max: 40,
        forceNiceScale: true,
        labels: {
          style: {
            colors: "#84818A",
          },
        },
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#5542F6", "#00A5FF"],
      grid: {
        borderColor: "#84818A",
        strokeDashArray: 2,
      },
    },
    series: [
      {
        name: "Income",
        data: income,
      },
      {
        name: "Expences",
        data: expences,
      },
    ],
  };

  const fetchIncomeUser = () => {
    if (income.length <= 0) {
      dispatch(getUserIcome());
    }
  };

  const setDynamicData = () => {
    alert("hellow");
  };
  const fetchSpendedMoney = () => {
    if (spendMoney.length <= 0) {
      dispatch(getUserSpendMoney());
    }
  };

  useEffect(() => {
    if (income.length <= 0 || spendMoney.length <= 0 || startUpdate) {
      fetchIncomeUser();
      fetchSpendedMoney();
    }
  }, [startUpdate]);

  const donut = {
    options: {
      labels: ["AD Spend", "COG", "Shipping", "Tax", "Salary", "Domain"],
      plotOptions: {
        pie: {
          donut: {
            makers: {
              shape: "circle",
              radius: 50,
            },
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
              },
              total: {
                show: true,
                showAlways: false,
                label: "Total",
                fontWeight: 500,
                color: "#fff",
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      chart: {
        id: "donut",
        background: "#35373D",
        foreColor: "#fff",
      },
      legend: {
        markers: {
          width: 10,
          height: 10,
          offsetX: -3,
          offsetY: 1.1,
        },
      },
    },
    series: spendMoney,
  };

  return (
    <div className="dashboard">
      <div className="dashboard__welcome flex">
        <div className="dashboard__welcome--left">
          <h1 onClick={setDynamicData}>Good afternoon , Kushagrah</h1>
          <p>
            Friday, 08 September 2021.&nbsp;
            <span>
              Today you have new notification. See you monthly
              <Link to="/"> Report</Link>
            </span>
          </p>
        </div>
        <div className="dashboard__welcome--right roundBox flex">
          <p style={{ fontSize: ".85em" }}>
            <span>Show stats:</span> Monthly
          </p>
          <ArrowDropDownRoundedIcon />
        </div>
      </div>
      <div className="dashboard__card roundBox flex">
        <div className="dashboardCard__content flex">
          <img
            src={WalletIcon}
            alt=""
            style={{
              background: "#0BAFFF40",
              borderRadius: "50%",
              padding: "5px",
              marginRight: "10px",
              marginTop: "-3px",
            }}
          />
          <div>
            <section className="flex">
              <p style={{ color: "#0BAFFF", fontSize: 12, fontWeight: "bold" }}>
                TOTAL REVENUE
              </p>
              <img src={PlusIcon} alt="" />
            </section>
            <Box
              sx={{ color: "text.primary", fontSize: 30, fontWeight: "500" }}
            >
              ₹25.72K
            </Box>
            <TrendingUpIcon
              sx={{
                color: "#4FBF67",
                fontSize: 20,
                verticalAlign: "sub",
                background: "#4FBF6730",
                borderRadius: "50%",
                padding: "4px",
              }}
            />
            <Box
              sx={{
                color: "#4FBF67",
                display: "inline",
                fontWeight: "medium",
                mx: 0.5,
              }}
            >
              18.77%
            </Box>
            <Box
              sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}
            >
              +₹3.2K this week
            </Box>
          </div>
        </div>
        <img src={Divider} alt="" />
        <div className="dashboardCard__content flex">
          <img
            src={CardIcon}
            alt=""
            style={{
              background: "#F79E1B40",
              borderRadius: "50%",
              padding: "5px",
              marginRight: "10px",
              marginTop: "-3px",
            }}
          />
          <div>
            <section className="flex">
              <p style={{ color: "#F79E1B", fontSize: 12, fontWeight: "bold" }}>
                TOTAL EXPENCES
              </p>
              <img src={PlusIcon} alt="" />
            </section>
            <Box
              sx={{ color: "text.primary", fontSize: 30, fontWeight: "500" }}
            >
              ₹12.6K
            </Box>

            <Box
              sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}
            >
              +₹2.1K this week
            </Box>
          </div>
        </div>
        <img src={Divider} alt="" />
        <div className="dashboardCard__content flex">
          <img
            src={BankIcon}
            alt=""
            style={{
              background: "#FF5E2F40",
              borderRadius: "50%",
              padding: "5px",
              marginRight: "10px",
              marginTop: "-3px",
            }}
          />
          <div>
            <section className="flex">
              <p style={{ color: "#FF5E2F", fontSize: 12, fontWeight: "bold" }}>
                REAL TIME PROFIT
              </p>
              <img src={PlusIcon} alt="" />
            </section>
            <Box
              sx={{ color: "text.primary", fontSize: 30, fontWeight: "500" }}
            >
              ₹8.92K
            </Box>
            <TrendingDownIcon
              sx={{
                color: "#FF5E2F",
                fontSize: 20,
                verticalAlign: "sub",
                background: "#FF5E2F30",
                borderRadius: "50%",
                padding: "4px",
              }}
            />
            <Box
              sx={{
                color: "#FF5E2F",
                display: "inline",
                fontWeight: "medium",
                mx: 0.5,
              }}
            >
              2.3%
            </Box>
            <Box
              sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}
            >
              +₹562 this week
            </Box>
          </div>
        </div>
        <img src={Divider} alt="" />
        <div className="dashboardCard__content flex">
          <img
            src={DollarIcon}
            alt=""
            style={{
              background: "#4FBF6740",
              borderRadius: "50%",
              padding: "5px",
              marginRight: "10px",
              marginTop: "-3px",
            }}
          />
          <div>
            <section className="flex">
              <p style={{ color: "#4FBF67", fontSize: 12, fontWeight: "bold" }}>
                ESTIMATED PROFIT
              </p>
              <img src={PlusIcon} alt="" />
            </section>
            <Box
              sx={{ color: "text.primary", fontSize: 30, fontWeight: "500" }}
            >
              ₹45.7K
            </Box>
            <TrendingUpIcon
              sx={{
                color: "#4FBF67",
                fontSize: 20,
                verticalAlign: "sub",
                background: "#4FBF6730",
                borderRadius: "50%",
                padding: "4px",
              }}
            />
            <Box
              sx={{
                color: "#4FBF67",
                display: "inline",
                fontWeight: "medium",
                mx: 0.5,
              }}
            >
              18.4%
            </Box>
          </div>
        </div>
      </div>
      <div className="dashboard__chart flex">
        <div className="chart__line roundBox flex">
          {incomeExpenceLoader ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            <Chart
              options={data.options}
              series={data.series}
              type="line"
              width="475"
            />
          )}
        </div>
        <div className="chart__donut roundBox flex">
          <div className="chart__donut--top flex ">
            <span>
              <h3 style={{ color: "white" }}>Statics</h3>
              <span style={{ fontSize: ".9em" }} className="flex">
                <AccessTimeIcon
                  sx={{
                    fontSize: ".9em",
                    color: "#84818A",
                    marginRight: "5px",
                  }}
                />
                Updated Saturday, Sep 03, 2021
              </span>
            </span>
            <div className="roundBox flex">
              <p style={{ fontSize: ".8em", fontWeight: "500" }}>Expences</p>
              <KeyboardArrowDownIcon sx={{ fontSize: ".9em" }} />
            </div>
          </div>
          {moneyLoader ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            <Chart
              options={donut.options}
              series={donut.series}
              type="donut"
              width="350"
            />
          )}
        </div>
      </div>
      <section className="flex">
        <div className="dashboard__notes roundBox">
          <div className="dashboard__notes--header flex">
            <p>Recent Notes</p>
            <Link to="/">View All</Link>
          </div>
          <div className="dashboard__notes--content flex">
            <span style={{ background: "#0BAFFF" }}> </span>
            <section>
              <p style={{ fontSize: "1em" }}>Need to Check product model</p>
              <p style={{ color: "#84818A", fontSize: ".8em" }}>
                by Kushagrah
                <span>•</span>
                10 min ago
              </p>
            </section>
          </div>
          <div className="dashboard__notes--content flex">
            <span style={{ background: "#F79E1B" }}> </span>
            <section>
              <p style={{ fontSize: "1em" }}>
                Update feedback from new client #2497 generate new link
              </p>
              <p style={{ color: "#84818A", fontSize: ".8em" }}>
                by Nirob
                <span>•</span>
                3h ago
              </p>
            </section>
          </div>
          <div className="dashboard__notes--content flex">
            <span style={{ background: "#0BAFFF" }}> </span>
            <section>
              <p style={{ fontSize: "1em" }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium
              </p>
              <p style={{ color: "#84818A", fontSize: ".8em" }}>
                by Kushagrah
                <span>•</span>
                Yesterday
              </p>
            </section>
          </div>
        </div>
        <div className="dashboard__transaction roundBox">
          <p> Recent Transaction </p>
          <div className="dashboard__transaction--header flex roundBox">
            <p
              style={{
                flex: ".5",
              }}
            >
              PAYMENT NUMBER
            </p>
            <p
              style={{
                flex: ".2",
              }}
            >
              AMOUNT
            </p>
            <p>STATUS</p>
          </div>
          <div className="dashboard__transaction--content flex">
            <section className="flex">
              <CheckIcon
                sx={{
                  color: "#4FBF67",
                  fontSize: 28,
                  verticalAlign: "sub",
                  background: "#4FBF6730",
                  borderRadius: "50%",
                  padding: "7px",
                  marginRight: "10px",
                }}
              />
              <span>
                <h5>
                  Payment from&nbsp;
                  <span style={{ color: "#0052CC" }}>#10023</span>
                </h5>
                <span style={{ fontSize: ".8em", color: "#84818A" }}>
                  Today 10:30 AM
                </span>
              </span>
            </section>
            <p style={{ fontSize: ".9em" }}>+ $650.00</p>
            <span
              style={{
                color: "#4FBF67",
                background: "#4FBF6730",
                padding: "3px 7px",
                fontSize: ".8em",
                borderRadius: "10px",
              }}
            >
              Completed
            </span>
          </div>
          <div className="dashboard__transaction--content flex">
            <section className="flex">
              <SubdirectoryArrowLeftIcon
                sx={{
                  color: "#FF991F",
                  fontSize: 28,
                  verticalAlign: "sub",
                  background: "#FF991F30",
                  borderRadius: "50%",
                  padding: "7px",
                  marginRight: "10px",
                }}
              />
              <span>
                <h5>
                  Process refund to &nbsp;
                  <span style={{ color: "#0052CC" }}>#10024</span>
                </h5>
                <span style={{ fontSize: ".8em", color: "#84818A" }}>
                  Today 10:30 AM
                </span>
              </span>
            </section>
            <p style={{ fontSize: ".9em" }}>- $250.00</p>
            <span
              style={{
                color: "#4FBF67",
                background: "#4FBF6730",
                padding: "3px 7px",
                fontSize: ".8em",
                borderRadius: "10px",
              }}
            >
              Completed
            </span>
          </div>
          <div className="dashboard__transaction--content flex">
            <section className="flex">
              <CloseIcon
                sx={{
                  color: "#DE350B",
                  fontSize: 28,
                  verticalAlign: "sub",
                  background: "#DE350B30",
                  borderRadius: "50%",
                  padding: "7px",
                  marginRight: "10px",
                }}
              />
              <span>
                <h5>
                  Payment failed from&nbsp;
                  <span style={{ color: "#0052CC" }}>#10025</span>
                </h5>
                <span style={{ fontSize: ".8em", color: "#84818A" }}>
                  Today 10:30 AM
                </span>
              </span>
            </section>
            <p style={{ fontSize: ".9em" }}>+ $128.00</p>
            <span
              style={{
                color: "#DE350B",
                background: "#DE350B30",
                padding: "3px 7px",
                fontSize: ".8em",
                borderRadius: "10px",
              }}
            >
              Declined
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
