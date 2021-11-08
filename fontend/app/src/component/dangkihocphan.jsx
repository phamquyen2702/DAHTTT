import { yupResolver } from "@hookform/resolvers/yup";
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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { hocphan } from "../dummydb/dbhocphan";
import { addToCart, deleteFromCart } from "../reducers/subjectSlice";
import { DeleteOutlined } from "@ant-design/icons";
import "./style.scss";
import { Empty } from "antd";

function Dangkihocphan(props) {
  const [listTKB, setListTKB] = useState([]);
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
    setListTKB(datas);
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
    if (index >= 0) {
      try {
        const action = addToCart(hocphan[index]);
        dispatch(action);
      } catch (error) {
        setContentErr(error.message);
        setStatus(true);
      }
    } else {
      setContentErr(`Mã học phần ${getValues("search")} không tồn tại !`);
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
              label="Đăng kí theo mã HP"
              type="text"
              style={{ width: "200px", margin: "20px" }}
              required
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
              Đăng kí
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
          <Button onClick={handleCloseDelete}>Trở lại</Button>
          <Button
            onClick={handleAgreeDelete}
            autoFocus
            style={{ background: "white", fontWeight: "600" }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          {datas.length > 0 && (
            <tr>
              <th>STT</th>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Số tín chỉ</th>
              <th>Xóa đăng kí</th>
            </tr>
          )}

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
                  <DeleteOutlined />
                </td>
              </tr>
            ))}
          {datas.length === 0 && (
            <Empty
              style={{
                color: "red",
                fontWeight: "600",
                fontStyle: "italic",
                fontSize: "13px",
              }}
              description="Đăng kí ngay( Empty)"
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            />
          )}
        </table>
      </div>
      <br />
      <br />
      <br />
      {datas.length > 0 && (
        <Button
          onClick={handleSave}
          style={{
            width: "250px",
            margin: "10px",
            fontWeight: "600",
            float: "right",
            background: "rgb(235, 43, 43)",
            color: "white",
          }}
          variant="contained"
        >
          Gửi yêu cầu
        </Button>
      )}
      <br />
      <br />
      <br />
      <hr style={{ width: "97%", margin: "30px auto" }} className="hr-style" />
      <div className="dk-footer">
        <p className="dk-footer-title">Danh sách học phần đã đăng kí</p>
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            {listTKB.length > 0 && (
              <tr>
                <th>STT</th>
                <th>Mã học phần</th>
                <th>Tên học phần</th>
                <th>Số tín chỉ</th>
              </tr>
            )}

            {listTKB.map((data, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{data.mahocphan}</td>
                <td>{data.tenhocphan}</td>
                <td>{data.sotinchi}</td>
              </tr>
            ))}
          </table>
          {listTKB.length === 0 && (
            <Empty
              style={{
                color: "red",
                fontWeight: "600",
                fontStyle: "italic",
                fontSize: "13px",
              }}
              description="Tạm trống( Empty)"
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dangkihocphan;
