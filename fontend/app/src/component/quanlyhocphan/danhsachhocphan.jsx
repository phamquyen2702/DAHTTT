import { FormOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { Empty, Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import { Link, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import subjectApi from "../../api/subjectApi";
import {
  LIMIT_PAGE_DEFAULT,
  STATUS_DEFAULT,
  SCHOOL_ID_DEFAULT,
} from "../../dummydb/dataDefault";
import { headerSubject } from "../../dummydb/headerSubjectCsv";
import { listkhoavien } from "../../dummydb/khoavien";
import { liststatus } from "../../dummydb/status";
import "../style2.css";

function Danhsachhocphan(props) {
  const [valueStatus, setValueStatus] = useState(STATUS_DEFAULT);
  const [valueSchoolId, setValueSchoolId] = useState(SCHOOL_ID_DEFAULT);
  const { enqueueSnackbar } = useSnackbar();
  const [datas, setDatas] = useState([]);
  const [datasExport, setDatasExport] = useState([]);

  const [counts, setCounts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_PAGE_DEFAULT);
  const match = useRouteMatch();
  const csvReport = {
    filename: "exports.csv",
    headers: headerSubject,
    data: datasExport,
  };
  const handleExport = async () => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          status: valueStatus,
          schoolId: valueSchoolId,
          limit: 99999999,
          offset: 0,
        };
        const list = await subjectApi.getFilter(params);
        setDatasExport(list);
      } catch (error) {
        enqueueSnackbar("Error", {
          variant: "error",
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSchoolId, valueStatus, limit, page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramsCount = {
          status: valueStatus,
          schoolId: valueSchoolId,
        };
        const params = {
          status: valueStatus,
          schoolId: valueSchoolId,
          limit: limit,
          offset: page === 1 ? 0 : (page - 1) * limit,
        };
        const count = await subjectApi.count(paramsCount);
        setCounts(count);
        const list = await subjectApi.getFilter(params);
        setDatas(list);
      } catch (error) {
        enqueueSnackbar("Error", {
          variant: "error",
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSchoolId, valueStatus, limit, page]);

  const handleChangeStatus = (event) => {
    setValueStatus(event.target.value);
  };
  const handleChangeSchoolId = (event) => {
    setValueSchoolId(event.target.value);
  };
  const handleChangePageAndPageSize = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      subjectId: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit } = form;
  const handleOnSubmit = async (value) => {
    const params = {
      subjectId: value.subjectId,
      limit: limit,
      offset: 0,
    };
    const list = await subjectApi.getFilter(params);
    if (list.length > 0) {
      setDatas(list);
    }

    form.reset();
    if (list.length === 0) {
      enqueueSnackbar("Không tìm thấy học phần với ID này", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <div className="quanlysinhvien-content">
        <div>
          <div className="filter-school">
            <div className="filter-school-left">
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
            <div className="filter-school-right">
              <TextField
                name="schoolId"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={valueSchoolId}
                onChange={handleChangeSchoolId}
              >
                {listkhoavien.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="filter-school-right2">
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <TextField
                  {...register("subjectId")}
                  autoFocus
                  id="outlined-input"
                  label="Mã học phần"
                  type="text"
                  style={{ width: "160px", marginLeft: "100px" }}
                />
                <Button
                  style={{
                    width: "140px",
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
              </form>
            </div>
          </div>
        </div>
        <br />
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            {datas.length > 0 && (
              <tr>
                <th>Mã học phần</th>
                <th>Tên học phần</th>
                <th>Số tín chỉ</th>
                <th>Chi tiết</th>
              </tr>
            )}
            {datas &&
              datas.map((data, index) => (
                <tr>
                  <td>{data.subjectId}</td>
                  <td>{data.subjectName}</td>
                  <td>{data.credit}</td>
                  <td className="chitiet">
                    <Link to={`${match.url}/${data.subjectId}`}>
                      <FormOutlined />
                    </Link>
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

export default Danhsachhocphan;
