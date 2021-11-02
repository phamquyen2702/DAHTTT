import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../style2.css";

function Chitietlophoc(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };

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

  const lophocs = [
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lop: "CNTT2.1",
    },
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lop: "CNTT2.1",
    },
    {
      masinhvien: "20153093",
      fullname: "Phạm Văn Quyền",
      lop: "CNTT2.1",
    },
  ];
  const row = lophocs.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{data.masinhvien}</td>
      <td>{data.fullname}</td>
      <td>{data.lop}</td>
    </tr>
  ));
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">Thông tin lớp học</p>

      <div className="thongtincanhan-content">
        <div className="thongtincanhan-left">
          <div className="thongtincanhan-table">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <table>
                <tr>
                  {edit && (
                    <>
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
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Mã lớp học :</th>
                      <td>{getValues("malophoc")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
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
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Phòng học :</th>
                      <td>{getValues("phonghoc")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
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
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Khóa học :</th>
                      <td>{getValues("khoahoc")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
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
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Thời gian :</th>
                      <td>{getValues("thoigian")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
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
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Thứ :</th>
                      <td>{getValues("thu")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
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
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Số lượng đăng kí :</th>
                      <td>{getValues("soluongdangki")}</td>
                    </>
                  )}
                </tr>
                <tr>
                  {edit && (
                    <>
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
                    </>
                  )}
                  {!edit && (
                    <>
                      <th style={{ padding: "12px" }}>Tối đa :</th>
                      <td>{getValues("toida")}</td>
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
                <tr>
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
                  >
                    Khóa lớp học
                  </Button>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
      <div className="thongtindangkisv-bottom">
        <hr style={{ width: "100%", marginTop: "5%" }} />
        <p className="thongtincanhan-title">Danh sách sinh viên đăng kí</p>

        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Họ và tên</th>
              <th>Lớp</th>
            </tr>
            {row}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Chitietlophoc;
