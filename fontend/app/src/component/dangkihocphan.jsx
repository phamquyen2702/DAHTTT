import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import { hocphan } from "../dummydb/dbhocphan";
import "./style.scss";

function Dangkihocphan(props) {
  const [status, setStatus] = useState(false);

  const content = "Bạn có chắc chắn muốn xóa?";

  const title = "";

  const handleDelete = () => {
    setStatus(true);
  };

  const handleClose = () => {
    setStatus(false);
  };
  return (
    <div>
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
            Đăng kí ngay
          </Button>
        </div>
        <div className="search-hearder-right">Số tín chỉ tối đa: 24</div>
      </div>
      <Dialog
        open={status}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`${title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={handleClose}
            autoFocus
            style={{ background: "white", fontWeight: "600" }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          <tr>
            <th>STT</th>
            <th>Mã học phần</th>
            <th>Tên học phần</th>
            <th>Số tín chỉ</th>
            <th>Thay đổi</th>
          </tr>
          {hocphan &&
            hocphan.map((data, index) => (
              <tr>
                <td>{index}</td>
                <td>{data.mahocphan}</td>
                <td>{data.tenhocphan}</td>
                <td>{data.sotinchi}</td>
                <td className="delete" onClick={handleDelete}>
                  Xóa
                </td>
              </tr>
            ))}
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
