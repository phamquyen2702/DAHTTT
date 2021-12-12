import { Button, TextField } from "@material-ui/core";
import React from "react";
import "../style2.css";
function Thietlapdangki(props) {
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
        <div className="thietlap-left">Khóa 66:</div>
        <div className="thietlap-right">
          <TextField
            label="Bắt đầu"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            style={{ marginLeft: "30px" }}
            label="Kết thúc"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </div>
      </div>
      <div className="table-thietlap">
        <div className="thietlap-left">Khóa 65:</div>
        <div className="thietlap-right">
          <TextField
            label="Bắt đầu"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            style={{ marginLeft: "30px" }}
            label="Kết thúc"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </div>
      </div>
      <div className="table-thietlap">
        <div className="thietlap-left">Khóa 64:</div>
        <div className="thietlap-right">
          <TextField
            label="Bắt đầu"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            style={{ marginLeft: "30px" }}
            label="Kết thúc"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </div>
      </div>
      <div className="table-thietlap">
        <div className="thietlap-left">Khóa 63:</div>
        <div className="thietlap-right">
          <TextField
            label="Bắt đầu"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            style={{ marginLeft: "30px" }}
            label="Kết thúc"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </div>
      </div>
      <div className="table-thietlap">
        <div className="thietlap-left">Khóa 62 trờ về trước:</div>
        <div className="thietlap-right">
          <TextField
            label="Bắt đầu"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            style={{ marginLeft: "30px" }}
            label="Kết thúc"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </div>
      </div>
      <div>
        <Button
          style={{
            width: "200px",
            marginTop: "40px",
            marginLeft: "20px",
            fontWeight: "400",
            background: "rgb(235, 43, 43)",
            color: "white",
          }}
          variant="contained"
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}

export default Thietlapdangki;
