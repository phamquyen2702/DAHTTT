import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { listgioitinh } from "../../dummydb/gioitinh";
import { listkhoavien } from "../../dummydb/khoavien";
import "../style2.css";

function Themtaikhoan(props) {
  const { enqueueSnackbar } = useSnackbar();

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
    <div>
      <div className="quanlysinhvien-content">
        <p className="thongtincanhan-title">Nhập thông tin cá nhân</p>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <div className="thongtincanhan-content">
          <div className="thongtincanhan-table">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <table>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
                  <Button
                    type="submit"
                    style={{
                      width: "250px",
                      marginTop: "40px",
                      marginLeft: "4px",
                      fontWeight: "400",
                      background: "rgb(235, 43, 43)",
                      color: "white",
                    }}
                    variant="contained"
                  >
                    Thêm tài khoản
                  </Button>
                </tr>
              </table>
            </form>
          </div>
          <Button
            style={{
              width: "250px",
              marginTop: "-35px",
              marginRight: "20px",
              fontWeight: "400",
              float: "right",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
          >
            Import file excel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Themtaikhoan;
