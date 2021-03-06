import { DeleteOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Empty } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import classApi from "../api/classApi";
import subjectApi from "../api/subjectApi";
import userApi from "../api/userApi";
import { addToCart, deleteFromCart } from "../reducers/subjectSlice";
import getCookie from "./getcookie";
import "./style.scss";

function countCredit(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i].credit;
  }
  return sum;
}
function Dangkihocphan({ semesterDk }) {
  const [semesters, setSemesters] = useState([]);
  const [creditUser, setCreditUser] = useState(0);
  const [valueSemester, setValueSemester] = useState(semesterDk);
  const [listTKB, setListTKB] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      subjectId: "",
    },
    resolver: yupResolver(schema),
  });
  const handleChangeSemester = (event) => {
    setValueSemester(event.target.value);
  };
  const { register, handleSubmit } = form;
  useEffect(() => {
    const fectchData = async () => {
      const list1 = await classApi.getAllSemester();
      setSemesters(list1);
    };
    fectchData();
  }, []);

  useEffect(() => {
    const fectchData = async () => {
      const account = getCookie("account");
      const user = await userApi.get({ email: JSON.parse(account).email });
      setCreditUser(user.accounts[0].maxcredit);
      const param = {
        Id: user.accounts[0].Id,
        semester: valueSemester,
      };
      const data = await subjectApi.getRegisterSub(param);
      let dataSubject = [];
      for (let i = 0; i < data.length; i++) {
        const x = await subjectApi.get({ subjectId: data[i].subjectId });
        dataSubject.push(x.subject[0]);
      }
      setListTKB(dataSubject);
    };
    fectchData();
  }, [valueSemester]);
  const handleSave = async () => {
    const datalist = {};
    datalist.subjects = datas;
    try {
      const registerSub = await subjectApi.registerSubject(
        datalist,
        semesterDk
      );
      if (registerSub === true) {
        window.location.reload();
        enqueueSnackbar("success", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  const datas = getCookie("cartDKHP") ? JSON.parse(getCookie("cartDKHP")) : [];
  const [remove, setRemove] = useState(false);
  const [status, setStatus] = useState(false);
  const [contentErr, setContentErr] = useState("");
  const [mahocphanRemove, setMahocphanRemove] = useState("");

  const content = "B???n c?? ch???c ch???n mu???n x??a?";

  const title = "";

  const handleOpenDelete = (value) => {
    setMahocphanRemove(value);
    setRemove(true);
  };

  const handleAgreeDelete = () => {
    deleteFromCart(datas, mahocphanRemove);
    setRemove(false);
    setMahocphanRemove("");
  };
  const handleCloseDelete = () => {
    setRemove(false);
  };
  const handleClose = () => {
    setStatus(false);
  };

  const handleOnSubmit = async (value) => {
    const existSub = await subjectApi.checkSubjectId(value.subjectId);
    let sum = countCredit(datas);
    if (existSub === true) {
      const data = await subjectApi.get({ subjectId: value.subjectId });
      const dataAll = {
        datal: data.subject[0],
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
      setContentErr(`M?? h???c ph???n ${value.subjectId} kh??ng t???n t???i !`);
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
              {...register("subjectId")}
              autoFocus
              id="outlined-input"
              label="????ng k?? theo m?? HP"
              type="text"
              style={{ width: "200px", marginTop: "31px",marginLeft:"16px" }}
              variant="outlined"
              margin="dense"
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
              ????ng k??
            </Button>
          </form>
        </div>
        <div
          className="search-hearder-right"
          style={{ marginTop: "50px", fontWeight: "600" }}
        >
          S??? t??n ch??? t???i ??a: {creditUser}
        </div>
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
          <Button onClick={handleCloseDelete}>Tr??? l???i</Button>
          <Button
            onClick={handleAgreeDelete}
            autoFocus
            style={{ background: "white", fontWeight: "600" }}
          >
            ?????ng ??
          </Button>
        </DialogActions>
      </Dialog>
      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          {datas.length > 0 && (
            <tr>
              <th>STT</th>
              <th>M?? h???c ph???n</th>
              <th>T??n h???c ph???n</th>
              <th>S??? t??n ch???</th>
              <th>X??a ????ng k??</th>
            </tr>
          )}

          {datas &&
            datas.map((data, index) => (
              <tr key={index} style={data.status === 0 ? { color: "red" } : { color: "blue" }}>
                <td>{index}</td>
                <td>{data.subjectId}</td>
                <td>{data.subjectName}</td>
                <td>{data.credit}</td>
                <td
                  className="delete"
                  onClick={() => handleOpenDelete(data.subjectId)}
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
              description="(Empty)"
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            />
          )}
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
          fontWeight: "600",
          float: "right",
          background: "rgb(235, 43, 43)",
          color: "white",
        }}
        variant="contained"
      >
        G???i y??u c???u
      </Button>

      <br />
      <br />
      <br />
      <hr style={{ width: "97%", margin: "30px auto" }} className="hr-style" />
      <div className="dk-footer">
        <div style={{ display: "flex" }}>
          <div className="dk-footer-title">
            Th??ng tin ????ng k?? theo c??c k?? h???c:{" "}
          </div>
          <TextField
            className="semester-dk"
            variant="outlined"
            margin="dense"
            select
            sx={20}
            value={valueSemester}
            onChange={handleChangeSemester}
          >
            {semesters.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <br />
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            {listTKB.length > 0 && (
              <tr>
                <th>STT</th>
                <th>M?? h???c ph???n</th>
                <th>T??n h???c ph???n</th>
                <th>S??? t??n ch???</th>
              </tr>
            )}

            {listTKB.map((data, index) => (
              <tr key={index} style={data.status === 0 ? { color: "red" } : { color: "blue" }}>
                <td>{index}</td>
                <td>{data.subjectId}</td>
                <td>{data.subjectName}</td>
                <td>{data.credit}</td>
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
              description="T???m tr???ng( Empty)"
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dangkihocphan;
