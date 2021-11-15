import { MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./style2.css";
var listtime = [
  { value: "0h00 - 4h30", label: "0h00 - 4h30" },
  { value: "4h30 - 9h00", label: "4h30 - 9h00" },
  { value: "9h00 - 13h30", label: "9h00 - 13h30" },
  { value: "13h30 - 18h00", label: "13h30 - 18h00" },
  { value: "18h00 - 23h59", label: "18h00 - 23h59" },
];
function Thietlapdangki(props) {
  const [time, setTime] = useState("0h00 - 4h30");
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
  return (
    <div className="thongtincanhan">
      <div className="thongtincanhan-title" style={{ fontSize: "15px" }}>
        1. Thiết lập thời gian đăng kí học tập
      </div>
      <div style={{ margin: "20px" }}>
        <TextField
          id="datetime-local"
          label="Thời gian bắt đầu"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={{ marginLeft: "70px" }}
          id="datetime-local"
          label="Thời gian kết thúc"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="thongtincanhan-title" style={{ fontSize: "15px" }}>
        2. Thiết lập thời gian đăng kí điều chỉnh
      </div>
      <div style={{ margin: "20px" }}>
        <TextField
          id="datetime-local"
          label="Thời gian bắt đầu"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          style={{ marginLeft: "70px" }}
          id="datetime-local"
          label="Thời gian kết thúc"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="thongtincanhan-title" style={{ fontSize: "15px" }}>
        3. Thiết lập khung thời gian đăng kí cho sinh viên các khóa
      </div>
      <div className="table-thietlap">
        <table>
          <tr>
            <th>Khóa</th>
            <th>Khung thời gian</th>
          </tr>
          <tr>
            <td>Khóa 66</td>
            <td>
              <TextField
                name="kihoc"
                variant="standard"
                required
                fullWidth
                margin="dense"
                select
                value={time}
                onChange={handleChangeTime}
              >
                {listtime.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </td>
          </tr>
          <tr>
            <td>Khóa 65</td>
            <td>
              <TextField
                name="kihoc"
                variant="standard"
                required
                fullWidth
                margin="dense"
                select
                value={time}
                onChange={handleChangeTime}
              >
                {listtime.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </td>
          </tr>
          <tr>
            <td>Khóa 64</td>
            <td>
              <TextField
                name="kihoc"
                variant="standard"
                required
                fullWidth
                margin="dense"
                select
                value={time}
                onChange={handleChangeTime}
              >
                {listtime.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Thietlapdangki;
