import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/system/Box";
import "../assets/styles/Dashboard.css";
import "../assets/styles/Report.css";
import WalletIconG from "../assets/icons/wallet-green.svg";
import WalletIconY from "../assets/icons/wallet-yellow.svg";
// import DollarIcon from "../assets/icons/dollar-circle.svg";
// import BankIcon from "../assets/icons/bankcard.svg";
// import CardIcon from "../assets/icons/card-send.svg";
import PlusIcon from "../assets/icons/export.svg";
import StockIcon from "../assets/icons/home-trend-up.svg";
import IncomingIcon from "../assets/icons/receive-square.svg";
import AdIcon from "../assets/icons/ad-green.svg";
import Divider from "../assets/icons/divider.svg";
import ArrowUpIcon from "../assets/icons/ic_up.svg";
import ArrowDownIcon from "../assets/icons/ic_down.svg";
import Chart from "react-apexcharts";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AchieveIcon from "../assets/icons/achieve.svg";
import SuccessIcon from "../assets/icons/success.svg";
import WarningIcon from "../assets/icons/warning.svg";
import FlagIcon from "../assets/icons/flag.svg";
import IncomeIcon from "../assets/icons/income.svg";
import ProfitIcon from "../assets/icons/profit.svg";
import YearlyIcon from "../assets/icons/yearly.svg";
import DownIcon from "../assets/icons/download_down.svg";
import { Link } from "react-router-dom";

function Report() {
  const data = {
    options: {
      theme: {
        mode: "dark",
      },
      series: [
        {
          name: "series1",
          data: [15, 18, 16, 14, 17, 20, 16, 12, 20],
        },
      ],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        borderColor: "#84818A",
        strokeDashArray: 2,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          left: 20,
        },
      },
      chart: {
        id: "area-chart",
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        background: "#35373D",
        foreColor: "#fff",
      },
      xaxis: {
        type: "date",
        categories: [
          "Dec 10",
          "Dec 14",
          "Dec 18",
          "Dec 22",
          "Dec 26",
          "Dec 30",
          "Jan 3",
          "Jan 7",
          "Jan 8",
        ],
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
        show: false,
      },
      colors: ["#7B61FF"],
    },
  };
  return (
    <div className="report">
      <div className="report__header">
        <div className="report__header--left flex">
          <div
            className="reportCard__content flex roundBox"
            style={{ alignItems: "center" }}
          >
            <img
              src={WalletIconG}
              alt=""
              style={{
                background: "#4FBF6740",
                borderRadius: "50%",
                padding: "5px",
                marginRight: "10px",
                marginTop: "-66px",
              }}
            />
            <div>
              <section className="flex">
                <p
                  style={{ color: "#4FBF67", fontSize: 12, fontWeight: "bold" }}
                >
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
                6.8%
              </Box>
            </div>
          </div>
          <div
            className="reportCard__content flex roundBox"
            style={{ alignItems: "center" }}
          >
            <img
              src={WalletIconY}
              alt=""
              style={{
                background: "#F79E1B40",
                borderRadius: "50%",
                padding: "5px",
                marginRight: "10px",
                marginTop: "-66px",
              }}
            />
            <div>
              <section className="flex">
                <p
                  style={{ color: "#F79E1B", fontSize: 12, fontWeight: "bold" }}
                >
                  TOTAL EXPENCES
                </p>
                <img src={PlusIcon} alt="" />
              </section>
              <Box
                sx={{ color: "text.primary", fontSize: 30, fontWeight: "500" }}
              >
                ₹12.6K
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
                1.3%
              </Box>
            </div>
          </div>
        </div>
        <div className="report__header--right flex">
          <div className="report__card roundBox flex">
            <div className="reportCard__content flex">
              <img
                src={AdIcon}
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
                  <p
                    style={{
                      color: "#4FBF67",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    ADS CREDIT
                  </p>
                </section>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 30,
                    fontWeight: "500",
                  }}
                >
                  ₹48.6K
                </Box>
              </div>
            </div>
            <img src={Divider} alt="" />
            <div className="reportCard__content flex">
              <img
                src={StockIcon}
                alt=""
                style={{
                  background: "#F8562640",
                  borderRadius: "50%",
                  padding: "5px",
                  marginRight: "10px",
                  marginTop: "-3px",
                }}
              />
              <div>
                <section className="flex">
                  <p
                    style={{
                      color: "#F85626",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    REAL TIME PROFIT
                  </p>
                </section>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 30,
                    fontWeight: "500",
                  }}
                >
                  ₹8.92K
                </Box>
              </div>
            </div>
            <img src={Divider} alt="" />
            <div className="reportCard__content flex">
              <img
                src={IncomingIcon}
                alt=""
                style={{
                  background: "#7B61FF40",
                  borderRadius: "50%",
                  padding: "5px",
                  marginRight: "10px",
                  marginTop: "-3px",
                }}
              />
              <div>
                <section className="flex" style={{ minWidth: "0" }}>
                  <p
                    style={{
                      color: "#7B61FF",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    INCOMING PAY
                  </p>
                </section>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: 30,
                    fontWeight: "500",
                  }}
                >
                  ₹45.7K
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="report__content flex">
        <div className="report__content--left roundBox flex">
          <section className="flex">
            <span className="flex">
              <p style={{ color: "#fff6", fontSize: ".85em" }}>
                Real Time Profit
              </p>
              <h1>₹156K</h1>
            </span>
            <span className="flex">
              <div
                className="roundBox flex"
                style={{ background: "#fff1", padding: "4px 10px" }}
              >
                <p style={{ fontSize: ".85em" }}>Monthly</p>
                <ArrowDropDownRoundedIcon sx={{ color: "#fff3" }} />
              </div>
              <span className="flex">
                <img src={ArrowUpIcon} alt="" />
                <p>2.9%</p>
              </span>
            </span>
          </section>
          <Chart
            options={data.options}
            series={data.options.series}
            type="area"
            width="490px"
            height="145px"
          />
        </div>
        <div className="report__content--right roundBox flex">
          <section className="flex">
            <span className="flex">
              <p style={{ color: "#fff6", fontSize: ".85em" }}>
                Estimated Profit
              </p>
              <h1>₹653.5K</h1>
            </span>
            <span className="flex">
              <div
                className="roundBox flex"
                style={{ background: "#fff1", padding: "4px 10px" }}
              >
                <p style={{ fontSize: ".85em" }}>Monthly</p>
                <ArrowDropDownRoundedIcon sx={{ color: "#fff3" }} />
              </div>
              <span className="flex">
                <img src={ArrowDownIcon} alt="" />
                <p>19.9%</p>
              </span>
            </span>
          </section>
          <Chart
            options={data.options}
            series={data.options.series}
            type="area"
            width="490px"
            height="145px"
          />
        </div>
      </div>
      <section className="roundBox flex">
        <div className="left flex">
          <img src={AchieveIcon} alt="" />
          <span>
            <h3>Your Goal</h3>
            <p>
              <img src={FlagIcon} alt="" />
              Creating 10 New Opportunities
            </p>
          </span>
        </div>
        <div className="flex right">
          <section className="flex">
            <p>Income Goal</p>
            <span className="flex">
              ₹100,000
              <img src={SuccessIcon} alt="" />
            </span>
          </section>
          <section className="flex">
            <p>Profit Goal</p>
            <span className="flex">
              ₹150,000
              <img src={SuccessIcon} alt="" />
            </span>
          </section>
          <section className="flex">
            <p>Expences Limit</p>
            <span className="flex">
              ₹80,000
              <img src={SuccessIcon} alt="" />
            </span>
          </section>
          <section className="flex">
            <p>Salary Limit</p>
            <span className="flex">
              ₹15,000
              <img src={WarningIcon} alt="" />
            </span>
          </section>
        </div>
      </section>
      <div className="report__footer">
        <div className="report__goal roundBox">
          <div className="flex">
            <span className="flex left">
              <h2>Goal Progress</h2>
              <p>
                You have 5 Goal Set this year. <Link to="/">Add More</Link>
              </p>
            </span>
            <span className="flex right">
              <h1>50%</h1>
              <p>Overall Progress</p>
            </span>
          </div>
          <div className="report__goal--content flex ">
            <section className="flex">
              <div className="flex">
                <div className="flex">
                  <img src={IncomeIcon} alt="" />
                  <p style={{ color: "#6C5DD3" }}>Income Goal</p>
                </div>
                <h3>₹100K</h3>
              </div>
              <h1>72k</h1>
              <div className="flex">
                <div className="progress__bar">
                  <span style={{ width: "65%", background: "#6C5DD3" }}></span>
                </div>
                <p>65%</p>
              </div>
            </section>
            <section className="flex">
              <div className="flex">
                <div className="flex">
                  <img src={ProfitIcon} alt="" />
                  <p style={{ color: "#FFA2C0" }}>Profit Goal</p>
                </div>
                <h3>₹50K</h3>
              </div>
              <h1>36k</h1>
              <div className="flex">
                <div className="progress__bar">
                  <span style={{ width: "65%", background: "#FFA2C0" }}></span>
                </div>
                <p>87% </p>
              </div>
            </section>{" "}
            <section className="flex">
              <div className="flex">
                <div className="flex">
                  <img src={YearlyIcon} alt="" />
                  <p style={{ color: "#FF9A7B" }}>Yearly Goal</p>
                </div>
                <h3>₹300K</h3>
              </div>
              <h1>34k</h1>
              <div className="flex">
                <div className="progress__bar">
                  <span style={{ width: "65%", background: "#FF9A7B" }}></span>
                </div>
                <p>87% </p>
              </div>
            </section>
          </div>
        </div>
        <div className="report__summary roundBox">
          <h4>Report Summary</h4>
          <div className="flex">
            <span>
              August 2021
              <p style={{ fontSize: ".7em", color: "#fff6" }}>
                Created 01 Aug 2021
              </p>
            </span>
            <span>
              <img src={DownIcon} alt="" />
              <Link to="/">Download</Link>
            </span>
          </div>
          <div className="flex">
            <span>
              July 2021
              <p style={{ fontSize: ".7em", color: "#fff6" }}>
                Created 01 Aug 2021
              </p>
            </span>
            <span>
              <img src={DownIcon} alt="" />
              <Link to="/">Download</Link>
            </span>
          </div>
          <section className="flex">Generate Report</section>
        </div>
      </div>
    </div>
  );
}

export default Report;
