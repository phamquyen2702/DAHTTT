import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import classApi from "../../api/classApi";
import { STATUS_DEFAULT } from "../../dummydb/dataDefault";
import { dbaccount } from "../../dummydb/dbaccount";
import "../style2.css";
import "../style3.css";

function Chitietlophoc(props) {
  const { classId } = useParams();
  const [classOne, setClassOne] = useState("");
  const [subjectIds, setSubjectIds] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [valueSubjectId, setValueSubjectId] = useState("");
  const [valueSemester, setValueSemester] = useState(20201);
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({
    subjectId: yup.string().required("please enter your subjectId"),
    classId: yup.number().min(1, "Please enter at least 1 "),
    day: yup.number().min(1, "Please enter at least 1 "),
    timeStart: yup.number().min(1, "Please enter at least 1 "),
    timeEnd: yup.number().min(1, "Please enter at least 1 "),
    semester: yup.number().min(1, "Please enter at least 1 "),
    limit: yup.number().min(1, "Please enter at least 1 "),
    location: yup.string().required("please enter your location"),
  });
  const form = useForm({
    defaultValues: {
      subjectId: "",
      classId: 0,
      day: 2,
      timeStart: 0,
      timeEnd: 0,
      status: STATUS_DEFAULT,
      semester: 20201,
      location: "",
      limit: 200,
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
    const setClasss = async () => {
      //setValue Form
      setValue("subjectId", classOne.subjectId);
      setValueSubjectId(classOne.subjectId);
      setValue("classId", classOne.classId);
      setValue("day", classOne.day);
      setValue("timeStart", classOne.timeStart);
      setValue("timeEnd", classOne.timeEnd);
      setValue("semester", classOne.semester);
      setValueSemester(classOne.semester);
      setValue("location", classOne.location);
      setValue("limit", classOne.limit);
      setValue("registered", classOne.registered);
    };
    setClasss();
  }, [setValue, classOne]);

  useEffect(() => {
    const fetchSubject = async () => {
      const list = await classApi.get(classId);
      setClassOne(list[0]);
    };
    fetchSubject();
  }, [classId]);
  const handleOnSubmit = async (value) => {
    try {
      const params = {
        subjectId: classId,
      };
      await classApi.update(value, params);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };
  useEffect(() => {
    const handleSubjectId = async () => {
      try {
        const params = {
          status: 1,
        };
        const list = await classApi.getAllSubjectId(params);
        const list1 = await classApi.getAllSemester();
        setSubjectIds(list);
        setSemesters(list1);
      } catch (error) {
        enqueueSnackbar("Error", {
          variant: "error",
        });
      }
    };
    handleSubjectId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleBlock = async () => {
    try {
      await classApi.lock(classId);
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
      await classApi.unlock(classId);
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
  const handleChangeSubjectId = (event, newValue) => {
    setValueSubjectId(newValue);
  };
  const handleChangeSemester = (event) => {
    setValueSemester(event.target.value);
  };
  const row = dbaccount.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{data.masinhvien}</td>
      <td>{data.name}</td>
      <td>{data.lopsinhvien}</td>
    </tr>
  ));
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">1. Thông tin lớp học</p>
      <div className="quanlysinhvien-content">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <hr style={{ opacity: "0.3", width: "100%" }} />
          <br />
          {/* Kì học */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Kì học :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("semester")}
                name="semester"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={valueSemester}
                onChange={handleChangeSemester}
              >
                {semesters.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="semester" />
              </p>
            </div>
          </div>
          {/* subjectId */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Mã học phần :</div>
            <div className="thongtincanhan-contents-input">
              <Autocomplete
                value={valueSubjectId}
                onChange={handleChangeSubjectId}
                options={subjectIds}
                variant="standart"
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("subjectId")}
                    variant="outlined"
                    placeholder="Chưa cập nhật"
                  />
                )}
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="subjectId" />
              </p>
            </div>
          </div>
          {/* Mã lớp học */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Mã lớp học :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("classId")}
                name="classId"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="classId" />
              </p>
            </div>
          </div>
          {/* Ngày*/}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Thứ :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("day")}
                name="day"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="day" />
              </p>
            </div>
          </div>

          {/* Bắt đầu */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Tiết bắt đầu :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("timeStart")}
                name="timeStart"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="timeStart" />
              </p>
            </div>
          </div>
          {/* Kết thúc */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Tiết kết thúc :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("timeEnd")}
                name="timeEnd"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="timeEnd" />
              </p>
            </div>
          </div>
          {/* Giới hạn */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">
              Số lượng tối đa :
            </div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("limit")}
                name="limit"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="limit" />
              </p>
            </div>
          </div>
          {/*registered */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">
              Số lượng đã đăng kí :
            </div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("registered")}
                name="registered"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
                type="number"
                disabled
              />
              <p
                style={{ color: "red", fontSize: "12px", textAlign: "left" }}
              ></p>
            </div>
          </div>
          {/*location  */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Phòng học :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("location")}
                name="location"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Chưa cập nhật"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="location" />
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
        {classOne.status === 1 && (
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
            Khóa lớp học
          </Button>
        )}
        {classOne.status === 0 && (
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
            Mở khóa lớp học
          </Button>
        )}
      </div>
      <br />
      <p className="thongtincanhan-title">2. Danh sách sinh viên đăng kí</p>
      <hr style={{ opacity: "0.3", width: "100%" }} />
      <br />
      <div className="thongtindangkisv-bottom">
        <div className="table-dangki">
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
    </div>
  );
}

export default Chitietlophoc;

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <Link>Previous</Link>;
  }
  if (type === "next") {
    return <Link>Next</Link>;
  }
  return originalElement;
}
