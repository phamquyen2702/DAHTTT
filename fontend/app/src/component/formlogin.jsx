import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const account = [
  {
    email: "tung.pv153093@sis.hust.edu.vn",
    password: "123456",
    name: "Phạm Văn Tùng",
    role: "ROLE_ADMIN",
  },
  {
    email: "quyen.pv153093@sis.hust.edu.vn",
    password: "123456",
    name: "Phạm Văn Quyền",
    role: "ROLE_SV",
  },

  {
    email: "trung.pv153093@sis.hust.edu.vn",
    password: "123456",
    name: "Phạm Văn Trung",
    role: "ROLE_TM",
  },
];
function CheckRole(role) {
  for (let i = 0; i < account.length; i++) {
    if (account[i].role === role) {
      return true;
      // eslint-disable-next-line no-unreachable
      break;
    }
  }
}
function GetUserByRole(role) {
  for (let i = 0; i < account.length; i++) {
    if (account[i].role === role) {
      return account[i];
      // eslint-disable-next-line no-unreachable
      break;
    }
  }
}
function Formlogin(props) {
  const [valueRole, setValueRole] = useState("ROLE_SV");

  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const handleChangeRole = (event) => {
    setValueRole(event.target.value);
  };

  if (localStorage.getItem("account")) {
    history.push("/home");
  }
  const handleOnSubmit = (value) => {
    console.log(value);
    console.log(valueRole);

    if (!localStorage.getItem("account") && CheckRole(valueRole)) {
      localStorage.setItem("account", JSON.stringify(GetUserByRole(valueRole)));
    }

    if (localStorage.getItem("account")) {
      window.location.href = "/home";
    }
  };

  return (
    <div className="content-login">
      <div className="content-login-left">
        <div className="title-login">
          <h3> ĐĂNG NHẬP VÀO HỆ THỐNG </h3> <hr />
          <p> Vui lòng chọn vai trò đăng nhập: </p>
        </div>
        <div className="form-login">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <RadioGroup
              name="role"
              onChange={handleChangeRole}
              value={valueRole}
            >
              <FormControlLabel
                value="ROLE_SV"
                control={<Radio />}
                label="Sinh viên"
                className="radio"
              />
              <FormControlLabel
                value="ROLE_ADMIN"
                control={<Radio />}
                label="Quản trị hệ thống"
              />
              <FormControlLabel
                value="ROLE_TM"
                control={<Radio />}
                label="Quản trị học phần"
              />
            </RadioGroup>
            <TextField
              id="outlined-input"
              {...register("email")}
              label="email"
              type="text"
              style={{ width: "400px" }}
            />
            <br />
            <TextField
              id="outlined-password-input"
              {...register("password")}
              label="password"
              type="password"
              autoComplete="current-password"
              style={{ width: "400px" }}
            />
            <br />
            <Button
              type="submit"
              style={{ width: "400px", marginTop: "20px" }}
              variant="contained"
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
      <div className="content-login-right">
        <div className="content-login-right-top">
          <Button
            style={{
              width: "300px",
              marginTop: "20px",
              background: "rgb(161, 11, 11)",
              color: "white",
            }}
            variant="contained"
          >
            Thời khóa biểu dự kiến
          </Button>
        </div>
        <div className="content-login-right-bot">
          <Button
            style={{
              width: "300px",
              marginTop: "20px",
              background: "rgb(161, 11, 11)",
              color: "white",
            }}
            variant="contained"
          >
            Thông tin danh sách lớp mở
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Formlogin;
