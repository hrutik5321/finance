import React from "react";
import Chart from "react-apexcharts";
import "../assets/styles/Areachart.css";
import EditIcon from "../assets/icons/edit.svg";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

function Areachart({ title, expences, icon, color }) {
  const data = {
    options: {
      theme: {
        mode: "dark",
      },
      series: [
        {
          name: "series1",
          data: [59, 40, 28, 51, 42],
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
        categories: ["Dec 10", "Dec 18", "Dec 26", "Jan 3", "Jan 9"],
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
      colors: [color],
    },
  };
  return (
    <div className="areachart roundBox">
      <div className="areachart__header flex">
        <section className="flex">
          <img
            src={icon}
            alt=""
            style={{ background: `${color}30`, marginRight: "5px" }}
          />
          <span>
            <p style={{ color: `${color}` }}>{title}</p>
            <img src={EditIcon} alt="" />
            <h2>{expences}</h2>
          </span>
        </section>
        <div className="roundBox flex">
          <p style={{ fontSize: ".8em", fontWeight: "500" }}>Week</p>
          <ArrowDropDownRoundedIcon sx={{ color: "#fff4" }} />
        </div>
      </div>
      <div className="chart__wrapper">
        <Chart
          options={data.options}
          series={data.options.series}
          type="area"
          width="300px"
        />
      </div>
    </div>
  );
}

export default Areachart;
