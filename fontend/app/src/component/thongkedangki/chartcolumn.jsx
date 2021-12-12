import React from "react";
import { Column } from "@ant-design/charts";

const Chartcolumn = () => {
  var data = [
    {
      khoavien: "CNTT",
      soluongSV: 380,
    },
    {
      khoavien: "Cơ khí",
      soluongSV: 5200,
    },
    {
      khoavien: "Vật lý",
      soluongSV: 610,
    },
    {
      khoavien: "Ngoại ngữ",
      soluongSV: 14500,
    },
    {
      khoavien: "Lý luận",
      soluongSV: 480,
    },
    {
      khoavien: "xxx",
      soluongSV: 800,
    },
    {
      khoavien: "yyy",
      soluongSV: 500,
    },
    {
      khoavien: "zzz",
      soluongSV: 600,
    },
    {
      khoavien: "qqq",
      soluongSV: 1400,
    },
    {
      khoavien: "aaa",
      soluongSV: 480,
    },
  ];
  var config = {
    data: data,
    xField: "khoavien",
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
      khoavien: { alias: "CNTT" },
    },
  };
  return <Column {...config} />;
};

export default Chartcolumn;
