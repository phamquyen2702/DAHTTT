import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "../style2.css";
import Chartline from "./chartline";
var listkihoc = [
  { value: "20201", label: "20201" },
  { value: "20202", label: "20202" },
  { value: "20211", label: "20211" },
  { value: "20212", label: "20212" },
];
function Thongketheongay(props) {
  const [kihoc, setKihoc] = useState("20201");
  const handleChangeKihoc = (event) => {
    setKihoc(event.target.value);
  };
  return (
    <div>
      <div style={{ width: "200px" }}>
        <TextField
          label="Chọn kì học"
          name="kihoc"
          variant="outlined"
          required
          fullWidth
          margin="dense"
          select
          value={kihoc}
          onChange={handleChangeKihoc}
        >
          {listkihoc.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="quanlysinhvien-content">
        <Chartline></Chartline>
      </div>
    </div>
  );
}

export default Thongketheongay;
