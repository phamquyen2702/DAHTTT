import { FormOutlined } from "@ant-design/icons";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { Empty, Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link, useRouteMatch } from "react-router-dom";
import userApi from "../../api/userApi";
import { LIMIT_PAGE_DEFAULT } from "../../dummydb/dataDefault";
import { headerAccount } from "../../dummydb/headerAccountCsv";
import { listRole1 } from "../../dummydb/role1";
import "../style2.css";

function Chucnangkhac(props) {
  const [valueRole, setValueRole] = useState("ROLE_ADMIN");
  const { enqueueSnackbar } = useSnackbar();
  const [datas, setDatas] = useState([]);
  const [datasExport, setDatasExport] = useState([]);

  const [counts, setCounts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_PAGE_DEFAULT);
  const match = useRouteMatch();
  const csvReport = {
    filename: "exports.csv",
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
      try {
        const params = {
          role: valueRole,
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
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueRole, limit, page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramsCount = {
          role: valueRole,
        };
        const params = {
          role: valueRole,
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
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueRole, limit, page]);

  const handleChangeRole = (event) => {
    setValueRole(event.target.value);
  };
  const handleChangePageAndPageSize = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };

  return (
    <div>
      <div className="quanlysinhvien-content">
        <div>
          <div className="filter-school">
            <div className="filter-school-right2">
              <TextField
                name="role"
                className="outlined-basic"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value={valueRole}
                onChange={handleChangeRole}
              >
                {listRole1.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <br />
        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            {datas.length > 0 && (
              <tr>
                <th>Mã tài khoản</th>
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

export default Chucnangkhac;
