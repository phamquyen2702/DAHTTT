import { Button, FormControl, TextField } from "@material-ui/core";
import React from "react";
import "./style.scss";

function Dangkilophoc(props) {
  const lophocs = [
    {
      malophoc: "1991231",
      mahocphan: "IT4444",
      tenhocphan: "Phân tích và thiết kế hệ thống thông tin",
      phonghoc: "TC401",
      sotinchi: 3,
    },
    {
      malophoc: "1991231",
      mahocphan: "IT4455",
      tenhocphan: "Đồ án 3",
      phonghoc: "TC401",
      sotinchi: 2,
    },
    {
      malophoc: "1991231",
      mahocphan: "IT4455",
      tenhocphan: "Đồ án 3",
      phonghoc: "TC401",
      sotinchi: 2,
    },
    {
      malophoc: "1991231",
      mahocphan: "IT4455",
      tenhocphan: "Đồ án 3",
      phonghoc: "TC401",
      sotinchi: 2,
    },
  ];

  const row = lophocs.map((data, index) => (
    <tr>
      <td>{index}</td>
      <td>{data.malophoc}</td>
      <td>{data.mahocphan}</td>
      <td className="td-tenhocphan">{data.tenhocphan}</td>
      <td>{data.phonghoc}</td>
      <td>{data.sotinchi}</td>
      <td>Xóa</td>
    </tr>
  ));
  return (
    <div>
      <div className="search-header">
        <div className="search-malop">
          <TextField
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
            Đăng kí ngay
          </Button>
        </div>
        <div className="search-hearder-right">Số tín chỉ tối đa: 24</div>
      </div>

      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          <tr>
            <th>STT</th>
            <th>Mã lớp học</th>
            <th>Mã học phần</th>
            <th>Tên học phần</th>
            <th>Phòng học</th>
            <th>Số tín chỉ</th>
            <th>Thay đổi</th>
          </tr>
          {row}
        </table>
      </div>
      <br />
      <br />
      <br />

      <hr style={{ width: "50%", margin: "10px auto" }} className="hr-style" />
      <div className="dk-footer">
        <p className="dk-footer-title">Thời khóa biểu chi tiết</p>
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            <tr>
              <th>STT</th>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Phòng học</th>
              <th>Thời gian</th>
              <th>Thứ</th>
            </tr>
            {lophocs.map((data, index) => (
              <tr>
                <td>{index}</td>
                <td>{data.malophoc}</td>
                <td>{data.mahocphan}</td>
                <td className="td-tenhocphan">{data.tenhocphan}</td>
                <td>{data.phonghoc}</td>
                <td>{data.sotinchi}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dangkilophoc;
