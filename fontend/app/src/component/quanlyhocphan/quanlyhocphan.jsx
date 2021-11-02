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
const Danhsachhocphan = React.lazy(() => import("./danhsachhocphan"));
const Themhocphan = React.lazy(() => import("./themhocphan"));
const Chucnangkhac = React.lazy(() => import("./chucnangkhac"));
const Chitiethocphan = React.lazy(() => import("./chitiethocphan"));

function Quanlyhocphan(props) {
  const match = useRouteMatch();
  return (
    <div>
      <hr style={{ width: "100%", margin: "10px auto" }} className="hr-style" />
      <div className="quanlysinhvien-top">
        <div className="quanlysinhvien-bt">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`${match.url}/danhsachhocphan`}
            activeStyle={{
              fontWeight: "bold",
              color: "rgb(161, 11, 11)",
              transition: "0.1s",
            }}
          >
            Danh sách học phần
          </NavLink>
        </div>
        <div className="quanlysinhvien-bt">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`${match.url}/themhocphan`}
            activeStyle={{
              fontWeight: "bold",
              color: "rgb(161, 11, 11)",
              transition: "0.1s",
            }}
          >
            Thêm học phần
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
              to={`${match.path}/danhsachhocphan`}
            />

            <Route
              exact
              path={`${match.path}/danhsachhocphan`}
              component={Danhsachhocphan}
            />
            <Route
              path={`${match.path}/danhsachhocphan/chitiethocphan`}
              component={Chitiethocphan}
            />
            <Route path={`${match.path}/themhocphan`} component={Themhocphan} />
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

export default Quanlyhocphan;
