import React from "react";
import { Line } from "@ant-design/charts";

const Chartline = ({datas}) => {
  var config = {
    data: datas,
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
