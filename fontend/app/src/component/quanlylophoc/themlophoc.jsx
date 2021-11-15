import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../style2.css";

function Themlophoc(props) {
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      malophoc: 123131,
      mahocphan: "IT444",
      phonghoc: "TC204",
      khoahoc: "k60",
      thoigian: "6h45-9h30",
      thu: 3,
      soluongdangki: 150,
      toida: 200,
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const handleOnSubmit = (value) => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
    console.log(value);
  };
  return (
    <div>
      <div className="quanlysinhvien-content">
        <p className="thongtincanhan-title">Nhập thông tin lớp học</p>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <div className="thongtincanhan-content">
          <div className="thongtincanhan-table">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <table>
                <tr>
                  <th>Mã lớp học :</th>
                  <td>
                    <TextField
                      {...register("malophoc")}
                      name="malophoc"
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
                  <th>Mã học phần :</th>
                  <td>
                    <TextField
                      {...register("mahocphan")}
                      name="mahocphan"
                      className="outlined-basic"
                      variant="outlined"
                      required
                      margin="dense"
                      fullWidth
                    />
                  </td>
                </tr>
                <tr>
                  <th>Phòng học :</th>
                  <td>
                    <TextField
                      {...register("phonghoc")}
                      name="phonghoc"
                      className="outlined-basic"
                      variant="outlined"
                      required
                      margin="dense"
                      fullWidth
                    />
                  </td>
                </tr>
                <tr>
                  <th>Khóa học :</th>
                  <td>
                    <TextField
                      {...register("khoahoc")}
                      name="khoahoc"
                      className="outlined-basic"
                      variant="outlined"
                      required
                      margin="dense"
                      fullWidth
                    />
                  </td>
                </tr>
                <tr>
                  <th>Thời gian :</th>
                  <td>
                    <TextField
                      {...register("thoigian")}
                      name="thoigian"
                      className="outlined-basic"
                      variant="outlined"
                      required
                      margin="dense"
                      fullWidth
                    />
                  </td>
                </tr>
                <tr>
                  <th>Thứ :</th>
                  <td>
                    <TextField
                      {...register("thu")}
                      name="thu"
                      className="outlined-basic"
                      variant="outlined"
                      required
                      margin="dense"
                      fullWidth
                    />
                  </td>
                </tr>
                <tr>
                  <th>Số lượng đăng kí :</th>
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
                  <th>Tối đa :</th>
                  <td>
                    <TextField
                      {...register("toida")}
                      name="toida"
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
                    Thêm lớp học
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

export default Themlophoc;
