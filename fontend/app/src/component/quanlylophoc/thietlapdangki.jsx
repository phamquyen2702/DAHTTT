import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import classApi from "../../api/classApi";
function Thietlapdangki(props) {
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      start_time: "2017-05-24T10:30",
      end_time: "2017-05-24T10:30",
      start_time1: "T10:30",
      end_time1: "T10:30",
      start_time2: "T10:30",
      end_time2: "T10:30",
      start_time3: "T10:30",
      end_time3: "T10:30",
      start_time4: "T10:30",
      end_time4: "T10:30",
      start_time5: "T10:30",
      end_time5: "T10:30",
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, setValue } = form;

  useEffect(() => {
    const fetchOte = async () => {
      const data = await classApi.getOte();
      console.log("data", data);
      setValue("start_time", `${data.start_time}`);
      setValue("end_time", `${data.end_time}`);
      setValue("start_time1", `${data.timeframe.first_year.start_time}`);
      setValue("end_time1", `${data.timeframe.first_year.end_time}`);
      setValue("start_time4", `${data.timeframe.fourth_year.start_time}`);
      setValue("end_time4", `${data.timeframe.fourth_year.end_time}`);
      setValue("start_time5", `${data.timeframe.last_year.start_time}`);
      setValue("end_time5", `${data.timeframe.last_year.end_time}`);
      setValue("start_time2", `${data.timeframe.second_year.start_time}`);
      setValue("end_time2", `${data.timeframe.second_year.end_time}`);
      setValue("start_time3", `${data.timeframe.third_year.start_time}`);
      setValue("end_time3", `${data.timeframe.third_year.end_time}`);
    };
    fetchOte();
  }, [setValue]);
  const handleOnSubmit = async (value) => {
    try {
      const time = {
        start_time: value.start_time,
        end_time: value.end_time,
        timeframe: {
          first_year: {
            start_time: value.start_time1,
            end_time: value.end_time1,
          },
          second_year: {
            start_time: value.start_time2,
            end_time: value.end_time2,
          },
          third_year: {
            start_time: value.start_time3,
            end_time: value.end_time3,
          },
          fourth_year: {
            start_time: value.start_time4,
            end_time: value.end_time4,
          },
          last_year: {
            start_time: value.start_time5,
            end_time: value.end_time5,
          },
        },
      };
      const data = await classApi.updateOte(time);
      if (data === true) {
        enqueueSnackbar("success", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };
  return (
    <div className="thongtincanhan">
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="thongtincanhan-title" style={{ fontSize: "15px" }}>
          1. Thiết lập thời gian đăng kí học tập
        </div>
        <div style={{ margin: "20px" }}>
          <TextField
            id="datetime-local"
            label="Thời gian bắt đầu"
            type="datetime-local"
            {...register("start_time")}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ marginLeft: "70px" }}
            id="datetime-local"
            label="Thời gian kết thúc"
            {...register("end_time")}
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="thongtincanhan-title" style={{ fontSize: "15px" }}>
          2. Thiết lập khung thời gian đăng kí cho sinh viên các khóa
        </div>

        <div className="table-thietlap">
          <div className="thietlap-left">Năm nhất:</div>
          <div className="thietlap-right">
            <TextField
              label="Bắt đầu"
              type="time"
              {...register("start_time1")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
            <TextField
              style={{ marginLeft: "30px" }}
              label="Kết thúc"
              type="time"
              {...register("end_time1")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
          </div>
        </div>
        <div className="table-thietlap">
          <div className="thietlap-left">Năm hai</div>
          <div className="thietlap-right">
            <TextField
              label="Bắt đầu"
              type="time"
              {...register("start_time2")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
            <TextField
              style={{ marginLeft: "30px" }}
              label="Kết thúc"
              type="time"
              {...register("end_time2")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
          </div>
        </div>
        <div className="table-thietlap">
          <div className="thietlap-left">Năm ba:</div>
          <div className="thietlap-right">
            <TextField
              label="Bắt đầu"
              type="time"
              {...register("start_time3")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
            <TextField
              style={{ marginLeft: "30px" }}
              label="Kết thúc"
              type="time"
              {...register("end_time3")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
          </div>
        </div>
        <div className="table-thietlap">
          <div className="thietlap-left">Năm tư:</div>
          <div className="thietlap-right">
            <TextField
              label="Bắt đầu"
              type="time"
              {...register("start_time4")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
            <TextField
              style={{ marginLeft: "30px" }}
              label="Kết thúc"
              type="time"
              {...register("end_time4")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
          </div>
        </div>
        <div className="table-thietlap">
          <div className="thietlap-left">Năm cuối:</div>
          <div className="thietlap-right">
            <TextField
              label="Bắt đầu"
              type="time"
              {...register("start_time5")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
            <TextField
              style={{ marginLeft: "30px" }}
              label="Kết thúc"
              type="time"
              {...register("end_time5")}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: 150 }}
            />
          </div>
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
            Thiết lập
          </Button>
        </div>
      </form>
      <Thietlapkihoc />
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
      const data = await classApi.getSemesterRegister();
      setSemesterRes(data);
    };
    fetchOte();
  }, [semesterUpdate]);
  const handleOnSubmit = async (value) => {
    try {
      const params = {
        semester: value.semester,
      };
      const data = await classApi.updateSemesterRegister(params);
      if (data === true) {
        setSemesterUpdate(value.semester);
        form.reset();
        enqueueSnackbar("success", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error", {
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
