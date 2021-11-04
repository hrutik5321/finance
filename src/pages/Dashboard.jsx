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
import { updateValues, updateLoader } from "../features/sheets/staticsSlice";
import { getDatabase, onValue, ref } from "@firebase/database";
import {
  updateReportsLoader,
  updateReports,
} from "../features/sheets/reportsSlice";

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
  const { loader, adSpend, COG, Shipping, tax, salary, misc, activeSheet } =
    useSelector((state) => state.statics);
  const [username, setUserName] = useState("");
  const [dayName, setDayName] = useState("");

  // TOTOAL REPORTS
  const {
    reportsLoader,
    totalRevenue,
    totalExpences,
    realtimeProfit,
    stock,
    incommingPay,
    estimatedProfit,
  } = useSelector((state) => state.reports);

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

  // const setDynamicData = () => {
  //   alert("hellow");
  // };
  const fetchSpendedMoney = () => {
    if (spendMoney.length <= 0) {
      dispatch(getUserSpendMoney());
    }
  };

  const databaseValues = async () => {
    dispatch(updateLoader());
    const db = getDatabase();
    const sheetRef = ref(
      db,
      `${activeSheet === 1 ? "masterSheet" : "chieldSheet"}`
    );
    await onValue(sheetRef, (snapshot) => {
      dispatch(updateValues(snapshot.val()));
    });
  };

  const databaseProfits = async () => {
    dispatch(updateReportsLoader());
    const db = getDatabase();
    const sheetRef = ref(
      db,
      `${activeSheet === 1 ? "totalProfits1" : "totalProfits2"}`
    );
    await onValue(sheetRef, (snapshot) => {
      // console.log(snapshot.val()[1]);
      dispatch(updateReports(snapshot.val()[1]));
      console.log(snapshot.val()[1].EstimatedProfit);
    });
  };

  useEffect(() => {
    databaseValues();
    databaseProfits();
  }, [activeSheet]);

  // const setDatas = () => {
  //   fire
  //     .firestore()
  //     .collection("dynamicData")
  //     .doc("dynamicAds")
  //     .set({
  //       data: [
  //         {
  //           color: "#7b61ff",
  //           expences: 12300,
  //           percent: 35,
  //           title: "AD SPENDING",
  //           values: [60, 40, 28, 52, 42],
  //         },
  //         {
  //           color: "#ff5e2f",
  //           expences: 21400,
  //           percent: 35,
  //           title: "COGS",
  //           values: [60, 40, 28, 52, 42],
  //         },
  //         {
  //           color: "#1ad492",
  //           expences: 23200,
  //           percent: 35,
  //           title: "MICS",
  //           values: [60, 40, 28, 52, 42],
  //         },
  //         {
  //           color: "#0bafff",
  //           expences: 9200,
  //           percent: 35,
  //           title: "SHIPPING",
  //           values: [60, 40, 28, 52, 42],
  //         },
  //         {
  //           color: "#4fbf67",
  //           expences: 2700,
  //           percent: 35,
  //           title: "SHOPIFY",
  //           values: [60, 40, 28, 52, 42],
  //         },
  //         {
  //           color: "#fead36",
  //           expences: 4500,
  //           percent: 35,
  //           title: "GST TAX",
  //           values: [60, 40, 28, 52, 42],
  //         },
  //       ],
  //     })
  //     .then(() => alert("data added success"));
  // };

  const getUsername = () => {
    const name = localStorage.getItem("username");
    setUserName(name);
  };
  const [year, setYear] = useState(null);
  const [curMonth, setCurMonth] = useState("");
  const getDayName = () => {
    var a = new Date();
    var days = new Array(7);
    days[0] = "Sunday";
    days[1] = "Monday";
    days[2] = "Tuesday";
    days[3] = "Wednesday";
    days[4] = "Thursday";
    days[5] = "Friday";
    days[6] = "Saturday";
    var r = days[a.getDay()];
    setDayName(r); // 2009-11-10
    const month = a.toLocaleString("default", { month: "long" });
    setCurMonth(month);
    const y = a.getFullYear();
    setYear(y);
  };
  const [curDate, setCurDate] = useState(null);
  const getCurrentDate = () => {
    var a = new Date();
    var r = a.getDate();
    setCurDate(r);
  };

  useEffect(() => {
    if (income.length <= 0 || spendMoney.length <= 0 || startUpdate) {
      fetchIncomeUser();
      fetchSpendedMoney();
    }
    getUsername();
    getDayName();
    getCurrentDate();
  }, [startUpdate, spendMoney, expences, income]);

  const donut = {
    options: {
      labels: ["AD Spend", "COG", "Shipping", "Tax", "Salary", "MISC"],
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
    series: [adSpend, COG, 0, 0, 0, misc],
  };

  return (
    <div className="dashboard">
      <div className="dashboard__welcome flex">
        <div className="dashboard__welcome--left">
          <h1 onClick={getDayName}>
            Good afternoon , {username ? username : ""}
          </h1>
          <p>
            {dayName}, {curDate} {curMonth} {year}.&nbsp;
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
              ₹{totalRevenue}
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
              ₹{totalExpences}
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
                STOCK
              </p>
              <img src={PlusIcon} alt="" />
            </section>
            <Box
              sx={{ color: "text.primary", fontSize: 30, fontWeight: "500" }}
            >
              ₹{stock}
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
              ₹{estimatedProfit}
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
          {loader ? (
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
