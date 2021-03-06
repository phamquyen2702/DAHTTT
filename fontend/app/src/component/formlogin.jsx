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
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { login } from "../reducers/userSlice";
import Dangki from "./dangki";
import getCookie from "./getcookie";
import { useDispatch } from "react-redux";
import classApi from "../api/classApi";
import { headerTKB } from "../dummydb/headerTKBcsv";
import { CSVLink } from "react-csv";
import "./style.scss";
import { ROLE_DEFAULT } from "../dummydb/dataDefault";
import { TimeStartConvert,TimeEndConvert } from "../dummydb/time";

function Formlogin(props) {
  const [datasExport, setDatasExport] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [valueRole, setValueRole] = useState(ROLE_DEFAULT);
  const history = useHistory();
  const csvReport = {
    filename: "TKB.csv",
    headers: headerTKB,
    data: datasExport,
  };

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
      role: ROLE_DEFAULT,
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
      form.reset();
    } catch (error) {
      enqueueSnackbar("email, m???t kh???u ho???c vai tr?? t??i kho???n sai", {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const semesterDk = await classApi.getSemesterRegister();
        const params = {
          status: 1,
          semester: semesterDk,
          limit: 99999999,
          offset: 0,
        };
        const list = await classApi.getFilter(params);
        for(let i =0;i<list.length;i++){
          list[i].time=`${TimeStartConvert[list[i].timeStart]}-${TimeEndConvert[list[i].timeEnd]}`
        }
        setDatasExport(list);
      } catch (error) {
        enqueueSnackbar(error.response.data.detail, {
          variant: "error",
        });
      }
    };
    fetchData();
  }, [enqueueSnackbar]);
  return (
    <div className="content-login">
      <div className="content-login-left">
        <div className="title-login">
          <h3> ????NG NH???P V??O H??? TH???NG </h3> <hr />
          <p> Vui l??ng ch???n vai tr?? ????ng nh???p: </p>
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
                label="Sinh vi??n"
                className="radio"
              />
              <FormControlLabel
                {...register("role")}
                value="ROLE_ADMIN"
                control={<Radio />}
                label="Qu???n tr??? h??? th???ng"
              />
              <FormControlLabel
                {...register("role")}
                value="ROLE_TM"
                control={<Radio />}
                label="Qu???n tr??? ????o t???o"
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
              ????ng nh???p
            </Button>
          </form>
        </div>
      </div>
      <div className="content-login-right">
        <div className="content-login-right-top">
          <CSVLink {...csvReport}>
            <Button
              style={{
                width: "300px",
                marginTop: "20px",
                background: "rgb(161, 11, 11)",
                color: "white",
              }}
              variant="contained"
            >
              Th???i kh??a bi???u d??? ki???n
            </Button>
          </CSVLink>
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
            ????ng k?? t??i kho???n
          </Button>
        </div>
        <Dangki open={open} handleCloseDK={handleCloseDK}></Dangki>
      </div>
    </div>
  );
}

export default Formlogin;
