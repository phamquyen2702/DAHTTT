import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { Pagination } from "antd";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { listkhoavien } from "../../dummydb/khoavien";
import "../style2.css";

function Chitiethocphan(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };

  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      mahocphan: "IT444",
      tenhocphan: "Nhập môn công nghệ thông tin",
      chuongtrinh: "CT Nhóm ngành CNTT-TT 2-2015",
      khoavien: "Viện Công nghệ Thông tin và Truyền thông",
      sotinchi: 3,
      trangthaihocphan: "mở",
      soluongdangki: 1000,
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = form;
  const handleOnSubmit = (value) => {
    setEdit(false);
    enqueueSnackbar("Success", {
      variant: "success",
    });
    console.log(value);
  };
  const [khoavien, setKhoavien] = useState(getValues("khoavien"));
  const handleChangeKhoavien = (event) => {
    setKhoavien(event.target.value);
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

      <div className="thongtincanhan-content">
        <div className="thongtincanhan-left">
          <div className="thongtincanhan-table">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <table>
                <tr>
                  {edit && (
                    <>
                      <th>Mã học phần :</th>
                      <td>
                        <TextField
                          {...register("mahocphan")}
                          name="mahocphan"
                          autoFocus
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                        />
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Mã học phần :</th>
                      <td>{getValues("mahocphan")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Tên học phần :</th>
                      <td>
                        <TextField
                          {...register("tenhocphan")}
                          name="tenhocphan"
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                        />
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Tên học phần :</th>
                      <td>{getValues("tenhocphan")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Chương trình :</th>
                      <td>
                        <TextField
                          {...register("chuongtrinh")}
                          name="chuongtrinh"
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                        />
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Chương trình :</th>
                      <td>{getValues("chuongtrinh")}</td>
                    </>
                  )}
                </tr>

                <tr>
                  {edit && (
                    <>
                      <th>Khoa/Viện quản lý :</th>
                      <td>
                        <TextField
                          {...register("khoavien")}
                          name="khoavien"
                          className="outlined-basic"
                          variant="outlined"
                          required
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
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Khoa/Viện quản lý :</th>
                      <td>{getValues("khoavien")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Số tín chỉ :</th>
                      <td>
                        <TextField
                          {...register("sotinchi")}
                          name="sotinchi"
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                        />
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Số tín chỉ :</th>
                      <td>{getValues("sotinchi")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Trạng thái học phần :</th>
                      <td>
                        <TextField
                          {...register("trangthaihocphan")}
                          name="trangthaihocphan"
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                        />
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Trạng thái học phần :</th>
                      <td>{getValues("trangthaihocphan")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Khối lượng sv đk :</th>
                      <td>
                        <TextField
                          {...register("soluongdangki")}
                          name="soluongdangki"
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                        />
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Khối lượng sv đk :</th>
                      <td>{getValues("soluongdangki")}</td>
                    </>
                  )}
                </tr>

                <tr>
                  {!edit && (
                    <Button
                      style={{
                        width: "250px",
                        marginTop: "40px",
                        marginLeft: "9px",
                        fontWeight: "400",
                        background: "rgb(235, 43, 43)",
                        color: "white",
                      }}
                      variant="contained"
                      onClick={handleEdit}
                    >
                      Cập nhật thông tin
                    </Button>
                  )}
                  {edit && (
                    <Button
                      type="submit"
                      style={{
                        width: "250px",
                        marginTop: "40px",
                        marginLeft: "3px",
                        fontWeight: "400",
                        background: "rgb(235, 43, 43)",
                        color: "white",
                      }}
                      variant="contained"
                    >
                      Lưu thay đổi
                    </Button>
                  )}
                </tr>
              </table>
            </form>
          </div>
        </div>
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
