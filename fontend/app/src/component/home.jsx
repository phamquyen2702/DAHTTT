import React, { Suspense } from "react";
import {
  Switch,
  Link,
  Route,
  useRouteMatch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Loading from "./Loading";
import "./style.scss";
const Dangkihocphan = React.lazy(() => import("./dangkihocphan"));
const Thongtinsinhvien = React.lazy(() => import("./thongtinsinhvien"));
const Dangkilophoc = React.lazy(() => import("./dangkilophoc"));
function Home(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const user = localStorage.getItem("account");
  if (!user) {
    history.push("/Account");
  }

  return (
    <div className="dangki-content">
      <div className="dangki-content-left">
        <p
          style={{
            fontSize: "20px",

            color: "rgb(161, 11, 11)",
            fontWeight: "600",
            marginLeft: "15px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          Các chức năng
        </p>
        <hr style={{ width: "80%" }} />
        <br />
        {user && JSON.parse(user).role === "ROLE_SV" && <MenuSV />}
        {user && JSON.parse(user).role === "ROLE_ADMIN" && <Menuadmin />}
        {user && JSON.parse(user).role === "ROLE_TM" && <Menutm />}
      </div>
      <div className="dangki-content-right">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Redirect
              exact
              from={`${match.path}`}
              to={`${match.path}/thongtincanhan`}
            />
            <Route
              path={`${match.path}/thongtincanhan`}
              component={Thongtinsinhvien}
            />
            <Route
              path={`${match.path}/dangkihocphan`}
              component={Dangkihocphan}
            />
            <Route
              path={`${match.path}/dangkilophoc`}
              component={Dangkilophoc}
            />
            {/* <Route component={NotFound} /> */}
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
        <Link
          style={{ textDecoration: "none" }}
          to={`${match.url}/dangkilophoc`}
        >
          Đăng kí lớp học
        </Link>
      </li>
      <li style={{ paddingTop: "5px", listStyle: "none" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`${match.url}/dangkihocphan`}
        >
          Đăng kí học phần
        </Link>
      </li>
      <li style={{ paddingTop: "5px", listStyle: "none" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`${match.url}/thongtincanhan`}
        >
          Thông tin cá nhân
        </Link>
      </li>
    </ul>
  );
};
export const Menuadmin = () => {
  const match = useRouteMatch();
  return (
    <ul className="chucnang">
      <li style={{ paddingTop: "5px" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`${match.url}/quanlytaikhoan`}
        >
          Quản lý tài khoản sinh viên
        </Link>
      </li>
      <li style={{ paddingTop: "5px" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`${match.url}/quanlylophoc`}
        >
          Quản lý lớp học
        </Link>
      </li>
      <li style={{ paddingTop: "5px" }}>
        <Link style={{ textDecoration: "none" }} to={`${match.url}/detail`}>
          Thông tin tài khoản
        </Link>
      </li>
    </ul>
  );
};

export const Menutm = () => {
  const match = useRouteMatch();
  return (
    <ul className="chucnang">
      <li style={{ paddingTop: "5px" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`${match.url}/quanlyhocphan`}
        >
          Quản lý học phần
        </Link>
      </li>
      <li style={{ paddingTop: "5px" }}>
        <Link style={{ textDecoration: "none" }} to={`${match.url}/detail`}>
          Thông tin tài khoản
        </Link>
      </li>
    </ul>
  );
};
