import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import "./style.scss";
const hocphan = [
  {
    mahocphan: "IT4444",
    malop: "112313",
    toida: 45,
    sotinchi: 3,
  },
];

function Thongtinlopmo(props) {
  const { enqueueSnackbar } = useSnackbar();
  const handleThem = () => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };
  const row = hocphan.map((data, index) => (
    <tr>
      <td>{index}</td>
      <td>{data.mahocphan}</td>
      <td>{data.malop}</td>
      <td>{data.sotinchi}</td>
      <td>{data.toida}</td>
      <td className="them" onClick={handleThem}>
        Thêm
      </td>
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
            autoFocus
          />
          <Button
            style={{
              width: "250px",
              margin: "32px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
          >
            Tìm kiếm theo Mã HP
          </Button>
        </div>
        <div className="search-hearder-right">Tìm thấy n kết quả</div>
      </div>

      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          <tr>
            <th>STT</th>
            <th>Mã học phần</th>
            <th>Mã Lớp</th>
            <th>Số tín chỉ</th>
            <th>Tối đa</th>
            <th>Thêm vào D/S đăng kí</th>
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

export default Thongtinlopmo;
