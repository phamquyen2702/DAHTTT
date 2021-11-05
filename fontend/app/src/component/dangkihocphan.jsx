import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hocphan } from "../dummydb/dbhocphan";
import { addToCart, deleteFromCart } from "../reducers/subjectSlice";
import "./style.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Dangkihocphan(props) {
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      search: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, getValues } = form;
  const handleSave = () => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };
  const dispatch = useDispatch();
  //redux
  const datas = useSelector((state) => state.subject.cartItems);
  const [remove, setRemove] = useState(false);
  const [status, setStatus] = useState(false);
  const [contentErr, setContentErr] = useState("");
  const [mahocphanRemove, setMahocphanRemove] = useState("");

  const content = "Bạn có chắc chắn muốn xóa?";

  const title = "";

  const handleOpenDelete = (value) => {
    setMahocphanRemove(value);
    setRemove(true);
  };

  const handleAgreeDelete = () => {
    const action = deleteFromCart(mahocphanRemove);
    dispatch(action);
    setRemove(false);
    setMahocphanRemove("");
  };
  const handleCloseDelete = () => {
    setRemove(false);
  };
  const handleClose = () => {
    setStatus(false);
  };

  const handleOnSubmit = () => {
    const index = hocphan.findIndex((x) => x.mahocphan === getValues("search"));

    if (index >= 0 && !datas.includes(hocphan[index])) {
      const action = addToCart(hocphan[index]);
      dispatch(action);
    } else {
      setContentErr(
        `Mã học phần ${getValues("search")} không tồn tại hoặc đã được đăng kí!`
      );
      setStatus(true);
    }
    form.reset();
  };

  return (
    <div>
      <div className="search-header">
        <div className="search-malop">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField
              {...register("search")}
              name="search"
              autoFocus
              id="outlined-input"
              label="Mã học phần"
              type="text"
              style={{ width: "200px", margin: "20px" }}
            />
            <Button
              type="submit"
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
          </form>
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
            {contentErr}
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
        open={remove}
        onClose={handleCloseDelete}
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
          <Button onClick={handleCloseDelete}>Disagree</Button>
          <Button
            onClick={handleAgreeDelete}
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
          {datas &&
            datas.map((data, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{data.mahocphan}</td>
                <td>{data.tenhocphan}</td>
                <td>{data.sotinchi}</td>
                <td
                  className="delete"
                  onClick={() => handleOpenDelete(data.mahocphan)}
                >
                  Xóa
                </td>
              </tr>
            ))}
        </table>
      </div>
      <br />
      <br />
      <br />
      <Button
        onClick={handleSave}
        style={{
          width: "250px",
          margin: "10px",
          fontWeight: "400",
          background: "rgb(235, 43, 43)",
          color: "white",
          float: "right",
        }}
        variant="contained"
      >
        Gửi đăng kí
      </Button>
    </div>
  );
}

export default Dangkihocphan;
