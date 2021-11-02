import { Button, TextField } from "@material-ui/core";
import { Pagination } from "antd";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import "../style2.css";

function Danhsachtaikhoan(props) {
  const datas = [
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lopsinhvien: "CNTT 2.1",
      status: "Đã đăng kí",
    },
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lopsinhvien: "CNTT 2.1",
      status: "Đã đăng kí",
    },
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lopsinhvien: "CNTT 2.1",
      status: "Đã đăng kí",
    },
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lopsinhvien: "CNTT 2.1",
      status: "Đã đăng kí",
    },
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lopsinhvien: "CNTT 2.1",
      status: "Đã đăng kí",
    },
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lopsinhvien: "CNTT 2.1",
      status: "Đã đăng kí",
    },
  ];
  const match = useRouteMatch();
  const row = datas.map((data, index) => (
    <tr>
      <td>{data.masinhvien}</td>
      <td>{data.fullname}</td>
      <td>{data.lopsinhvien}</td>
      <td>{data.status}</td>
      <td className="chitiet">
        <Link to={`${match.url}/chitiettaikhoan`}>Chi tiết</Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="quanlysinhvien-content">
        <div className="search-header">
          <div className="search-malop">
            <TextField
              autoFocus
              id="outlined-input"
              label="Mã sinh viên"
              type="text"
              style={{ width: "200px", margin: "20px" }}
            />
            <Button
              style={{
                width: "150px",
                margin: "32px",
                fontWeight: "400",
                background: "rgb(235, 43, 43)",
                color: "white",
              }}
              variant="contained"
            >
              Tìm kiếm
            </Button>
          </div>
          <div className="search-hearder-right"></div>
        </div>

        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            <tr>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Lớp</th>
              <th>Tình trạng đăng kí</th>
              <th>Chi tiết</th>
            </tr>
            {row}
          </table>
        </div>
        <br />
        <br />
        <br />
        <Pagination
          total={500}
          itemRender={itemRender}
          style={{ float: "right", marginRight: "15px" }}
        />
      </div>

      <Button
        style={{
          width: "200px",
          marginLeft: "10px",
          fontWeight: "400",
          background: "rgb(235, 43, 43)",
          color: "white",
        }}
        variant="contained"
      >
        Export file excel
      </Button>
    </div>
  );
}

export default Danhsachtaikhoan;

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <Link>Previous</Link>;
  }
  if (type === "next") {
    return <Link>Next</Link>;
  }
  return originalElement;
}
