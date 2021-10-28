import { Button, TextField } from "@material-ui/core";
import React from "react";
import "./style.scss";
const hocphan = [
  {
    mahocphan: "IT4444",
    tenhocphan: "Phân tích và thiết kế hệ thống thông tin",
    sotinchi: 3,
  },
  {
    mahocphan: "IT4455",
    tenhocphan: "Đồ án 3",
    sotinchi: 2,
  },
  {
    mahocphan: "IT4455",
    tenhocphan: "Đồ án 3",
    sotinchi: 2,
  },
];

function Dangkihocphan(props) {
  const row = hocphan.map((data, index) => (
    <tr>
      <td>{index}</td>
      <td>{data.mahocphan}</td>
      <td>{data.tenhocphan}</td>
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
            Đăng kí ngay
          </Button>
        </div>
        <div className="search-hearder-right">Số tín chỉ tối đa: 24</div>
      </div>

      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          <tr>
            <th>STT</th>
            <th>Mã học phần</th>
            <th>Tên học phần</th>
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
    </div>
  );
}

export default Dangkihocphan;
