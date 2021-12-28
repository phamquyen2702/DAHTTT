import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import classApi from "../../api/classApi";
import subjectApi from "../../api/subjectApi";
import { STATUS_DEFAULT } from "../../dummydb/dataDefault";
import { liststatus } from "../../dummydb/status";
import "../style2.css";
import "../style3.css";
import Autocomplete from "@mui/material/Autocomplete";

function Themlophoc(props) {
  const [valueStatus, setValueStatus] = useState(STATUS_DEFAULT);
  const [valueSemester, setValueSemester] = useState(20201);
  const [subjectIds, setSubjectIds] = useState([]);
  const [semesters, setSemesters] = useState([]);
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
    formState: { errors },
  } = form;
  const handleOnSubmit = async (value) => {
    try {
      value.subjectName = "";
      value.credit = 0;
      value.registered = 0;
      await classApi.add(value);
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
  const handleChangeStatus = (event) => {
    setValueStatus(event.target.value);
  };
  const handleChangeSemester = (event) => {
    setValueSemester(event.target.value);
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

  return (
    <div>
      <div className="quanlysinhvien-content">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <p className="thongtincanhan-title">Nhập thông tin lớp học</p>
          <hr style={{ opacity: "0.3", width: "100%" }} />
          <br />

          {/* subjectId */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Mã học phần :</div>
            <div className="thongtincanhan-contents-input">
              <Autocomplete
                options={subjectIds}
                autoSelect={true}
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
          {/* Số tín chỉ*/}
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
          {/*Status */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">
              Trạng thái học phần :
            </div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("status")}
                name="status"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={valueStatus}
                onChange={handleChangeStatus}
              >
                {liststatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="status" />
              </p>
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
              Thêm lớp học
            </Button>
          </div>
        </form>
      </div>
      <ImportFile></ImportFile>
    </div>
  );
}

export default Themlophoc;

export const ImportFile = () => {
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const handleImport = async (value) => {
    console.log(value.file);
    try {
      await subjectApi.import(value.file);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleImport)}>
        <div className="thongtincanhan-contents">
          <div className="thongtincanhan-contents-input">
            <Button
              style={{
                width: "250px",
                marginTop: "40px",
                fontWeight: "400",
                background: "rgb(235, 43, 43)",
                color: "white",
              }}
              variant="contained"
              type="submit"
            >
              Import
            </Button>
          </div>
          <div className="thongtincanhan-contents-file">
            <TextField
              {...register("file")}
              type="file"
              variant="outlined"
              margin="dense"
              name="file"
              fullWidth
            />
          </div>
        </div>
      </form>
    </>
  );
};
