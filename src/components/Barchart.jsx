import React from "react";
import Chart from "react-apexcharts";
import "../assets/styles/Areachart.css";
// import EditIcon from "../assets/icons/edit.svg";
// import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

function BarChart({ title, expences, icon, color }) {
  const data = {
    options: {
      theme: {
        mode: "dark",
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      series: [
        {
          name: "series1",
          data: [10, 15, 10, 20, 10, 15],
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
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          left: 20,
        },
      },
      chart: {
        id: "area-chart",
        type: "bar",
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
        categories: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
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
        min: 0,
        max: 20,
        forceNiceScale: true,
        labels: {
          style: {
            colors: "#84818A",
          },
        },
      },
      colors: [color],
    },
  };
  return (
    <div
      className="areachart roundBox"
      style={{ height: "250px", margin: "12px" }}
    >
      <div
        className="areachart__header flex "
        style={{ width: "270px", justifyContent: "flex-start" }}
      >
        <section
          className="flex"
          style={{ flexDirection: "column", justifyContent: "flex-start" }}
        >
          <img
            src={icon}
            alt=""
            style={{ width: "100%", borderRadius: 0, height: "40px" }}
          />
          <span>
            <h2 style={{ marginLeft: "20px" }}>{expences}</h2>
          </span>
        </section>
      </div>
      <Chart
        options={data.options}
        series={data.options.series}
        type="bar"
        width="285px"
        height="150px"
      />
    </div>
  );
}

export default BarChart;
