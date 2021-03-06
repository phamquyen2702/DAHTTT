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
import {
  GENDER_DEFAULT,
  ROLE_DEFAULT,
  SCHOOLYEAR_DEFAULT,
  SCHOOL_ID_DEFAULT,
} from "../dummydb/dataDefault";
import { listkhoavien } from "../dummydb/khoavien";
import { schoolyears } from "../dummydb/schoolyear";
import "./style2.css";

function Thongtincanhan({ user }) {
  const [valueGender, setValueGender] = useState(GENDER_DEFAULT);
  const [khoavien, setKhoavien] = useState(SCHOOL_ID_DEFAULT);
  const [valueSchoolyear, setValueSchoolyear] = useState(SCHOOLYEAR_DEFAULT);
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({
    fullname: yup.string().required("please enter your fullname"),
    address: yup.string().required("please enter your address"),
    phone: yup.string().required("please enter your phone"),
    birthday: yup.string().required("please enter your birthday"),
  });
  const form = useForm({
    defaultValues: {
      Id: "",
      fullname: "",
      email: "",
      address: "",
      phone: "",
      gender: "",
      cmnd: "",
      schoolId: SCHOOL_ID_DEFAULT,
      schoolyear: SCHOOLYEAR_DEFAULT,
      program: "",
      maxcredit: 0,
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
      setValue("gender", user.gender);
      setValueGender(user.gender);
      setValue("cmnd", user.cmnd);
      setValue("schoolId", user.schoolId);
      setKhoavien(user.schoolId);
      setValue("schoolyear", user.schoolyear);
      setValueSchoolyear(user.schoolyear);
      setValue("program", user.program);
      setValue("maxcredit", user.maxcredit);
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
      value.role = ROLE_DEFAULT;
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
  const handleChangeGender = (event) => {
    setValueGender(event.target.value);
  };
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">Th??ng tin c?? nh??n</p>
      <hr style={{ opacity: "0.3", width: "100%" }} />
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <br />
        {/* id */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">M?? s??? :</div>
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
          <div className="thongtincanhan-contents-label">H??? v?? t??n :</div>
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
        {/* Ng??y sinh */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Ng??y sinh :</div>
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
        {/* ?????a ch??? */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">?????a ch??? :</div>
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

        {/* S??? ??i???n tho???i */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">S??? ??i???n tho???i :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("phone")}
              name="phone"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Ch??a c???p nh???t"
              type="number"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="phone" />
            </p>
          </div>
        </div>
        {/* CMT */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">S??? CMT/CCCD:</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("cmnd")}
              name="cmnd"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Ch??a c???p nh???t"
              type="number"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="cmnd" />
            </p>
          </div>
        </div>
        {/*Ch????ng tr??nh */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Ch????ng tr??nh :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("program")}
              name="program"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Ch??a c???p nh???t"
            />
          </div>
        </div>
        <p></p>
        {/* Kho??  */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Kho?? h???c :</div>
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
        {/* Khoa vi???n  */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Khoa/Vi???n :</div>
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
        {/*S??? t??n ch???  */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">T??n ch??? t???i ??a :</div>
          <div className="thongtincanhan-contents-input">
            <TextField
              {...register("maxcredit")}
              name="maxcredit"
              className="outlined-basic"
              variant="outlined"
              margin="dense"
              fullWidth
              type="number"
              placeholder="Ch??a c???p nh???t"
            />
          </div>
        </div>
        <p></p>
        {/* gi???i t??nh */}
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-label">Gi???i t??nh:</div>
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
                label="N???"
              />
            </RadioGroup>
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
            C???p nh???t th??ng tin
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Thongtincanhan;
