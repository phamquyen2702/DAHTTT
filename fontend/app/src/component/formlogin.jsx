import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { login } from "../reducers/userSlice";
import Dangki from "./dangki";
import getCookie from "./getcookie";
import { useDispatch } from "react-redux";
import "./style.scss";

function Formlogin(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [valueRole, setValueRole] = useState("ROLE_STUDENT");
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
      role: "ROLE_STUDENT",
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
    setIsVeryFied(true);
  };
  const dispatch = useDispatch();
  const handleOnSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.href = "/home";
      // history.push("/home");
      form.reset();
    } catch (error) {
      enqueueSnackbar("account is incorrect", {
        variant: "error",
      });
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
                value="ROLE_STUDENT"
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
