import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import { Autocomplete } from "@mui/material";
import { Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { Suspense, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import classApi from "../../api/classApi";
import { LIMIT_PAGE_DEFAULT, STATUS_DEFAULT } from "../../dummydb/dataDefault";
import { headerClass } from "../../dummydb/headerClassCsv";
import { liststatus } from "../../dummydb/status";
import Loading from "../Loading";
import "../style2.css";
import DataRender from "./dataRender";
function converOpt(list) {
  let opt = [];
  for (let i = 0; i < list.length; i++) {
    opt.push(list[i].value);
  }
  return opt;
}
function Danhsachlophoc({ semesterDk }) {
  const [searchLike, setSearchLike] = useState("");
  const [valueStatus, setValueStatus] = useState(STATUS_DEFAULT);
  const [valueSubjectId, setValueSubjectId] = useState();
  const [valueSemester, setValueSemester] = useState(semesterDk);
  const [subjectIds, setSubjectIds] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [datas, setDatas] = useState([]);
  const [datasExport, setDatasExport] = useState([]);
  const [counts, setCounts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_PAGE_DEFAULT);
  const csvReport = {
    filename: "class.csv",
    headers: headerClass,
    data: datasExport,
  };
  const handleExport = async () => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchLike === "") {
        try {
          const params = {
            status: valueStatus,
            subjectId: valueSubjectId,
            semester: valueSemester,
            limit: 99999999,
            offset: 0,
          };
          const list = await classApi.getFilter(params);
          setDatasExport(list);
        } catch (error) {
          enqueueSnackbar(error.response.data.detail, {
            variant: "error",
          });
        }
      } else {
        const params = {
          limit: 999999,
          offset: 0,
        };
        const list = await classApi.getLikeId(params, searchLike);
        setDatasExport(list);
      }
    };
    fetchData();
  }, [enqueueSnackbar, searchLike, valueSemester, valueStatus, valueSubjectId]);
  useEffect(() => {
    const fetchData = async () => {
      if (searchLike === "") {
        try {
          const paramsCount = {
            status: valueStatus,
            subjectId: valueSubjectId,
            semester: valueSemester,
          };
          const params = {
            status: valueStatus,
            subjectId: valueSubjectId,
            semester: valueSemester,
            limit: limit,
            offset: page === 1 ? 0 : (page - 1) * limit,
          };
          const count = await classApi.count(paramsCount);
          setCounts(count);
          const list = await classApi.getFilter(params);
          setDatas(list);
        } catch (error) {
          enqueueSnackbar(error.response.data.detail, {
            variant: "error",
          });
        }
      }
    };
    fetchData();
  }, [
    valueSemester,
    valueStatus,
    valueSubjectId,
    limit,
    page,
    enqueueSnackbar,
    searchLike,
  ]);
  useEffect(() => {
    const handleSubjectId = async () => {
      try {
        const params = {
          status: STATUS_DEFAULT,
        };
        const list = await classApi.getAllSubjectId(params);
        const list1 = await classApi.getAllSemester();
        setSubjectIds(list);
        setSemesters(list1);
      } catch (error) {
        enqueueSnackbar(error.response.data.detail, {
          variant: "error",
        });
      }
    };
    handleSubjectId();
  }, [enqueueSnackbar]);

  //page like
  useEffect(() => {
    const fectchData = async () => {
      if (searchLike !== "") {
        const params = {
          limit: limit,
          offset: page === 1 ? 0 : (page - 1) * limit,
        };
        const list = await classApi.getLikeId(params, searchLike);
        setDatas(list);
      }
    };
    fectchData();
  }, [valueSemester, valueStatus, valueSubjectId, limit, page, searchLike]);
  const handleChangeStatus = (event) => {
    setValueStatus(event.target.value);
  };
  const handleChangeSubjectId = (event, newValue) => {
    setValueSubjectId(newValue);
  };
  const handleChangeSemester = (event) => {
    setValueSemester(event.target.value);
  };
  const handleChangePageAndPageSize = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      classId: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit } = form;
  const handleOnSubmit = async (value) => {
    if (value.classId !== "") {
      const params = {
        limit: limit,
        offset: page === 1 ? 0 : (page - 1) * limit,
      };

      const count = await classApi.countLikeId(value.classId);
      setCounts(count);
      const list = await classApi.getLikeId(params, value.classId);
      setDatas(list);
      setSearchLike(value.classId);
      setPage(1);
    }
  };
  const handleResetSearch = () => {
    setSearchLike("");
    window.location.reload();
  };
  return (
    <div>
      <div className="quanlysinhvien-content">
        <div>
          <div className="filter-school">
            <div className="filter-school-classs">
              <Autocomplete
                value={valueSubjectId}
                onChange={handleChangeSubjectId}
                options={converOpt(subjectIds)}
                fullWidth
                margin="dense"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Chọn mã học phần"
                  />
                )}
              />
            </div>
            <div className="filter-school-class">
              <TextField
                name="status"
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
            </div>
            <div className="filter-school-class">
              <TextField
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
            </div>
            <div className="filter-school-right3">
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <TextField
                  {...register("classId")}
                  id="outlined-input"
                  placeholder="Tìm kiếm theo mã lớp học"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  style={{
                    width: "180px",
                    marginLeft: "98px",
                    marginTop: "12px",
                  }}
                />
                {searchLike !== "" && (
                  <Button
                    style={{
                      width: "120px",
                      height: "39px",
                      marginTop: "12px",
                      marginLeft: "20px",
                      fontWeight: "400",
                      background: "rgb(235, 43, 43)",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={handleResetSearch}
                  >
                    Reset
                  </Button>
                )}

                {searchLike === "" && (
                  <Button
                    style={{
                      width: "120px",
                      height: "39px",
                      marginTop: "12px",
                      marginLeft: "20px",
                      fontWeight: "400",
                      background: "rgb(235, 43, 43)",
                      color: "white",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Tìm kiếm
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
        <br />
        {searchLike === "" && counts !== 0 && (
          <div style={{ display: "flex", margin: "12px", color: "blue" }}>
            <div>
              <OfflinePinIcon />
            </div>
            <div>Tìm thấy {counts} kết quả chính xác</div>
          </div>
        )}
        {searchLike !== "" && counts !== 0 && (
          <div style={{ display: "flex", margin: "12px", color: "blue" }}>
            <div>
              <OfflinePinIcon />
            </div>
            <div>Tìm thấy {counts} kết quả gần đúng</div>
          </div>
        )}
        <Suspense fallback={<Loading />}>
          <DataRender datas={datas} />
        </Suspense>

        <br />
        <br />
        <br />
        {datas.length > 0 && (
          <Pagination
            pageSize={limit}
            total={counts}
            page={page}
            onChange={handleChangePageAndPageSize}
            pageSizeOptions={[5, 10, 15, 20]}
            style={{ float: "right", marginRight: "15px" }}
          />
        )}
      </div>
      {datas.length > 0 && (
        <CSVLink {...csvReport}>
          <Button
            style={{
              width: "200px",
              marginLeft: "10px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            onClick={handleExport}
          >
            Export file excel
          </Button>
        </CSVLink>
      )}
    </div>
  );
}

export default Danhsachlophoc;
