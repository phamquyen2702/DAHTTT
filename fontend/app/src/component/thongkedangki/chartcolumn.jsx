import React from "react";
import { Column } from "@ant-design/charts";

const Chartcolumn = ({datas}) => {
  var config = {
    data: datas,
    xField: "schoolId",
    yField: "soluongSV",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      schoolId: { alias: "CNTT" },
    },
  };
  return <Column {...config} />;
};

export default Chartcolumn;
