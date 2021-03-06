import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { Empty, Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import classApi from "../../api/classApi";
import { STATUS_DEFAULT } from "../../dummydb/dataDefault";
import { headerStudent } from "../../dummydb/headerListStudentcsv";
import AlertRemove from "../alertRemove";
import "../style2.css";
import "../style3.css";

function Chitietlophoc({ semesterDk }) {
  const { classId } = useParams();
  const [classOne, setClassOne] = useState("");
  const [subjectIds, setSubjectIds] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [valueSubjectId, setValueSubjectId] = useState("");
  const [valueSemester, setValueSemester] = useState(20201);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
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
        classId: classId,
      };
      await classApi.update(value, params);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
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
  }, [enqueueSnackbar]);
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
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">1. Th??ng tin l???p h???c</p>
      <div className="quanlysinhvien-content">
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <hr style={{ opacity: "0.3", width: "100%" }} />
          <br />
          {/* K?? h???c */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">K?? h???c :</div>
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
            <div className="thongtincanhan-contents-label">M?? h???c ph???n :</div>
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
                    placeholder="Ch??a c???p nh???t"
                  />
                )}
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="subjectId" />
              </p>
            </div>
          </div>
          {/* M?? l???p h???c */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">M?? l???p h???c :</div>
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
          {/* Ng??y*/}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Th??? :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("day")}
                name="day"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Ch??a c???p nh???t"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="day" />
              </p>
            </div>
          </div>

          {/* B???t ?????u */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Ti???t b???t ?????u :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("timeStart")}
                name="timeStart"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Ch??a c???p nh???t"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="timeStart" />
              </p>
            </div>
          </div>
          {/* K???t th??c */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">Ti???t k???t th??c :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("timeEnd")}
                name="timeEnd"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Ch??a c???p nh???t"
                type="number"
              />
              <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                <ErrorMessage errors={errors} name="timeEnd" />
              </p>
            </div>
          </div>
          {/* Gi???i h???n */}
          <div className="thongtincanhan-contents">
            <div className="thongtincanhan-contents-label">
              S??? l?????ng t???i ??a :
            </div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("limit")}
                name="limit"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Ch??a c???p nh???t"
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
              S??? l?????ng ???? ????ng k?? :
            </div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("registered")}
                name="registered"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Ch??a c???p nh???t"
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
            <div className="thongtincanhan-contents-label">Ph??ng h???c :</div>
            <div className="thongtincanhan-contents-input">
              <TextField
                {...register("location")}
                name="location"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Ch??a c???p nh???t"
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
              C???p nh???t l???p h???c
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
            onClick={handleOpen}
          >
            Kh??a l???p h???c
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
            onClick={handleOpen1}
          >
            M??? kh??a l???p h???c
          </Button>
        )}
      </div>
      <AlertRemove
        open={open}
        handleCancel={handleClose}
        handleOk={handleBlock}
        message={`B???n c?? ch???c ch???n mu???n kh??a l???p h???c ${classId}?`}
      ></AlertRemove>
      <AlertRemove
        open={open1}
        handleCancel={handleClose1}
        handleOk={handleUnBlock}
        message={`B???n c?? ch???c ch???n mu???n m??? kh??a l???p h???c ${classId}?`}
      ></AlertRemove>
      <br />
      <p className="thongtincanhan-title">2. Danh s??ch sinh vi??n ????ng k??</p>
      <hr style={{ opacity: "0.3", width: "100%" }} />
      <br />
      <Chitietlopdangki semesterDk={semesterDk} classId={classId} />
    </div>
  );
}

export default Chitietlophoc;

export const Chitietlopdangki = ({ semesterDk, classId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [datas, setDatas] = useState([]);
  const [datasExport, setDatasExport] = useState([]);
  const [counts, setCounts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const csvReport = {
    filename: "list_student.csv",
    headers: headerStudent,
    data: datasExport,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          classId: classId,
          semester: semesterDk,
          limit: 99999,
          offset: 0,
        };
        const list = await classApi.getAllStudenByClassId(params);
        setDatasExport(list);
      } catch (error) {
        enqueueSnackbar(error.response.data.detail, {
          variant: "error",
        });
      }
    };
    fetchData();
  }, [limit, page, enqueueSnackbar, classId, semesterDk]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramsCount = {
          classId: classId,
          semester: semesterDk,
        };
        const params = {
          classId: classId,
          semester: semesterDk,
          limit: limit,
          offset: page === 1 ? 0 : (page - 1) * limit,
        };
        const count = await classApi.countAllStudenByClassId(paramsCount);
        setCounts(count);
        const list = await classApi.getAllStudenByClassId(params);
        setDatas(list);
      } catch (error) {
        enqueueSnackbar(error.response.data.detail, {
          variant: "error",
        });
      }
    };
    fetchData();
  }, [limit, page, enqueueSnackbar, classId, semesterDk]);
  const handleChangePageAndPageSize = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };
  return (
    <div className="thongtindangkisv-bottom">
      {datas.length !== 0 && (
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            <tr>
              <th>STT</th>
              <th>M?? sinh vi??n</th>
              <th>H??? v?? t??n</th>
              <th>Khoa vi???n</th>
            </tr>
            {datas.map((data, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{data.Id}</td>
                <td>{data.fullname}</td>
                <td>{data.schoolId}</td>
              </tr>
            ))}
          </table>
          <CSVLink {...csvReport}>
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
          </CSVLink>
          <Pagination
            pageSize={limit}
            total={counts}
            page={page}
            onChange={handleChangePageAndPageSize}
            pageSizeOptions={[10, 20, 30, 40, 50]}
            style={{ float: "right", marginTop: "40px" }}
          />
        </div>
      )}
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
    </div>
  );
};
