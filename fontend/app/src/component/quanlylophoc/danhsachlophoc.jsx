import { Button, TextField } from "@material-ui/core";
import { Pagination } from "antd";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import { lophocs } from "../../dummydb/dblophocdk";
import "../style2.css";

function Danhsachlophoc(props) {
  const match = useRouteMatch();
  const row = lophocs.map((data, index) => (
    <tr>
      <td>{data.malophoc}</td>
      <td>{data.phonghoc}</td>
      <td>{data.mahocphan}</td>
      <td>{data.max}</td>
      <td className="chitiet">
        <Link to={`${match.url}/chitietlophoc`}>
          <FormOutlined />
        </Link>
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
              label="Mã lớp học"
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
              <th>Mã lớp học</th>
              <th>Phòng học</th>
              <th>Mã học phần</th>
              <th>Số lượng sinh viên</th>
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

export default Danhsachlophoc;

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <Link>Previous</Link>;
  }
  if (type === "next") {
    return <Link>Next</Link>;
  }
  return originalElement;
}
