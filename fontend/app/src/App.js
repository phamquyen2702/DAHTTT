import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Formlogin from "./component/formlogin";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./component/style.scss";
import Home from "./component/home";
import Footer from "./component/footer";

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
  return (
    <div className="header-account">
      <div className="header-account-top">
        <div className="header-account-icon">
          <UserOutlined className="site-form-item-icon" />
        </div>
        <div className="header-account-name">{user.name}</div>
      </div>
      <div className="header-account-bot">
        <p className="dangxuat" onClick={handleLogout}>
          Đăng xuất
        </p>
        <Link className="doipass" to="">
          Đổi mật khẩu
        </Link>
      </div>
    </div>
  );
};
