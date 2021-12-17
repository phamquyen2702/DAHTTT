import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import userApi from "../api/userApi";
import { GENDER_DEFAULT, SCHOOL_ID_DEFAULT } from "../dummydb/dataDefault";
import { listkhoavien } from "../dummydb/khoavien";
import "./style2.css";
import "./style3.css";

function Thongtinquanly({ user }) {
  const { enqueueSnackbar } = useSnackbar();
  const [valueGender, setValueGender] = useState(GENDER_DEFAULT);
  const [khoavien, setKhoavien] = useState(SCHOOL_ID_DEFAULT);
  const schema = yup.object().shape({
    fullname: yup.string().required("please enter your fullname"),
    address: yup.string().required("please enter your address"),
    phone: yup.string().required("please enter your phone"),
    birthday: yup.string().required("please enter your birthday"),
    cmnd: yup.string().required("please enter your cmnd"),
    schoolId: yup.string().required("please enter your schoolId"),
  });
  const form = useForm({
    defaultValues: {
      Id: "",
      fullname: "",
      email: "",
      address: "",
      phone: "",
      gender: "",
      role: "",
      cmnd: "",
      schoolId: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;
  useEffect(() => {
    const setUser = () => {
      setValue("Id", user.Id);
      setValue("fullname", user.fullname);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("phone", user.phone);
      setValue("birthday", `${user.birthday}`.slice(0, 10));
      setValue("gender", user.gender ? user.gender : GENDER_DEFAULT);
      setValue("role", user.role);
      setValue("cmnd", user.cmnd);
      setValue("schoolId", user.schoolId ? user.schoolId : SCHOOL_ID_DEFAULT);
    };
    setUser();
  }, [setValue, user]);

  const handleOnSubmit = async (value) => {
    try {
      const id = user.Id;
      const params = {
        Id: id,
      };
      value.password = "";
      value.status = 1;
      await userApi.update(value, params);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };

  const handleChangeKhoavien = (event) => {
    setKhoavien(event.target.value);
  };
  const handleChangeGender = (event) => {
    setValueGender(event.target.value);
  };

  return (
    <div className="thongtincanhan">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <p className="thongtincanhan-title">Thông tin cá nhân</p>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <br />
        {/* id */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Mã số :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("Id")}
              name="Id"
              className="outlined-basic"
              variant="outlined"
              required
              margin="dense"
              fullWidth
              disabled
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="id" />
            </p>
          </div>
        </div>
        {/* fullname */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Họ và tên :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("fullname")}
              name="fullname"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="fullname" />
            </p>
          </div>
        </div>
        {/* email */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Email :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("email")}
              name="email"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              disabled
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="email" />
            </p>
          </div>
        </div>
        {/* Ngày sinh */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Ngày sinh :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("birthday")}
              name="birthday"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              type="date"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="birthday" />
            </p>
          </div>
        </div>
        {/* Địa chỉ */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Địa chỉ :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("address")}
              name="address"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="address" />
            </p>
          </div>
        </div>

        {/* CMT */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Số CMT/CCCD:</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("cmnd")}
              name="cmnd"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Chưa cập nhật"
              type="number"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="cmnd" />
            </p>
          </div>
        </div>
        {/* Số điện thoại */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Số điện thoại :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("phone")}
              name="phone"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Chưa cập nhật"
              type="number"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="phone" />
            </p>
          </div>
        </div>
        {/* giới tính */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Giới tính:</div>
          <div className="thongtincanhan-contents-input">
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              style={{ marginTop: "5px" }}
              onChange={handleChangeGender}
              value={valueGender}
            >
              <FormControlLabel
                {...register("gender")}
                value="nam"
                control={<Radio />}
                label="Nam"
              />
              <FormControlLabel
                {...register("gender")}
                value="nu"
                control={<Radio />}
                label="Nữ"
              />
            </RadioGroup>
          </div>
        </div>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <br />
        {/* Khoa viện  */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Khoa/Viện :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("schoolId")}
              name="schoolId"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              select
              value={khoavien}
              onChange={handleChangeKhoavien}
            >
              {listkhoavien.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="schoolId" />
            </p>
          </div>
        </div>
        {/* Chức vụ */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Chức vụ :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("role")}
              name="role"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              disabled
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="role" />
            </p>
          </div>
        </div>
        <div className="thongtincanhan-contents">
          <Button
            style={{
              width: "250px",
              marginTop: "40px",
              marginLeft: "0px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            type="submit"
          >
            Cập nhật thông tin
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Thongtinquanly;
