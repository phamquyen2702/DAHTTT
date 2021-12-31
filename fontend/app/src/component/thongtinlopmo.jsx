import { PlusCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@material-ui/core";
import { Empty, Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import classApi from "../api/classApi";
import { LIMIT_PAGE_DEFAULT } from "../dummydb/dataDefault";
import "./style.scss";

function Thongtinlopmo({ semesterDk }) {
  const [searchLike, setSearchLike] = useState("");
  const [datas, setDatas] = useState([]);
  const [counts, setCounts] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_PAGE_DEFAULT);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      if (searchLike === "") {
        try {
          const paramsCount = {
            status: 1,
            semester: semesterDk,
          };
          const params = {
            status: 1,
            semester: semesterDk,
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
  }, [limit, page, enqueueSnackbar, searchLike, semesterDk]);
  useEffect(() => {
    const fectchData = async () => {
      if (searchLike !== "") {
        const params = {
          limit: limit,
          offset: page === 1 ? 0 : (page - 1) * limit,
        };
        const list = await classApi.getLikeSubjectId(params, searchLike);
        setDatas(list);
      }
    };
    fectchData();
  }, [limit, page, searchLike]);
  const handleThem = (data) => {
    try {
      enqueueSnackbar(
        "Chức năng này đang được bảo trì, vui lòng đăng kí tại trang đăng kí lớp!",
        {
          variant: "error",
        }
      );
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
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
    if (value.subjectId !== "") {
      const params = {
        limit: limit,
        offset: page === 1 ? 0 : (page - 1) * limit,
      };

      const count = await classApi.countLikeSubjectId(value.subjectId);
      setCounts(count);
      const list = await classApi.getLikeSubjectId(params, value.subjectId);
      setDatas(list);
      setSearchLike(value.subjectId);
      setPage(1);
    }
  };
  const handleChangePageAndPageSize = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };
  const handleResetSearch = () => {
    setSearchLike("");
    window.location.reload();
  };
  return (
    <div>
      <div className="search-header">
        <div className="search-malop">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField
              {...register("subjectId")}
              id="outlined-input"
              label="Tìm kiếm theo mã học phần"
              type="text"
              style={{ width: "230px", margin: "20px" }}
              autoFocus
              variant="outlined"
              size="small"
            />
            {searchLike !== "" && (
              <Button
                style={{
                  width: "200px",
                  margin: "20px",
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
                  width: "200px",
                  margin: "20px",
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

      <div className="table-dangki">
        {datas.length !== 0 && (
          <table style={{ width: "100%", padding: "10px" }}>
            <tr>
              <th>STT</th>
              <th>Mã Lớp</th>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Số tín chỉ</th>
              <th>Đã đăng kí</th>
              <th>Tối đa</th>
              <th>Thêm vào D/S đăng kí</th>
            </tr>
            {datas.map((data, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{data.classId}</td>
                <td>{data.subjectId}</td>
                <td>{data.subjectName}</td>
                <td>{data.credit}</td>
                <td>{data.registered}</td>
                <td>{data.limit}</td>
                <td className="them" onClick={() => handleThem(data)}>
                  <PlusCircleOutlined />
                </td>
              </tr>
            ))}
          </table>
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
  );
}

export default Thongtinlopmo;
