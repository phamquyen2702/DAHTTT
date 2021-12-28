import React, { Suspense, useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { ROLE_DEFAULT } from "../dummydb/dataDefault";
import getCookie from "./getcookie";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Quanlyhocphan from "./quanlyhocphan/quanlyhocphan";
import Quanlylophoc from "./quanlylophoc/quanlylophoc";
import Quanlysinhvien from "./quanlytaikhoan/quanlysinhvien";
import "./style.scss";
import Thongkedangki from "./thongkedangki/thongkedangki";
import subjectApi from "../api/subjectApi";
const Dangkihocphan = React.lazy(() => import("./dangkihocphan"));
const Thongtincanhan = React.lazy(() => import("./thongtincanhan"));
const Dangkilophoc = React.lazy(() => import("./dangkilophoc"));
const Thongtinlopmo = React.lazy(() => import("./thongtinlopmo"));

const Thongtinquanly = React.lazy(() => import("./thongtinquanly"));

function Home({ user }) {
  const [semesterDk, setSemesterDk] = useState();
  const match = useRouteMatch();
  const history = useHistory();
  const account = getCookie("account");
  if (!account) {
    history.push("/Account");
  }
  useEffect(() => {
    const fectchData = async () => {
      const data = await subjectApi.getSemesterRegister();
      setSemesterDk(data);
    };
    fectchData();
  }, []);
  return (
    <div className="dangki-content">
      <div className="dangki-content-left">
        <p
          style={{
            fontSize: "20px",
            color: "rgb(161, 11, 11)",
            fontWeight: "600",
            marginLeft: "18px",
            marginBottom: "5px",
            display: "flex",
          }}
        >
          <p style={{ marginLeft: "12px", marginTop: "5px" }}>
            <DashboardIcon />
          </p>
          <span style={{ marginLeft: "12px" }}>Chức năng</span>
        </p>
        <hr style={{ width: "80%" }} />
        <div style={{ marginLeft: "10px" }}>
          {user && user.role === "ROLE_STUDENT" && <MenuSV />}
          {user && user.role === "ROLE_ADMIN" && <Menuadmin />}
          {user && user.role === "ROLE_TM" && <Menutm />}
        </div>
      </div>
      <div className="dangki-content-right">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={`${match.path}`}>
              <Redirect to={`${match.path}/thongtincanhan`} />
            </Route>
            <Route
              path={`${match.path}/thongtinsinhvien`}
              component={Thongtincanhan}
            />
            <Route path={`${match.path}/dangkihocphan`}>
              <Dangkihocphan semesterDk={semesterDk} />
            </Route>
            <Route
              path={`${match.path}/dangkilophoc`}
              component={Dangkilophoc}
            />
            <Route
              path={`${match.path}/thongtinlopmo`}
              component={Thongtinlopmo}
            />
            <Route path={`${match.path}/thongtincanhan`}>
              {user.role === ROLE_DEFAULT && <Thongtincanhan user={user} />}
              {user.role !== ROLE_DEFAULT && <Thongtinquanly user={user} />}
            </Route>
            <Route
              path={`${match.path}/quanlytaikhoan`}
              component={Quanlysinhvien}
            />
            <Route
              path={`${match.path}/quanlylophoc`}
              component={Quanlylophoc}
            />
            <Route
              path={`${match.path}/quanlyhocphan`}
              component={Quanlyhocphan}
            />
            <Route
              path={`${match.path}/thongkedangki`}
              component={Thongkedangki}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default Home;

export const MenuSV = () => {
  const match = useRouteMatch();
  return (
    <ul className="chucnang">
      <li style={{ paddingTop: "5px", listStyle: "none" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/dangkilophoc`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Đăng kí lớp học
        </NavLink>
      </li>
      <li style={{ paddingTop: "5px", listStyle: "none" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/dangkihocphan`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Đăng kí học phần
        </NavLink>
      </li>
      <li style={{ paddingTop: "5px", listStyle: "none" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/thongtincanhan`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Thông tin sinh viên
        </NavLink>
      </li>
      <li style={{ paddingTop: "5px", listStyle: "none" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/thongtinlopmo`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Thông tin lớp mở
        </NavLink>
      </li>
    </ul>
  );
};
export const Menuadmin = () => {
  const match = useRouteMatch();
  return (
    <ul className="chucnang">
      <li style={{ paddingTop: "5px" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/quanlytaikhoan`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Quản lý tài khoản sinh viên
        </NavLink>
      </li>

      <li style={{ paddingTop: "5px" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/thongtincanhan`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Thông tin cá nhân
        </NavLink>
      </li>
    </ul>
  );
};

export const Menutm = () => {
  const match = useRouteMatch();
  return (
    <ul className="chucnang">
      <li style={{ paddingTop: "5px" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/quanlyhocphan`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Quản lý học phần
        </NavLink>
      </li>
      <li style={{ paddingTop: "5px" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/quanlylophoc`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Quản lý lớp học
        </NavLink>
      </li>
      <li style={{ paddingTop: "5px" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/thongkedangki`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Thống kê đăng kí
        </NavLink>
      </li>
      <li style={{ paddingTop: "5px" }}>
        <NavLink
          style={{ textDecoration: "none" }}
          to={`${match.url}/thongtincanhan`}
          activeStyle={{
            fontWeight: "bold",
            color: "rgb(161, 11, 11)",
          }}
        >
          Thông tin tài khoản
        </NavLink>
      </li>
    </ul>
  );
};
