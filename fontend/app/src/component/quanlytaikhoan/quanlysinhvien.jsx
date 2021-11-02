import React, { Suspense } from "react";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Loading from "../Loading";
import NotFound from "../NotFound";
import "../style2.css";
const Danhsachtaikhoan = React.lazy(() => import("./danhsachtaikhoan"));
const Themtaikhoan = React.lazy(() => import("./themtaikhoan"));
const Chucnangkhac = React.lazy(() => import("./chucnangkhac"));
const Chitiettaikhoan = React.lazy(() => import("./chitiettaikhoan"));

function Quanlysinhvien(props) {
  const match = useRouteMatch();
  return (
    <div>
      <hr style={{ width: "100%", margin: "10px auto" }} className="hr-style" />
      <div className="quanlysinhvien-top">
        <div className="quanlysinhvien-bt">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`${match.url}/danhsachtaikhoan`}
            activeStyle={{
              fontWeight: "bold",
              color: "rgb(161, 11, 11)",
              transition: "0.1s",
            }}
          >
            Danh sách tài khoản
          </NavLink>
        </div>
        <div className="quanlysinhvien-bt">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`${match.url}/themtaikhoan`}
            activeStyle={{
              fontWeight: "bold",
              color: "rgb(161, 11, 11)",
              transition: "0.1s",
            }}
          >
            Thêm tài khoản
          </NavLink>
        </div>
        <div className="quanlysinhvien-bt">
          <NavLink
            style={{ textDecoration: "none", width: "100%" }}
            to={`${match.url}/chucnangkhac`}
            activeStyle={{
              fontWeight: "bold",
              color: "rgb(161, 11, 11)",
              transition: "0.1s",
            }}
          >
            Chức năng khác
          </NavLink>
        </div>
      </div>
      <div className="quanlysinhvien-content">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Redirect
              exact
              from={`${match.path}`}
              to={`${match.path}/danhsachtaikhoan`}
            />
            <Route
              exact
              path={`${match.path}/danhsachtaikhoan`}
              component={Danhsachtaikhoan}
            />
            <Route
              path={`${match.path}/danhsachtaikhoan/chitiettaikhoan`}
              component={Chitiettaikhoan}
            />
            <Route
              path={`${match.path}/themtaikhoan`}
              component={Themtaikhoan}
            />
            <Route
              path={`${match.path}/chucnangkhac`}
              component={Chucnangkhac}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default Quanlysinhvien;
