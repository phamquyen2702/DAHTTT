import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { dbaccount } from "../dummydb/dbaccount";
import Dangki from "./dangki";
import getCookie from "./getcookie";
import setcookie from "./setcookie";
import "./style.scss";

function checkAccount(role, email, password) {
  for (let i = 0; i < dbaccount.length; i++) {
    if (
      dbaccount[i].role === role &&
      dbaccount[i].email === email &&
      dbaccount[i].password === password
    ) {
      return true;
      // eslint-disable-next-line no-unreachable
      break;
    }
  }
}

function Formlogin(props) {
  const { enqueueSnackbar } = useSnackbar();
  setcookie("dbaccount", JSON.stringify(dbaccount), 16);
  const [valueRole, setValueRole] = useState("ROLE_SV");
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("please enter your email")
      .email("please enter a valid"),
    password: yup
      .string()
      .required("please enter your password")
      .min(6, "Please enter at least 6 characters"),
  });
  const form = useForm({
    defaultValues: {
      role: "ROLE_SV",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const handleChangeRole = (event) => {
    setValueRole(event.target.value);
  };

  if (getCookie("account")) {
    history.push("/home");
  }
  const [isVeryFied, setIsVeryFied] = useState(false);
  const onChangeCapcha = (value) => {
    // console.log("Captcha value:", value);
    setIsVeryFied(true);
  };
  const handleOnSubmit = (value) => {
    if (checkAccount(value.role, value.email, value.password)) {
      setcookie("account", JSON.stringify(value), 15);
      window.location.href = "/home";
      form.reset();
    } else {
      enqueueSnackbar(
        "email or password is incorrect, đăng kí account tại file dummydb/dbaccount.jsx",
        {
          variant: "error",
        }
      );
    }
  };
  const [open, setOpen] = useState(false);
  const handleClickDK = () => {
    setOpen(true);
  };
  const handleCloseDK = () => {
    setOpen(false);
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
                {...register("role")}
                value="ROLE_SV"
                control={<Radio />}
                label="Sinh viên"
                className="radio"
              />
              <FormControlLabel
                {...register("role")}
                value="ROLE_ADMIN"
                control={<Radio />}
                label="Quản trị hệ thống"
              />
              <FormControlLabel
                {...register("role")}
                value="ROLE_TM"
                control={<Radio />}
                label="Quản trị đào tạo"
              />
            </RadioGroup>
            <TextField
              autoFocus
              id="outlined-input"
              {...register("email")}
              label="email"
              type="text"
              style={{ width: "95%" }}
            />
            <p style={{ color: "red", fontSize: "12px", marginBottom: "0px" }}>
              <ErrorMessage errors={errors} name="email" />
            </p>

            <br />
            <TextField
              style={{ width: "95%" }}
              id="outlined-password-input"
              {...register("password")}
              label="password"
              type="password"
              autoComplete="current-password"
            />
            <p style={{ color: "red", fontSize: "12px", marginBottom: "0px" }}>
              <ErrorMessage errors={errors} name="password" />
            </p>
            <br />
            <div>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChangeCapcha}
              />
            </div>

            <Button
              disabled={!isVeryFied}
              type="submit"
              style={{ width: "303px", marginTop: "20px" }}
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
            Danh sách lớp mở
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
            onClick={handleClickDK}
          >
            Đăng kí tài khoản
          </Button>
        </div>
        <Dangki open={open} handleCloseDK={handleCloseDK}></Dangki>
      </div>
    </div>
  );
}

export default Formlogin;
