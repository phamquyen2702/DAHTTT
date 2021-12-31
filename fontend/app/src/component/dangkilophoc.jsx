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
import * as yup from "yup";
import { addToCart, deleteFromCart } from "../reducers/classSlice";
import { DeleteOutlined } from "@ant-design/icons";
import "./style.scss";
import { Empty } from "antd";
import getCookie from "./getcookie";
import classApi from "../api/classApi";
import userApi from "../api/userApi";
import { TimeStartConvert,TimeEndConvert } from "../dummydb/time";

function countCredit(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i].credit;
  }
  return sum;
}
function Dangkilophoc({ semesterDk }) {
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      classId: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit } = form;
  const [contentErr, setContentErr] = useState("");
  const [malophocRemove, setMalophocRemove] = useState("");
  const [listTKB, setListTKB] = useState([]);
  const [creditUser, setCreditUser] = useState(0);
  const datas = getCookie("cartDKLH") ? JSON.parse(getCookie("cartDKLH")) : [];

  useEffect(() => {
    const fectchData = async () => {
      const account = getCookie("account");
      const user = await userApi.get({ email: JSON.parse(account).email });
      setCreditUser(user.accounts[0].maxcredit);
      const param = {
        Id: user.accounts[0].Id,
        semester: semesterDk,
      };
      const dataC = await classApi.getRegisterClass(param);

      let dataClass = [];
      for (let i = 0; i < dataC.length; i++) {
        const x = await classApi.get(dataC[i].classId);
        dataClass.push(x[0]);
      }
      setListTKB(dataClass);
    };
    fectchData();
  }, [semesterDk]);
  const handleSave = async () => {
    const datalist = {};
    datalist.classes = datas;
    try {
      const registerClass = await classApi.registerClass(datalist);
      if (registerClass === true) {
        window.location.reload();
        enqueueSnackbar("success", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log("error",error.response.data.detail)
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  const [status, setStatus] = useState(false);
  const [remove, setRemove] = useState(false);
  const title = "";
  const handleOnSubmit = async (value) => {
    const existClass = await classApi.checkClassId(value.classId);
    let sum = countCredit(datas);

    if (existClass === true) {
      const data = await classApi.get(value.classId);
      const dataAll = {
        datal: data[0],
        maxcredit: creditUser,
        sumCredit: sum,
      };
      try {
        addToCart(datas, dataAll);
      } catch (error) {
        setContentErr(error.message);
        setStatus(true);
      }
    } else {
      setContentErr(`Mã lớp học ${value.classId} không tồn tại !`);
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
    deleteFromCart(datas, malophocRemove);
    setRemove(false);
    setMalophocRemove("");
  };
  return (
    <div>
      <div className="search-header">
        <div className="search-malop">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField
              name="classId"
              {...register("classId")}
              label="Đăng kí theo mã LH"
              type="text"
              style={{ width: "200px", marginTop: "31px", marginLeft: "16px" }}
              variant="outlined"
              margin="dense"
              autoFocus
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
        <div
          className="search-hearder-right"
          style={{ marginTop: "50px", fontWeight: "600" }}
        >
          Số tín chỉ tối đa: {creditUser}
        </div>
      </div>

      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          {datas.length > 0 && (
            <tr>
              <th>STT</th>
              <th>Mã lớp học</th>
              <th>Mã học phần</th>
              <th>Phòng học</th>
              <th>Số tín chỉ</th>
              <th>Xóa đăng kí</th>
            </tr>
          )}

          {datas.map((data, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{data.classId}</td>
              <td>{data.subjectId}</td>
              <td>{data.location}</td>
              <td>{data.credit}</td>
              <td
                className="delete"
                onClick={() => handleOpenDelete(data.classId)}
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
            description="(Empty)"
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          />
        )}
        <br />
        <br />
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
          <br />
          <table style={{ width: "100%", padding: "10px" }}>
            {listTKB.length > 0 && (
              <tr>
                <th>STT</th>
                <th>Mã lớp học</th>
                <th>Mã học phần</th>
                <th>Tên học phần</th>
                <th>Phòng học</th>
                <th>Tín chỉ</th>
                <th>Thứ</th>
                <th>Thời gian</th>
              </tr>
            )}

            {listTKB.map((data, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{data.classId}</td>
                <td>{data.subjectId}</td>
                <td>{data.subjectName}</td>
                <td>{data.location}</td>
                <td>{data.credit}</td>
                <td>{data.day}</td>
                <td>
                  {TimeStartConvert[data.timeStart]} - {TimeEndConvert[data.timeEnd]}
                </td>
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
