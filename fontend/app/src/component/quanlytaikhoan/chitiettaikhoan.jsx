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
import { useParams } from "react-router-dom";
import * as yup from "yup";
import userApi from "../../api/userApi";
import {
  GENDER_DEFAULT,
  ROLE_DEFAULT,
  SCHOOLYEAR_DEFAULT,
  SCHOOL_ID_DEFAULT,
} from "../../dummydb/dataDefault";
import { listkhoavien } from "../../dummydb/khoavien";
import { listRole } from "../../dummydb/role";
import { schoolyears } from "../../dummydb/schoolyear";
import AlertRemove from "../alertRemove";
import "../style2.css";
import "../style3.css";

function Chitiettaikhoan(props) {
  const { Id } = useParams();
  const [valueGender, setValueGender] = useState(GENDER_DEFAULT);
  const [khoavien, setKhoavien] = useState(SCHOOL_ID_DEFAULT);
  const [valueRole, setValueRole] = useState(ROLE_DEFAULT);
  const [valueSchoolyear, setValueSchoolyear] = useState(SCHOOLYEAR_DEFAULT);
  const [user, setUser1] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("please enter your email")
      .email("please enter a valid"),
    Id: yup.string().required("please enter your Id"),
    fullname: yup.string().required("please enter your fullname"),
    address: yup.string().required("please enter your address"),
    phone: yup.string().required("please enter your phone"),
    birthday: yup.string().required("please enter your birthday"),
    cmnd: yup.string().required("please enter your cmnd"),
  });
  const form = useForm({
    defaultValues: {
      Id: "",
      fullname: "",
      email: "",
      address: "",
      phone: "",
      gender: GENDER_DEFAULT,
      role: ROLE_DEFAULT,
      cmnd: "",
      schoolId: SCHOOL_ID_DEFAULT,
      schoolyear: SCHOOLYEAR_DEFAULT,
      program: "",
      maxcredit: 0,
      status: 0,
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
    const setUsers = async () => {
      //setValue Form
      setValue("Id", user.Id);
      setValue("fullname", user.fullname);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("phone", user.phone);
      setValue("birthday", `${user.birthday}`.slice(0, 10));
      setValue("gender", user.gender);
      setValueGender(user.gender);
      setValue("role", user.role);
      setValueRole(user.role);
      setValue("cmnd", user.cmnd);
      setValue("schoolId", user.schoolId);
      setKhoavien(user.schoolId);
      setValue("program", user.program);
      setValue("schoolyear", user.schoolyear);
      setValueSchoolyear(user.schoolyear);
      setValue("maxcredit", user.maxcredit);
      setValue("status", user.status);
    };
    setUsers();
  }, [setValue, user]);
  useEffect(() => {
    const fetchUser = async () => {
      const params = {
        Id: Id,
      };
      const users = await userApi.get(params);
      setUser1(users.accounts[0]);
    };
    fetchUser();
  }, [Id]);
  const handleOnSubmit = async (value) => {
    try {
      const params = {
        Id: Id,
      };
      value.password = "";
      await userApi.update(value, params);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  const handleChangeSchoolyear = (event) => {
    setValueSchoolyear(event.target.value);
  };
  const handleChangeKhoavien = (event) => {
    setKhoavien(event.target.value);
  };
  const handleChangeRole = (event) => {
    setValueRole(event.target.value);
  };
  const handleChangeGender = (event) => {
    setValueGender(event.target.value);
  };

  const handleBlock = async () => {
    try {
      await userApi.lock(Id);
      window.location.reload();
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  const handleUnBlock = async () => {
    try {
      await userApi.unlock(Id);
      window.location.reload();
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  const handleResetPassword = async () => {
    try {
      const params = {
        Id: Id,
      };
      user.password=Id;

      await userApi.update(user, params);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  return (
    <div className="thongtincanhan">
      <div className="thongtincanhan-content">
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
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                disabled
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="Id" />
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
                placeholder="Chưa cập nhật"
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
                placeholder="Chưa cập nhật"
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
                placeholder="Chưa cập nhật"
                fullWidth
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="address" />
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
          {/* Lại tài khoản */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">
              Loại tài khoản :
            </div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("role")}
                name="role"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={valueRole}
                onChange={handleChangeRole}
              >
                {listRole.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="role" />
              </p>
            </div>
          </div>
          <hr style={{ opacity: "0.3", width: "100%" }} />
          <br />
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
          {/*Chương trình */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Chương trình :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("program")}
                name="program"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
              />
            </div>
          </div>
          <p></p>
          {/* Khoá  */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Khoá học :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("schoolyear")}
                name="schoolyear"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={valueSchoolyear}
                onChange={handleChangeSchoolyear}
              >
                {schoolyears.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <p></p>
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
            </div>
          </div>
          <p></p>
          {/*Số tín chỉ  */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">
              Tín chỉ tối đa :
            </div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("maxcredit")}
                name="maxcredit"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                type="number"
                placeholder="Chưa cập nhật"
              />
            </div>
          </div>
          <p></p>
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
          <p></p>
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
        <Button
          style={{
            width: "170px",
            float: "right",
            marginTop: "-35px",
            marginRight: "12px",
            fontWeight: "400",
            background: "rgb(235, 43, 43)",
            color: "white",
          }}
          variant="contained"
          onClick={handleResetPassword}
        >
          Reset mật khẩu
        </Button>
        {user.status === 1 && (
          <Button
            style={{
              width: "250px",
              float: "right",
              marginTop: "-35px",
              marginRight: "12px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            onClick={handleOpen}
          >
            Khóa tài khoản
          </Button>
        )}
        {user.status === 0 && (
          <Button
            style={{
              width: "250px",
              float: "right",
              marginTop: "-35px",
              marginRight: "12px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            onClick={handleOpen1}
          >
            Mở khóa tài khoản
          </Button>
        )}
      </div>
      <AlertRemove
        open={open}
        handleCancel={handleClose}
        handleOk={handleBlock}
        message={`Bạn có chắc chắn muốn khóa tài khoản ${Id}?`}
      ></AlertRemove>
      <AlertRemove
        open={open1}
        handleCancel={handleClose1}
        handleOk={handleUnBlock}
        message={`Bạn có chắc chắn muốn mở khóa tài khoản ${Id}?`}
      ></AlertRemove>
    </div>
  );
}

export default Chitiettaikhoan;
