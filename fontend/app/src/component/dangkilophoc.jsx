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
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { lophocs } from "../dummydb/dblophocdk";
import { addToCart, deleteFromCart } from "../reducers/classSlice";
import { DeleteOutlined } from "@ant-design/icons";
import "./style.scss";
import { Empty } from "antd";
import getCookie from "./getcookie";

//sum tin chỉ
function sumTinchi(datas) {
  let sum = 0;
  for (let i = 0; i < datas.length; i++) {
    sum = sum + datas[i].sotinchi;
  }
  return sum;
}
function Dangkilophoc(props) {
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      search: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, getValues } = form;
  const [contentErr, setContentErr] = useState("");
  const [malophocRemove, setMalophocRemove] = useState("");
  const [listTKB, setListTKB] = useState([]);
  const [tongtinchi, setTongtinchi] = useState(0);

  const handleSave = () => {
    setListTKB(datas);
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };
  const dispatch = useDispatch();
  //redux
  const datas = useSelector((state) => state.class.cartItems);

  const [status, setStatus] = useState(false);
  const [remove, setRemove] = useState(false);
  const title = "";

  useEffect(() => {
    setTongtinchi(sumTinchi(datas));
  }, [datas]);

  const handleOnSubmit = () => {
    const index = lophocs.findIndex((x) => x.malophoc === getValues("search"));

    if (index >= 0) {
      try {
        const action = addToCart(lophocs[index]);
        dispatch(action);
      } catch (error) {
        setContentErr(error.message);
        setStatus(true);
      }
    } else {
      setContentErr(`Mã lớp học ${getValues("search")} không tồn tại !`);
      setStatus(true);
    }
    form.reset();
  };

  const handleClose = () => {
    setStatus(false);
  };

  const handleCloseDelete = () => {
    setRemove(false);
  };
  const handleOpenDelete = (value) => {
    setMalophocRemove(value);
    setRemove(true);
  };

  const handleAgreeDelete = () => {
    const action = deleteFromCart(malophocRemove);
    dispatch(action);
    setRemove(false);
    setMalophocRemove("");
  };
  return (
    <div>
      <div className="search-header">
        <div className="search-malop">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField
              name="search"
              {...register("search")}
              autoFocus
              id="outlined-input"
              label="Đăng kí theo mã LH"
              type="text"
              style={{ width: "200px", margin: "20px" }}
              required
            />
            <Button
              type="onSubmit"
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
                Bạn có chắc chắn muốn xóa?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button onClick={handleCloseDelete}>trở lại</Button>
              <Button
                onClick={handleAgreeDelete}
                autoFocus
                style={{ background: "white", fontWeight: "600" }}
              >
                đồng ý
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="search-hearder-right">
          Số tín chỉ đã đăng kí : {tongtinchi}
        </div>
      </div>

      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          {datas.length > 0 && (
            <tr>
              <th>STT</th>
              <th>Mã lớp học</th>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Phòng học</th>
              <th>Số tín chỉ</th>
              <th>Xóa đăng kí</th>
            </tr>
          )}

          {datas.map((data, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{data.malophoc}</td>
              <td>{data.mahocphan}</td>
              <td className="td-tenhocphan">{data.tenhocphan}</td>
              <td>{data.phonghoc}</td>
              <td>{data.sotinchi}</td>
              <td
                className="delete"
                onClick={() => handleOpenDelete(data.malophoc)}
              >
                <DeleteOutlined />
              </td>
            </tr>
          ))}
        </table>
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
        <Button
          onClick={handleSave}
          style={{
            width: "250px",
            margin: "30px",
            fontWeight: "600",
            float: "right",
            background: "rgb(235, 43, 43)",
            color: "white",
          }}
          variant="contained"
        >
          Gửi yêu cầu
        </Button>
      </div>
      <br />
      <br />
      <br />
      <hr style={{ width: "95%", margin: "30px auto" }} className="hr-style" />
      <div className="dk-footer">
        <p className="dk-footer-title">Thời khóa biểu chi tiết</p>
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            {listTKB.length > 0 && (
              <tr>
                <th>STT</th>
                <th>Mã học phần</th>
                <th>Tên học phần</th>
                <th>Phòng học</th>
                <th>Thời gian</th>
                <th>Thứ</th>
              </tr>
            )}

            {listTKB.map((data, index) => (
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

export default Dangkilophoc;
