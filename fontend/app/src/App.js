import { UserOutlined } from "@ant-design/icons";
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
import "antd/dist/antd.css";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as yup from "yup";
import Footer from "./component/footer";
import Formlogin from "./component/formlogin";
import Home from "./component/home";
import NotFound from "./component/NotFound";
import "./component/style.scss";
function getUserByEmail(dbaccount, account) {
  for (let i = 0; i < dbaccount.length; i++) {
    if (dbaccount[i].email === account.email) {
      return dbaccount[i];
      // eslint-disable-next-line no-unreachable
      break;
    }
  }
}
const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("account");
    if (!localStorage.getItem("account")) {
      window.location.reload();
    }
  };

  let user = "";
  if (localStorage.getItem("account")) {
    const dbaccount = JSON.parse(localStorage.getItem("dbaccount"));
    const account = JSON.parse(localStorage.getItem("account"));
    user = getUserByEmail(dbaccount, account);
  }

  return (
    <div className="body">
      <BrowserRouter>
        <div className="header">
          <div className="header-logo">
            <a href="https://ctt.hust.edu.vn/">
              <div className="logo" title="ctt.hust.edu.vn"></div>
            </a>
          </div>
          <div className="header-title">
            <h3>ĐĂNG KÍ HỌC TẬP</h3>
            <h2>TRƯỜNG ĐẠI HỌC BÁCH KHÓA HÀ NỘI</h2>
          </div>
          {user && <Logout handleLogout={handleLogout} user={user} />}
        </div>

        <Switch>
          <Redirect exact from="/" to="/Account" />
          <Route path="/Account">
            {user ? <Redirect to="/home" /> : <Formlogin />}
          </Route>

          <Route path="/home" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;

export const Logout = ({ user, handleLogout }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleshowDialog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnSubmit = () => {
    setOpen(false);
    localStorage.removeItem("account");
    enqueueSnackbar("Success and Login", {
      variant: "success",
    });
    window.location.reload();
  };
  const schema = yup.object().shape({
    password: yup.string().required("please enter your password"),
    newpassword: yup
      .string()
      .required("please enter your new password")
      .min(6, "Please enter at least 6 characters"),
    retypepassword: yup
      .string()
      .required("please require your password")
      .oneOf([yup.ref("newpassword")], "Password does not match"),
  });
  const form = useForm({
    defaultValues: {
      password: "",
      newpassword: "",
      retypepassword: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <div className="header-account">
      <div className="header-account-top">
        <div className="header-account-icon">
          <UserOutlined className="site-form-item-icon" />
        </div>
        <div className="header-account-name">{user.name}</div>
      </div>
      <div className="header-account-bot">
        <button className="dangxuat doipass" onClick={handleLogout}>
          Đăng xuất
        </button>
        <button className="doipass" onClick={handleshowDialog}>
          Đổi mật khẩu
        </button>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <DialogContent className="dialogpass" style={{ minWidth: "500px" }}>
              <DialogContentText
                style={{
                  color: "red",
                  paddingBottom: "20px",
                  fontWeight: "500",
                  fontSize: "22px",
                }}
              >
                Đổi mật khẩu!
                <hr style={{ opacity: "0.3" }} />
              </DialogContentText>
              <TextField
                name="password"
                {...register("password")}
                margin="dense"
                autoFocus
                label="Mật khẩu hiện tại"
                type="password"
                fullWidth
                variant="outlined"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="password" />
              </p>
              <TextField
                name="newpassword"
                {...register("newpassword")}
                margin="dense"
                label="Mật khẩu mới"
                type="password"
                fullWidth
                variant="outlined"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="newpassword" />
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Trở lại</Button>
              <Button type="submit">Xác nhận</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};
