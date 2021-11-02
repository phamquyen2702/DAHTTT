import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { lophocs } from "../dummydb/dblophocdk";
import "./style.scss";

function Dangkilophoc(props) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSave = () => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };
  const [status, setStatus] = useState(false);
  const [deletes, setDelete] = useState(false);

  const content = "Vui lòng chọn mã lớp khác,hiện tại lớp học này đã đầy";
  const title = "";

  const handleOnclick = () => {
    setStatus(true);
  };

  const handleClose = () => {
    setStatus(false);
  };
  const handleOpenDelete = () => {
    setDelete(true);
  };

  const handleCloseDelete = () => {
    setDelete(false);
  };

  const row = lophocs.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{data.malophoc}</td>
      <td>{data.mahocphan}</td>
      <td className="td-tenhocphan">{data.tenhocphan}</td>
      <td>{data.phonghoc}</td>
      <td>{data.sotinchi}</td>
      <td className="delete" onClick={handleOpenDelete}>
        Xóa
      </td>
    </tr>
  ));
  return (
    <div>
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
            onClick={handleOnclick}
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
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button
                onClick={handleClose}
                autoFocus
                style={{ background: "white", fontWeight: "600" }}
              >
                CLose
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={deletes}
            onClose={handleCloseDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`${title}`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có chắc chắn muốn xóa?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button onClick={handleCloseDelete}>Disagree</Button>
              <Button
                onClick={handleCloseDelete}
                autoFocus
                style={{ background: "white", fontWeight: "600" }}
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
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
        <Button
          onClick={handleSave}
          style={{
            width: "250px",
            margin: "30px",
            fontWeight: "400",
            background: "rgb(235, 43, 43)",
            color: "white",
            float: "right",
          }}
          variant="contained"
        >
          Lưu thay đổi
        </Button>
      </div>
      <br />
      <br />
      <br />

      <hr style={{ width: "30%", margin: "30px auto" }} className="hr-style" />
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
              <tr key={index}>
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
