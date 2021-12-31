import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import subjectApi from "../../api/subjectApi";
import "../style2.css";
// function convertTime(a) {
//   let date = a.slice(0, 10);
//   let end_time = a.slice(13, 16);
//   let firt_time = a.slice(11, 13);
//   if (parseInt(firt_time) < 12) {
//     return date + "T" + firt_time + end_time;
//   } else {
//     return date + "T" + (24 - firt_time) + end_time;
//   }
// }
function Thietlapdangki() {
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      start_time: "2017-05-24T10:30",
      end_time: "2017-05-24T10:30",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, setValue } = form;

  useEffect(() => {
    const fetchOte = async () => {
      const data = await subjectApi.getOte();
      setValue("start_time", `${data.start_time}`);
      setValue("end_time", `${data.end_time}`);
    };
    fetchOte();
  }, [setValue]);
  const handleOnSubmit = async (value) => {
    try {
      const data = await subjectApi.updateOte(value);
      if (data === true) {
        enqueueSnackbar("success", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  return (
    <div className="thongtincanhan">
      <div className="thongtincanhan-title" style={{ fontSize: "15px" }}>
        1. Thiết lập thời gian đăng kí học tập
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div style={{ margin: "20px" }}>
          <TextField
            {...register("start_time")}
            id="datetime-local"
            label="Thời gian bắt đầu"
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ marginLeft: "70px" }}
            {...register("end_time")}
            id="datetime-local"
            label="Thời gian kết thúc"
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <Button
            style={{
              width: "200px",
              marginTop: "40px",
              marginLeft: "20px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            type="submit"
          >
            Thiết lập thời gian
          </Button>
        </div>
      </form>
      <Thietlapkihoc></Thietlapkihoc>
    </div>
  );
}

export default Thietlapdangki;

export const Thietlapkihoc = () => {
  const [semesterRes, setSemesterRes] = useState(0);
  const [semesterUpdate, setSemesterUpdate] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      semester: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit } = form;

  useEffect(() => {
    const fetchOte = async () => {
      const data = await subjectApi.getSemesterRegister();
      setSemesterRes(data);
    };
    fetchOte();
  }, [semesterUpdate]);
  const handleOnSubmit = async (value) => {
    try {
      const params = {
        semester: value.semester,
      };
      const data = await subjectApi.updateSemesterRegister(params);
      if (data === true) {
        setSemesterUpdate(value.semester);
        form.reset();
        enqueueSnackbar("success", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.detail, {
        variant: "error",
      });
    }
  };
  return (
    <div className="thongtincanhan">
      <div className="thongtincanhan-title" style={{ fontSize: "15px" }}>
        2. Thiết lập kì học đăng kí
      </div>
      <div style={{ margin: "21px", fontSize: "15px", fontWeight: "600" }}>
        +) Kì đăng kí hiện tại là {semesterRes}
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "21px", fontSize: "15px", fontWeight: "600" }}>
            +) Thay đổi kì đăng kí
          </div>
          <TextField
            variant="outlined"
            margin="dense"
            style={{ marginTop: "10px" }}
            {...register("semester")}
            placeholder="Nhập kì học"
            sx={{ width: 150 }}
          />
        </div>
        <div>
          <Button
            style={{
              width: "200px",
              marginTop: "40px",
              marginLeft: "20px",
              fontWeight: "400",
              background: "rgb(235, 43, 43)",
              color: "white",
            }}
            variant="contained"
            type="submit"
          >
            Thiết lập kì học
          </Button>
        </div>
      </form>
    </div>
  );
};
