import React from "react";
import { Line } from "@ant-design/charts";

const Chartline = () => {
  var data = [
    {
      day: "20-10",
      numberSV: 3232,
    },
    {
      day: "21-10",
      numberSV: 412,
    },
    {
      day: "22-10",
      numberSV: 325,
    },
    {
      day: "23-10",
      numberSV: 51,
    },
    {
      day: "24-10",
      numberSV: 2323,
    },
    {
      day: "25-10",
      numberSV: 1111,
    },
    {
      day: "26-10",
      numberSV: 3323,
    },
    {
      day: "27-10",
      numberSV: 10000,
    },
    {
      day: "28-10",
      numberSV: 700,
    },
  ];
  var config = {
    data: data,
    xField: "day",
    yField: "numberSV",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [{ type: "marker-active" }],
  };
  return <Line {...config} />;
};

export default Chartline;
