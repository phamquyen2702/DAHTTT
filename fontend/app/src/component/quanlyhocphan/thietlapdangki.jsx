import { Button, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import "../style2.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import subjectApi from "../../api/subjectApi";
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
      console.log(value.start_time);
      console.log(value.end_time);
      const data = await subjectApi.updateOte();
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
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Thietlapdangki;
