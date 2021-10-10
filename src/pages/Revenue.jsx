import DownloadIcon from "../assets/icons/download.svg";
import React from "react";
import "../assets/styles/Revenue.css";
import Chart from "react-apexcharts";

import BarChart from "../components/Barchart";
import StripeIcon from "../assets/icons/stripe1.svg";
import RazerpayIcon from "../assets/icons/pay.svg";
import VimbusIcon from "../assets/icons/v.png";
import PaytmIcon from "../assets/icons/paytm2.svg";
import CashfreeIcon from "../assets/icons/cashfree2.png";

import Stripe from "../assets/icons/stripe.svg";
import Razerpay from "../assets/icons/razerpay.svg";
import Vimbus from "../assets/icons/vimbus.png";
import Paytm from "../assets/icons/paytm.svg";
import Cashfree from "../assets/icons/cashfree.png";

function Revenue() {
  const data = {
    options: {
      theme: {
        mode: "dark",
      },
      series: [
        {
          name: "series1",
          data: [15, 18, 16, 14, 17, 20, 16],
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
    series: [44, 55, 41, 17, 15],
  };
  const revenueData = [
    {
      id: 1,
      title: "AD SPENDING",
      expences: "₹12.3K",
      icon: Stripe,
      color: "#7b61ff",
      percent: "35%",
    },
    {
      id: 2,
      title: "COGS",
      expences: "₹21.4K",
      icon: Razerpay,
      color: "#ff5e2f",
      percent: "35%",
    },
    {
      id: 3,
      title: "SHIPPING",
      expences: "₹9.2K",
      icon: Cashfree,
      color: "#0bafff",
      percent: "35%",
    },
    {
      id: 4,
      title: "SHOPIFY",
      expences: "₹2.7K",
      icon: Paytm,
      color: "#4fbf67",
      percent: "35%",
    },
    {
      id: 5,
      title: "GST TAX",
      expences: "₹4.5K",
      icon: Vimbus,
      color: "#fead36",
      percent: "35%",
    },
    {
      id: 6,
      title: "MICS",
      expences: "₹23.2K",
      icon: Stripe,
      color: "#1ad492",
      percent: "35%",
    },
  ];
  return (
    <div className="revenue">
      <div className="revenue__left">
        <div className="revenue__header roundBox flex">
          <img src={DownloadIcon} alt="" />
          <span>
            <p>Total Revenue</p>
            <h1>₹127,892.32</h1>
          </span>
          <Chart
            options={data.options}
            series={data.options.series}
            type="area"
            width="430px"
            height="125px"
          />
        </div>
        <div className="revenue__barchart">
          {revenueData.map((data) => (
            <BarChart
              key={data.id}
              title={data.title}
              expences={data.expences}
              icon={data.icon}
              color={data.color}
            />
          ))}
        </div>
      </div>
      <div className="revenue__right ">
        <Chart
          options={pie.options}
          series={pie.series}
          type="pie"
          width="325"
        />
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
