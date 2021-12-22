import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import subjectApi from "../../api/subjectApi";
import { SCHOOL_ID_DEFAULT } from "../../dummydb/dataDefault";
import { listkhoavien } from "../../dummydb/khoavien";
import { liststatus } from "../../dummydb/status";
import "../style2.css";
import "../style3.css";

function Chitiethocphan(props) {
  const { Id } = useParams();
  const [khoavien, setKhoavien] = useState(SCHOOL_ID_DEFAULT);
  const [subject, setSubject] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({
    subjectName: yup.string().required("please enter your subjectName"),
    credit: yup.number().min(1, "Please enter at least 1 "),
    note: yup.string().required("please enter your note"),
    programsemester: yup.number().min(1, "Please enter at least 1 "),
  });
  const form = useForm({
    defaultValues: {
      subjectId: "",
      subjectName: "",
      credit: 0,
      schoolId: SCHOOL_ID_DEFAULT,
      note: "",
      programsemester: 0,
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;
  useEffect(() => {
    const setSubjects = async () => {
      //setValue Form
      setValue("subjectId", subject.subjectId);
      setValue("subjectName", subject.subjectName);
      setValue("credit", subject.credit);
      setValue("schoolId", subject.schoolId);
      setKhoavien(subject.schoolId);
      setValue("programsemester", subject.programsemester);
      setValue("note", subject.note);
    };
    setSubjects();
  }, [setValue, subject]);
  useEffect(() => {
    const fetchSubject = async () => {
      const params = {
        subjectId: Id,
      };
      const list = await subjectApi.get(params);
      setSubject(list.subject[0]);
    };
    fetchSubject();
  }, [Id]);
  const handleOnSubmit = async (value) => {
    try {
      const params = {
        subjectId: Id,
      };
      await subjectApi.update(value, params);
      enqueueSnackbar("Success", {
        variant: "success",
      });
      form.reset();
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };

  const handleChangeKhoavien = (event) => {
    setKhoavien(event.target.value);
  };
  const handleBlock = async () => {
    try {
      const params = {
        subjectId: Id,
      };
      await subjectApi.lock(params);
      window.location.reload();
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };
  const handleUnBlock = async () => {
    try {
      const params = {
        subjectId: Id,
      };
      await subjectApi.unlock(params);
      window.location.reload();
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };
  const hocphan = [
    {
      malophoc: "1991231",
      phonghoc: "TC401",
      soluongsv: 300,
    },
    {
      malophoc: "1991231",
      phonghoc: "TC401",
      soluongsv: 3000,
    },
    {
      malophoc: "1991231",
      phonghoc: "TC401",
      soluongsv: 3000,
    },
  ];
  const row = hocphan.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td className="td-tenhocphan">{data.malophoc}</td>
      <td>{data.phonghoc}</td>
      <td>{data.soluongsv}</td>
    </tr>
  ));
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">1. Thông tin học phần</p>
      <div className="quanlysinhvien-content">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <hr style={{ opacity: "0.3", width: "100%" }} />
          <br />
          {/* subjectId */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Mã học phần :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("subjectId")}
                name="subjectId"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                disabled
              />
              <p></p>
            </div>
          </div>
          {/* Tên học phần */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Tên học phần :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("subjectName")}
                name="subjectName"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="subjectName" />
              </p>
            </div>
          </div>
          {/* Số tín chỉ*/}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Số tín chỉ :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("credit")}
                name="credit"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="credit" />
              </p>
            </div>
          </div>
          {/* Kì học */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Kì học :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("programsemester")}
                name="programsemester"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="programsemester" />
              </p>
            </div>
          </div>
          {/* Khoa viện  */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Khoa/Viện :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("schoolId")}
                name="schoolId"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={khoavien}
                onChange={handleChangeKhoavien}
              >
                {listkhoavien.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <p></p>
          {/*Note  */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Ghi chú :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("note")}
                name="note"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="note" />
              </p>
            </div>
          </div>
          <br />
          <div className="thongtincanhan-contents">
            <Button
              style={{
                width: "250px",
                marginTop: "40px",
                marginLeft: "0px",
                fontWeight: "400",
                background: "rgb(235, 43, 43)",
                color: "white",
              }}
              variant="contained"
              type="submit"
            >
              Cập nhật học phần
            </Button>
          </div>
        </form>
        {subject.status === 1 && (
          <Button
            style={{
              width: "250px",
              float: "right",
              marginTop: "-35px",
              marginRight: "12px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            onClick={handleBlock}
          >
            Khóa học phần
          </Button>
        )}
        {subject.status === 0 && (
          <Button
            style={{
              width: "250px",
              float: "right",
              marginTop: "-35px",
              marginRight: "12px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            onClick={handleUnBlock}
          >
            Mở khóa học phần
          </Button>
        )}
      </div>
      <div className="thongtindangkisv-bottom">
        <hr style={{ width: "100%", marginTop: "5%" }} />
        <p className="thongtincanhan-title">2. Danh sách lớp giảng dạy</p>

        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            <tr>
              <th>STT</th>
              <th>Mã lớp học</th>
              <th>Phòng học</th>
              <th>Số lượng sinh viên</th>
            </tr>
            {row}
          </table>
          <Button
            style={{
              width: "200px",
              marginTop: "35px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
          >
            Export file excel
          </Button>
          <Pagination
            total={500}
            itemRender={itemRender}
            style={{ float: "right", marginTop: "40px" }}
          />
        </div>
      </div>
      <br />
      <br />
      <div className="table-dangki">
        <hr style={{ width: "100%", marginTop: "5%" }} />
        <p className="thongtincanhan-title">3. Danh sách sinh viên đăng kí</p>
        <table style={{ width: "100%", padding: "10px" }}>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Lớp</th>
          </tr>
          {row}
        </table>
        <Button
          style={{
            width: "200px",
            marginTop: "35px",
            fontWeight: "400",
            background: "rgb(235, 43, 43)",
            color: "white",
          }}
          variant="contained"
        >
          Export file excel
        </Button>
        <Pagination
          total={500}
          itemRender={itemRender}
          style={{ float: "right", marginTop: "40px" }}
        />
      </div>
    </div>
  );
}

export default Chitiethocphan;
function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <Link>Previous</Link>;
  }
  if (type === "next") {
    return <Link>Next</Link>;
  }
  return originalElement;
}
