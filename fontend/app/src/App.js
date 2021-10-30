import React, { useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Formlogin from "./component/formlogin";
import { UserOutlined } from "@ant-design/icons";
import "./component/style.scss";
import Home from "./component/home";
import Footer from "./component/footer";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("account");
    if (!localStorage.getItem("account")) {
      window.location.reload();
    }
  };
  let user = "";
  if (localStorage.getItem("account")) {
    user = JSON.parse(localStorage.getItem("account"));
  }

  return (
    <div className="body">
      <BrowserRouter>
        <div className="header">
          <div className="header-logo">
            <div className="logo"></div>
          </div>
          <div className="header-title">
            <h3>ĐĂNG KÍ HỌC TẬP</h3>
            <h2>TRƯỜNG ĐẠI HỌC BÁCH KHÓA HÀ NỘI</h2>
          </div>
          {user && <Logout handleLogout={handleLogout} user={user} />}
        </div>

        <Switch>
          <Redirect exact from="/" to="/Account" />
          <Route path="/Account" component={Formlogin} />
          <Route path="/home" component={Home} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;

export const Logout = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const handleshowDialog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSub = () => {
    setOpen(false);

    localStorage.removeItem("account");
    window.location.reload();
  };
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
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <DialogContent className="dialogpass">
            <DialogContentText style={{ color: "red", paddingBottom: "20px" }}>
              Nhập đầy đủ thông tin.
            </DialogContentText>
            <TextField
              margin="dense"
              autoFocus
              label="Mật khẩu hiện tại"
              type="password"
              fullWidth
              variant="filled"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Mật khẩu mới"
              type="password"
              fullWidth
              variant="filled"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Xác nhận mật khẩu"
              type="password"
              fullWidth
              variant="filled"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Trở lại</Button>
            <Button onClick={handleSub}>Xác nhận</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
