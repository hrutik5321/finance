import DownloadIcon from "../assets/icons/download.svg";
import React, { useEffect, useState } from "react";
import "../assets/styles/Revenue.css";
import Chart from "react-apexcharts";

import BarChart from "../components/Barchart";
import StripeIcon from "../assets/icons/stripe1.svg";
import RazerpayIcon from "../assets/icons/pay.svg";
import VimbusIcon from "../assets/icons/v.png";
import PaytmIcon from "../assets/icons/paytm2.svg";
import CashfreeIcon from "../assets/icons/cashfree2.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Stripe from "../assets/icons/stripe.svg";
import Razerpay from "../assets/icons/razerpay.svg";
import Vimbus from "../assets/icons/vimbus.png";
import Paytm from "../assets/icons/paytm.svg";
import Cashfree from "../assets/icons/cashfree.png";
import { getDatabase, onValue, ref } from "@firebase/database";

import {
  getUserTotalrevenue,
  getUserSpendMoney,
} from "../features/userIncomes/userIncomeSlice";
import { useSelector, useDispatch } from "react-redux";
import { getBrandRevenues } from "../features/admin/adminRevenueSlice";

function Revenue() {
  const dispatch = useDispatch();
  const {
    moneyLoader,
    spendMoney,
    totalRevenueLoader,
    totalRevenue,
    startUpdate,
  } = useSelector((state) => state.userincomes);

  const { userBranRevenue, revenueLoader } = useSelector(
    (state) => state.adminrevenue
  );

  const [cStripe, setCStripe] = useState(0);
  const [cRazorPay, setCRazorPay] = useState(0);
  const [cCashFree, setCCashFree] = useState(0);
  const [cPaytm, setCPaytm] = useState(0);
  const [cImbus, setCImbus] = useState(0);
  const [cRevenueTotal, setCRevenueTotal] = useState(0);

  const revenueBrandCosts = [
    cStripe,
    cRazorPay,
    cCashFree,
    cPaytm,
    cImbus,
    cStripe,
  ];

  const databaseRevenue = async () => {
    const db = getDatabase();
    const sheetRef = ref(db, "revenue");
    await onValue(sheetRef, (snapshot) => {
      // console.log(snapshot.val()[1]);
      console.log(snapshot.val());
      snapshot.val().map((d) => {
        if (d.Sales === "STRIPE") {
          setCStripe(d.Amount);
        }
        if (d.Sales === "RAZORPAY | KUSH") {
          setCRazorPay(d.Amount);
        }
        if (d.Sales === "PAYTM") {
          setCPaytm(d.Amount);
        }
        if (d.Sales === "UPI | CONSULTING") {
          setCImbus(d.Amount);
        }
        if (d.Sales === "CASH FREE") {
          setCCashFree(d.Amount);
        }
        if (d.Sales === "TOTAL") {
          setCRevenueTotal(d.Amount);
        }
      });
    });
    console.log(cRevenueTotal);
  };

  useEffect(() => {
    databaseRevenue();
    if (totalRevenue.length <= 0 || startUpdate) {
      dispatch(getUserTotalrevenue());
    }
    if (spendMoney.length <= 0 || startUpdate) {
      dispatch(getUserSpendMoney());
    }
    if (userBranRevenue.length <= 0) {
      dispatch(getBrandRevenues());
    }
  }, []);
  const data = {
    options: {
      theme: {
        mode: "dark",
      },
      series: [
        {
          name: "series1",
          data: totalRevenue,
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
        height: "100px",
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
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
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
      colors: ["#0BAFFF"],
    },
  };
  const pie = {
    options: {
      labels: ["AD Spend", "COG", "Shipping", "Tax", "Salary"],
      stroke: {
        show: false,
      },
      chart: {
        id: "donut",
        background: "#35373D",
        foreColor: "#fff",
      },
      legend: {
        show: false,
      },
    },
    series: spendMoney,
  };

  const revenueIcons = [Stripe, Razerpay, Cashfree, Paytm, Vimbus, Stripe];
  return (
    <div className="revenue">
      <div className="revenue__left">
        <div className="revenue__header roundBox flex">
          <img src={DownloadIcon} alt="" />
          <span>
            <p>Total Revenue</p>
            <h1>₹{cRevenueTotal}</h1>
          </span>
          {totalRevenueLoader ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            <Chart
              options={data.options}
              series={data.options.series}
              type="area"
              width="430px"
              height="125px"
            />
          )}
        </div>
        <div className="revenue__barchart">
          {revenueLoader ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            userBranRevenue.map((data, i) => (
              <BarChart
                key={i}
                title={data.title}
                expences={revenueBrandCosts[i]}
                icon={revenueIcons[i]}
                color={data.color}
                revdata={data.values}
              />
            ))
          )}
        </div>
      </div>
      <div className="revenue__right ">
        {moneyLoader ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Chart
            options={pie.options}
            series={pie.series}
            type="pie"
            width="325"
          />
        )}

        <h3>Recent Transaction</h3>
        <section style={{ borderTop: "none" }}>
          <div className="revenue__right--content flex">
            <section className="flex">
              <img src={StripeIcon} alt="" />
              <span>
                <h5>Stripe</h5>
                <p>Today, 5:32 AM</p>
              </span>
            </section>
            <p>+$129.00</p>
          </div>
        </section>
        <section>
          <div className="revenue__right--content flex">
            <section className="flex">
              <img src={RazerpayIcon} alt="" />
              <span>
                <h5>Razorpay</h5>
                <p>Today, 2:17 AM</p>
              </span>
            </section>
            <p>+$30.03</p>
          </div>
        </section>
        <section>
          <div className="revenue__right--content flex">
            <section className="flex">
              <img src={CashfreeIcon} alt="" />
              <span>
                <h5>Cashfree</h5>
                <p>Yesterday, 6:32 AM</p>
              </span>
            </section>
            <p>+$600.03</p>
          </div>
        </section>
        <section>
          <div className="revenue__right--content flex">
            <section className="flex">
              <img src={CashfreeIcon} alt="" />
              <span>
                <h5>Cashfree</h5>
                <p>Yesterday, 6:32 AM</p>
              </span>
            </section>
            <p>+$600.03</p>
          </div>
        </section>
        <section>
          <div className="revenue__right--content flex">
            <section className="flex">
              <img src={StripeIcon} alt="" />
              <span>
                <h5>Stripe</h5>
                <p>Today, 5:32 AM</p>
              </span>
            </section>
            <p>+$5929.00</p>
          </div>
        </section>
        <section>
          <div className="revenue__right--content flex">
            <section className="flex">
              <img src={PaytmIcon} alt="" />
              <span>
                <h5>Paytm</h5>
                <p>12 Sep, 5:32 AM</p>
              </span>
            </section>
            <p>+$5129.00</p>
          </div>
        </section>
        <section>
          <div className="revenue__right--content flex">
            <section className="flex">
              <img src={VimbusIcon} alt="" />
              <span>
                <h5>Vimbuspost</h5>
                <p>12 Sep, 5:32 AM</p>
              </span>
            </section>
            <p>+$629.00</p>
          </div>
        </section>
        <div className="revenue__footer roundBox flex">Load More</div>
      </div>
    </div>
  );
}

export default Revenue;
