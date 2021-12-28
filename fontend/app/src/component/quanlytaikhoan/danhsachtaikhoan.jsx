import { FormOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import { Empty, Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import { Link, useRouteMatch } from "react-router-dom";
import * as yup from "yup";
import userApi from "../../api/userApi";
import {
  LIMIT_PAGE_DEFAULT,
  ROLE_DEFAULT,
  SCHOOLYEAR_DEFAULT,
  SCHOOL_ID_DEFAULT
} from "../../dummydb/dataDefault";
import { headerAccount } from "../../dummydb/headerAccountCsv";
import { listkhoavien } from "../../dummydb/khoavien";
import { schoolyears } from "../../dummydb/schoolyear";
import "../style2.css";

function Danhsachtaikhoan(props) {
  const [searchLike, setSearchLike] = useState("");
  const [valueSchoolyear, setValueSchoolyear] = useState(SCHOOLYEAR_DEFAULT);
  const [valueSchoolId, setValueSchoolId] = useState(SCHOOL_ID_DEFAULT);
  const { enqueueSnackbar } = useSnackbar();
  const [datas, setDatas] = useState([]);
  const [datasExport, setDatasExport] = useState([]);

  const [counts, setCounts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_PAGE_DEFAULT);
  const match = useRouteMatch();
  const csvReport = {
    filename: "account.csv",
    headers: headerAccount,
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
            schoolyear: valueSchoolyear,
            schoolId: valueSchoolId,
            role: ROLE_DEFAULT,
            limit: 99999999,
            offset: 0,
          };
          const list = await userApi.getFilter(params);
          setDatasExport(list.accounts);
        } catch (error) {
          enqueueSnackbar("Error", {
            variant: "error",
          });
        }
      } else {
        const params = {
          Id: searchLike,
          role: ROLE_DEFAULT,
          limit: 99999999,
          offset: 0,
        };
        const list = await userApi.getLikeId(params);
        setDatasExport(list.accounts);
      }
    };
    fetchData();
  }, [enqueueSnackbar, searchLike, valueSchoolId, valueSchoolyear]);
  useEffect(() => {
    const fetchData = async () => {
      if (searchLike === "") {
        try {
          const paramsCount = {
            schoolyear: valueSchoolyear,
            schoolId: valueSchoolId,
            role: ROLE_DEFAULT,
          };
          const params = {
            schoolyear: valueSchoolyear,
            schoolId: valueSchoolId,
            role: ROLE_DEFAULT,
            limit: limit,
            offset: page === 1 ? 0 : (page - 1) * limit,
          };
          const count = await userApi.count(paramsCount);
          setCounts(count);
          const list = await userApi.getFilter(params);
          setDatas(list.accounts);
        } catch (error) {
          enqueueSnackbar("Error", {
            variant: "error",
          });
        }
      }
    };
    fetchData();
  }, [
    valueSchoolId,
    valueSchoolyear,
    limit,
    page,
    enqueueSnackbar,
    searchLike,
  ]);
  //set page
  useEffect(() => {
    const fectchData = async () => {
      if (searchLike !== "") {
        const params = {
          Id: searchLike,
          role: ROLE_DEFAULT,
          limit: limit,
          offset: page === 1 ? 0 : (page - 1) * limit,
        };
        const list = await userApi.getLikeId(params);
        setDatas(list.accounts);
      }
    };
    fectchData();
  }, [limit, page, enqueueSnackbar, searchLike]);
  const handleChangeSchoolyear = (event) => {
    setValueSchoolyear(event.target.value);
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
      Id: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit } = form;
  const handleOnSubmit = async (value) => {
    const params = {
      Id: value.Id,
      role: ROLE_DEFAULT,
      limit: limit,
      offset: page === 1 ? 0 : (page - 1) * limit,
    };
    const paramsCount = {
      Id: value.Id,
      role: ROLE_DEFAULT,
    };
    const count = await userApi.countLikeId(paramsCount);
    setCounts(count);
    const list = await userApi.getLikeId(params);
    setDatas(list.accounts);
    setSearchLike(value.Id);
    setPage(1);
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
            <div className="filter-school-left">
              <TextField
                name="schoolyear"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={valueSchoolyear}
                onChange={handleChangeSchoolyear}
              >
                {schoolyears.map((option) => (
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
                  {...register("Id")}
                  autoFocus
                  id="outlined-input"
                  label="Mã sinh viên"
                  type="text"
                  style={{ width: "160px", marginLeft: "100px" }}
                />
                {searchLike !== "" && (
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
                    onClick={handleResetSearch}
                  >
                    Reset
                  </Button>
                )}
                {searchLike === "" && (
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
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            {datas.length > 0 && (
              <tr>
                <th>Mã sinh viên</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Trạng thái tài khoản</th>
                <th>Chi tiết</th>
              </tr>
            )}
            {datas &&
              datas.map((data, index) => (
                <tr>
                  <td>{data.Id}</td>
                  <td>{data.fullname}</td>
                  <td>{data.email}</td>
                  <td>
                    {data.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                  </td>
                  <td className="chitiet">
                    <Link to={`${match.url}/${data.Id}`}>
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

export default Danhsachtaikhoan;
