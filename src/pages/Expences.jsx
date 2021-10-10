import React from "react";
import Areachart from "../components/Areachart";
import AdIcon from "../assets/icons/ad.svg";
import DollarIcon from "../assets/icons/dollar.svg";
import DiscountIcon from "../assets/icons/discount-circle.svg";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ShopifyIcon from "../assets/icons/shopify.svg";
import ReceiptIcon from "../assets/icons/receipt.svg";
import ShippingIcon from "../assets/icons/shipping.svg";
import "../assets/styles/Expences.css";
import Chart from "react-apexcharts";

function Expences() {
  const data = [
    {
      id: 1,
      title: "AD SPENDING",
      expences: "₹12.3K",
      icon: AdIcon,
      color: "#7b61ff",
      percent: "35%",
    },
    {
      id: 2,
      title: "COGS",
      expences: "₹21.4K",
      icon: DollarIcon,
      color: "#ff5e2f",
      percent: "35%",
    },
    {
      id: 3,
      title: "SHIPPING",
      expences: "₹9.2K",
      icon: ShippingIcon,
      color: "#0bafff",
      percent: "35%",
    },
    {
      id: 4,
      title: "SHOPIFY",
      expences: "₹2.7K",
      icon: ShopifyIcon,
      color: "#4fbf67",
      percent: "35%",
    },
    {
      id: 5,
      title: "GST TAX",
      expences: "₹4.5K",
      icon: DiscountIcon,
      color: "#fead36",
      percent: "35%",
    },
    {
      id: 6,
      title: "MICS",
      expences: "₹23.2K",
      icon: ReceiptIcon,
      color: "#1ad492",
      percent: "35%",
    },
  ];
  const donut = {
    options: {
      labels: ["AD Spend", "COG", "Shipping", "Tax", "Salary", "Domain"],
      plotOptions: {
        pie: {
          donut: {
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
        show: false,
      },
    },
    series: [44, 55, 41, 17, 15, 33],
  };

  return (
    <div className="expences">
      <div className="expences__chart">
        {data.map((data) => (
          <Areachart
            key={data.id}
            title={data.title}
            expences={data.expences}
            icon={data.icon}
            color={data.color}
          />
        ))}
      </div>
      <div className="expences__section">
        <div className="expences__enteries roundBox">
          <div className="expences__enteries--header flex">
            <p>Recent Entries</p>
            <div className=" roundBox flex">
              <p style={{ fontSize: ".85em" }}>
                <span>Show: </span> This Month
              </p>
              <ArrowDropDownRoundedIcon />
            </div>
          </div>
          <div className="expences__enteries--content">
            <div className="expences__enteries--title">
              <span>EXPENCE</span>
              <span>
                TYPE
                <ArrowDropDownRoundedIcon />
              </span>
              <span>
                EXCUTE BY
                <ArrowDropDownRoundedIcon />
              </span>
              <span>
                AMOUNT
                <ArrowDropDownRoundedIcon />
              </span>
            </div>
            <div className="expences__enteries--row">
              <section className="flex">
                <span style={{ background: "#fff" }}></span>
                <section>
                  <h4>Zendesk - Aug</h4>
                  <p>12 September 2021</p>
                </section>
              </section>
              <section style={{ background: "#0BAFFF25", color: "#0BAFFF" }}>
                Zendesk
              </section>
              <section>Enrique</section>
              <section>₹2,000</section>
            </div>
            <div className="expences__enteries--row">
              <section className="flex">
                <span style={{ background: "#0BAFFF" }}></span>
                <section>
                  <h4>Nagpur - ELM Project</h4>
                  <p>12 September 2021</p>
                </section>
              </section>
              <section style={{ background: "#7b61ff25", color: "#7b61ff" }}>
                Shipping
              </section>
              <section>Dianne</section>
              <section>₹2,500</section>
            </div>
            <div className="expences__enteries--row">
              <section className="flex">
                <span style={{ background: "#7b61ff" }}></span>
                <section>
                  <h4>Ad - Facebook</h4>
                  <p>12 September 2021</p>
                </section>
              </section>
              <section style={{ background: "#FFA04325", color: "#FFA043" }}>
                Ad Spend
              </section>
              <section>Walterson</section>
              <section>₹6,020</section>
            </div>
            <div className="expences__enteries--row">
              <section className="flex">
                <span style={{ background: "#7b61ff" }}></span>
                <section>
                  <h4>Salary - Alex</h4>
                  <p>12 September 2021</p>
                </section>
              </section>
              <section style={{ background: "#20C9AC25", color: "#20C9AC" }}>
                Misc
              </section>
              <section>Kushagrah</section>
              <section>₹15,000</section>
            </div>
            <div className="expences__enteries--row">
              <section className="flex">
                <span style={{ background: "#20C9AC" }}></span>
                <section>
                  <h4>Shopify</h4>
                  <p>12 September 2021</p>
                </section>
              </section>
              <section style={{ background: "#4FBF6725", color: "#4FBF67" }}>
                Shopify
              </section>
              <section>Kushagrah</section>
              <section>₹5,212</section>
            </div>
            <div
              className="flex roundBox"
              style={{ background: "#fff1", padding: "10px" }}
            >
              Load more
            </div>
          </div>
        </div>
        <div className="expences__donutchart roundBox flex">
          <section>
            <Chart
              options={donut.options}
              series={donut.series}
              type="donut"
              width="320"
            />
          </section>
          <div className="expences__chart--label">
            {data.map((data) => (
              <section key={data.id}>
                <main className="flex">
                  <span style={{ background: `${data.color}` }}></span>
                  <p>{data.title}</p>
                </main>
                <span>{data.percent}</span>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expences;
