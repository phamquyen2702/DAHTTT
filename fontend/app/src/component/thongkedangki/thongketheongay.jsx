import { MenuItem, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import classApi from "../../api/classApi";
import "../style2.css";
import Chartline from "./chartline";

function Thongketheongay({ semesters, semesterDk }) {
  const [kihoc, setKihoc] = useState(semesterDk);
  const [datas, setDatas] = useState([]);
  const handleChangeKihoc = (event) => {
    setKihoc(event.target.value);
  };
  useEffect(() => {
    const fectchData = async () => {
      const param = {
        semester: kihoc,
      };
      const list = await classApi.getThongkeTheoNgay(param);
      setDatas(list);
    };
    fectchData();
  }, [kihoc]);
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
          {semesters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="quanlysinhvien-content">
        <Chartline datas={datas}></Chartline>
      </div>
    </div>
  );
}

export default Thongketheongay;
