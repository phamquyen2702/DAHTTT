import React, { Suspense } from "react";
import {
  NavLink,
  Redirect,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import Loading from "../Loading";
import "../style2.css";
const Danhsachlophoc = React.lazy(() => import("./danhsachlophoc"));
const Themlophoc = React.lazy(() => import("./themlophoc"));
const Chucnangkhac = React.lazy(() => import("../chucnangkhac"));
const Chitietlophoc = React.lazy(() => import("./chitietlophoc"));

function Quanlylophoc(props) {
  const match = useRouteMatch();
  return (
    <div>
      <hr style={{ width: "100%", margin: "10px auto" }} className="hr-style" />
      <div className="quanlysinhvien-top">
        <div className="quanlysinhvien-bt">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`${match.url}/danhsachlophoc`}
            activeStyle={{
              fontWeight: "bold",
              color: "rgb(161, 11, 11)",
              transition: "0.1s",
            }}
          >
            Danh sách lớp học
          </NavLink>
        </div>
        <div className="quanlysinhvien-bt">
          <NavLink
            style={{ textDecoration: "none" }}
            to={`${match.url}/themlophoc`}
            activeStyle={{
              fontWeight: "bold",
              color: "rgb(161, 11, 11)",
              transition: "0.1s",
            }}
          >
            Thêm lớp học
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
              to={`${match.path}/danhsachlophoc`}
            />

            <Route
              exact
              path={`${match.path}/danhsachlophoc`}
              component={Danhsachlophoc}
            />
            <Route
              path={`${match.path}/danhsachlophoc/chitietlophoc`}
              component={Chitietlophoc}
            />
            <Route path={`${match.path}/themlophoc`} component={Themlophoc} />
            <Route
              path={`${match.path}/chucnangkhac`}
              component={Chucnangkhac}
            />

            {/* <Route component={NotFound} /> */}
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default Quanlylophoc;
