import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { listkhoavien } from "../../dummydb/khoavien";
import "../style2.css";

function Themhocphan(props) {
  const { enqueueSnackbar } = useSnackbar();

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
    enqueueSnackbar("Success", {
      variant: "success",
    });
    console.log(value);
  };
  const [khoavien, setKhoavien] = useState(getValues("khoavien"));
  const handleChangeKhoavien = (event) => {
    setKhoavien(event.target.value);
  };

  return (
    <div>
      <div className="quanlysinhvien-content">
        <p className="thongtincanhan-title">Nhập thông tin học phần</p>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <div className="thongtincanhan-content">
          <div className="thongtincanhan-table">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <table>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                </tr>
                <tr>
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
                    Thêm học phần
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

export default Themhocphan;
