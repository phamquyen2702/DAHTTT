import { Button, TextField } from "@material-ui/core";
import React from "react";
import "../style2.css";
import { Pagination } from "antd";
import { Link, useRouteMatch } from "react-router-dom";

function Danhsachhocphan(props) {
  const datas = [
    {
      mahocphan: "IT4444",
      tenhocphan: "An toàn thông tin",
      sotinchi: 3,
      trangthai: "đang mở",
    },
    {
      mahocphan: "IT4444",
      tenhocphan: "An toàn thông tin",
      sotinchi: 3,
      trangthai: "đang mở",
    },
    {
      mahocphan: "IT4444",
      tenhocphan: "An toàn thông tin",
      sotinchi: 3,
      trangthai: "đang mở",
    },
    {
      mahocphan: "IT4444",
      tenhocphan: "An toàn thông tin",
      sotinchi: 3,
      trangthai: "đang mở",
    },
    {
      mahocphan: "IT4444",
      tenhocphan: "An toàn thông tin",
      sotinchi: 3,
      trangthai: "đang mở",
    },
    {
      mahocphan: "IT4444",
      tenhocphan: "An toàn thông tin",
      sotinchi: 3,
      trangthai: "đang mở",
    },
  ];
  const match = useRouteMatch();
  const row = datas.map((data, index) => (
    <tr>
      <td>{data.mahocphan}</td>
      <td>{data.tenhocphan}</td>
      <td>{data.sotinchi}</td>
      <td>{data.trangthai}</td>
      <td className="chitiet">
        <Link to={`${match.url}/chitiethocphan`}>Chi tiết</Link>
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
              label="Mã học phần"
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
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Số tín chỉ</th>
              <th>Trạng thái</th>
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

export default Danhsachhocphan;

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <Link>Previous</Link>;
  }
  if (type === "next") {
    return <Link>Next</Link>;
  }
  return originalElement;
}
