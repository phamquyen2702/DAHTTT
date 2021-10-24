import { Link } from "react-router-dom";
import React from "react";
import "./style.scss";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

function Formlogin(props) {
  return (
    <div className="content-login">
      <div className="content-login-left">
        <div className="title-login">
          <h3> ĐĂNG NHẬP VÀO HỆ THỐNG </h3> <hr />
          <p> Vui lòng chọn vai trò đăng nhập: </p>
        </div>
        <div className="form-login">
          <FormControl component="fieldset">
            <RadioGroup
              defaultValue="student"
              name="radio-buttons-group"
              className="radio"
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Sinh viên"
                className="radio"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Quản trị hệ thống"
              />
              <FormControlLabel
                value="tm"
                control={<Radio />}
                label="Quản trị học phần"
              />
            </RadioGroup>
            <TextField
              id="outlined-input"
              label="username"
              type="text"
              style={{ width: "100%" }}
            />
            <TextField
              id="outlined-password-input"
              label="password"
              type="password"
              autoComplete="current-password"
            />
            <br />
            <Button variant="contained"> Đăng nhập </Button>
          </FormControl>
        </div>
      </div>
      <div className="content-login-right">
        <div className="content-login-right-top">
          <button>
            <Link to="" className="button1">
              Thời khóa biểu dự kiến
            </Link>
          </button>
        </div>
        <div className="content-login-right-bot">
          <button>
            <Link to="" className="button1">
              Thông tin danh sách lớp mở
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Formlogin;
