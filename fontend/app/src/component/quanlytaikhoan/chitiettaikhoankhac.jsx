import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import userApi from "../../api/userApi";
import { ROLE_DEFAULT } from "../../dummydb/dataDefault";
import { listRole } from "../../dummydb/role";
import "../style2.css";
import "../style3.css";

function Chitiettaikhoankhac(props) {
  const { Id } = useParams();
  const [valueRole, setValueRole] = useState(ROLE_DEFAULT);
  const [user, setUser1] = useState("");
  const { enqueueSnackbar } = useSnackbar();
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
  });
  const form = useForm({
    defaultValues: {
      Id: "",
      fullname: "",
      email: "",
      address: "",
      phone: "",
      role: ROLE_DEFAULT,
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
      setValue("role", user.role);
      setValueRole(user.role);
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

  const handleChangeRole = (event) => {
    setValueRole(event.target.value);
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
  return (
    <div className="thongtincanhan">
      <div className="thongtincanhan-content">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <p className="thongtincanhan-title">Th??ng tin c?? nh??n</p>
          <hr style={{ opacity: "0.3", width: "100%" }} />
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
                margin="dense"
                fullWidth
                placeholder="Ch??a c???p nh???t"
                disabled
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="Id" />
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
                placeholder="Ch??a c???p nh???t"
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
                placeholder="Ch??a c???p nh???t"
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
                placeholder="Ch??a c???p nh???t"
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
          {/* L???i t??i kho???n */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">
              Lo???i t??i kho???n :
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
          <br />
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
            onClick={handleBlock}
          >
            Kh??a t??i kho???n
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
            onClick={handleUnBlock}
          >
            M??? kh??a t??i kho???n
          </Button>
        )}
      </div>
    </div>
  );
}

export default Chitiettaikhoankhac;
