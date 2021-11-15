import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./style.scss";
function Dangki({ open, handleCloseDK }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleOnSubmitDK = () => {
    handleCloseDK();
    enqueueSnackbar("Success", {
      variant: "success",
    });
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
    retypepassword: yup
      .string()
      .required("please require your password")
      .oneOf([yup.ref("password")], "Password does not match"),
    fullname: yup.string().required("please enter your fullname"),
    address: yup.string().required("please enter your address"),
    phone: yup.string().required("please enter your phone"),
    birthday: yup.string().required("please enter your birthday"),
  });
  const formDK = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypepassword: "",
      birthday: "",
      address: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formDK;
  return (
    <>
      <Dialog open={open} onClose={handleCloseDK}>
        <form onSubmit={handleSubmit(handleOnSubmitDK)}>
          <DialogContent
            className="dialogpass"
            style={{ minWidth: "550px", minHeight: "300px" }}
          >
            <DialogContentText
              style={{
                color: "red",
                paddingBottom: "20px",
                fontWeight: "500",
                fontSize: "22px",
              }}
            >
              Đăng kí Tài khoản
              <hr style={{ opacity: "0.3" }} />
            </DialogContentText>
            <TextField
              name="fullname"
              {...register("fullname")}
              margin="dense"
              autoFocus
              label="Họ tên"
              type="text"
              fullWidth
              variant="outlined"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="fullname" />
            </p>
            <TextField
              name="email"
              {...register("email")}
              margin="dense"
              autoFocus
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="email" />
            </p>
            <TextField
              name="password"
              {...register("password")}
              margin="dense"
              label="Mật khẩu"
              type="password"
              fullWidth
              variant="outlined"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="password" />
            </p>
            <TextField
              name="retypepassword"
              {...register("retypepassword")}
              margin="dense"
              label="Xác nhận mật khẩu"
              type="password"
              fullWidth
              variant="outlined"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="retypepassword" />
            </p>
            <TextField
              name="phone"
              {...register("phone")}
              margin="dense"
              label="Điện thoại"
              type="text"
              fullWidth
              variant="outlined"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="phone" />
            </p>
            <TextField
              name="address"
              {...register("address")}
              margin="dense"
              label="Địa chỉ"
              type="text"
              fullWidth
              variant="outlined"
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="address" />
            </p>
            <TextField
              name="birthday"
              {...register("birthday")}
              margin="dense"
              label="Ngày sinh"
              fullWidth
              variant="outlined"
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
              <ErrorMessage errors={errors} name="birthday" />
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDK}>Trở lại</Button>
            <Button type="submit">Đăng kí</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Dangki;
