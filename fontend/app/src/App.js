import React, { Suspense, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
//import "antd/dist/antd.css";
import Loading from "./component/Loading";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./component/style.scss";

const Formlogin = React.lazy(() => import("./component/formlogin"));
const Dangkilop = React.lazy(() => import("./component/dangkilop"));
// const Register = React.lazy(() => import("./containers/register"));
// const Admin = React.lazy(() => import("./containers/adminpage"));

const App = () => {
  const [account, setAccount] = useState("Phạm Văn Quyền");
  localStorage.setItem("account", account);

  const handleClick = () => {
    setAccount("");
    console.log(localStorage.getItem("account"));
  };
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
          <div
            className="header-account"
            style={{
              display: (`${account}` === "") | null ? "none" : "block",
            }}
          >
            <div className="header-account-top">
              <div className="header-account-icon">
                <UserOutlined className="site-form-item-icon" />
              </div>
              <div className="header-account-name">
                {localStorage.getItem("account")}
              </div>
            </div>
            <div className="header-account-bot">
              <p className="dangxuat" to="" onClick={handleClick}>
                Đăng xuất
              </p>
              <Link className="doipass" to="">
                Đổi mật khẩu
              </Link>
            </div>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Redirect exact from="/" to="/Account" />
            <Route exact path="/Account" component={Formlogin} />
            <Route exact path="/dangkilop" component={Dangkilop} />

            {/* <Route component={NotFound} /> */}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
