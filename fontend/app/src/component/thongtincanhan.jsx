import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { listgioitinh } from "../dummydb/gioitinh";
import { listkhoavien } from "../dummydb/khoavien";
import "./style2.css";

function Thongtincanhan(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };

  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      fullName: "Phạm Văn Quyền",
      chuongtrinh: "CT Nhóm ngành CNTT-TT 2-2015",
      bacdaotao: "Đại học đại trà",
      khoavien: "Viện Công nghệ Thông tin và Truyền thông",
      gioitinh: "Nam",
      lop: "CNTT2.1 K60",
      khoa: "60",
      email: "quyen.pv153093@sis.hust.edu.vn",
      sodienthoai: "0969456215",
      cmt: "142844602",
      tinhtranghoctap: "học",
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
  const [gioitinh, setGioitinh] = useState(getValues("gioitinh"));
  const handleChangeGioitinh = (event) => {
    setGioitinh(event.target.value);
  };

  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">Thông tin cá nhân</p>
      <hr style={{ opacity: "0.3", width: "100%" }} />
      <div className="thongtincanhan-content">
        <div className="thongtincanhan-left">
          <div className="thongtincanhan-table">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <table>
                <tr>
                  {edit && (
                    <>
                      <th>Hẹ và tên :</th>
                      <td>
                        <TextField
                          {...register("fullName")}
                          name="fullName"
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
                      <th style={{ padding: "12px" }}>Họ và tên :</th>
                      <td>{getValues("fullName")}</td>
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
                      <th style={{ padding: "12px" }}>Chương trình :</th>
                      <td>{getValues("chuongtrinh")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Bậc đào tạo :</th>
                      <td>
                        <TextField
                          {...register("bacdaotao")}
                          name="bacdaotao"
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
                      <th style={{ padding: "12px" }}>Bậc đào tạo :</th>
                      <td>{getValues("bacdaotao")}</td>
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
                      <th>Giới tính :</th>
                      <td>
                        <TextField
                          {...register("gioitinh")}
                          name="gioitinh"
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                          select
                          value={gioitinh}
                          onChange={handleChangeGioitinh}
                        >
                          {listgioitinh.map((option) => (
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
                      <th style={{ padding: "12px" }}>Giới tính :</th>
                      <td>{getValues("gioitinh")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Lớp :</th>
                      <td>
                        <TextField
                          {...register("lop")}
                          name="lop"
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
                      <th style={{ padding: "12px" }}>Lớp :</th>
                      <td>{getValues("lop")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Khóa :</th>
                      <td>
                        <TextField
                          {...register("khoa")}
                          name="khoa"
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
                      <th style={{ padding: "12px" }}>Khóa :</th>
                      <td>{getValues("khoa")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Email :</th>
                      <td>
                        <TextField
                          {...register("email")}
                          name="email"
                          className="outlined-basic"
                          variant="outlined"
                          required
                          margin="dense"
                          fullWidth
                          disabled="true"
                        />
                      </td>
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Email :</th>
                      <td>{getValues("email")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Số điện thoại :</th>
                      <td>
                        <TextField
                          {...register("sodienthoai")}
                          name="sodienthoai"
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
                      <th style={{ padding: "12px" }}>Số điện thoại :</th>
                      <td>{getValues("sodienthoai")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>CMT/CCCD :</th>
                      <td>
                        <TextField
                          {...register("cmt")}
                          name="cmt"
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
                      <th style={{ padding: "12px" }}>SCMT/CCCD :</th>
                      <td>{getValues("cmt")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
                      <th>Tình trạng học tập :</th>
                      <td>
                        <TextField
                          disabled
                          {...register("tinhtranghoctap")}
                          name="tinhtranghoctap"
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
                      <th style={{ padding: "12px" }}>Tình trạng học tập :</th>
                      <td>{getValues("tinhtranghoctap")}</td>
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
        <div className="thongtincanhan-right"></div>
      </div>
    </div>
  );
}

export default Thongtincanhan;
