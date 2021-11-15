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
