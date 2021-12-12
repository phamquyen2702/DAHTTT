import { Button, MenuItem, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { lophocs } from "../dummydb/dblophocdk";
import { addToCart } from "../reducers/classSlice";
import "./style.scss";
import { PlusCircleOutlined } from "@ant-design/icons";
import { listkhoavien } from "../dummydb/khoavien";

function Thongtinlopmo(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleThem = (data) => {
    try {
      const action = addToCart(data);
      dispatch(action);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const row = lophocs.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{data.malophoc}</td>
      <td>{data.mahocphan}</td>
      <td>{data.tenhocphan}</td>
      <td>{data.sotinchi}</td>
      <td>{data.max}</td>
      <td className="them" onClick={() => handleThem(data)}>
        <PlusCircleOutlined />
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="search-header">
        <div className="search-malop">
          <TextField
            id="outlined-input"
            label="Tìm kiếm theo mã học phần"
            type="text"
            style={{ width: "230px", margin: "20px" }}
            autoFocus
            variant="outlined"
            size="small"
          />
          <TextField
            select
            id="outlined-input"
            label="Tìm kiếm theo Khoa/viện"
            style={{ width: "250px", margin: "20px" }}
            variant="outlined"
            size="small"
            value={currency}
            onChange={handleChange}
          >
            {listkhoavien.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            style={{
              width: "200px",
              margin: "20px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
          >
            Tìm kiếm
          </Button>
        </div>
      </div>

      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          <tr>
            <th>STT</th>
            <th>Mã Lớp</th>
            <th>Mã học phần</th>
            <th>Tên học phân</th>
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
