import { Button } from "@material-ui/core";
import React from "react";
import Customtext from "../customtext";
import Customselect from "../customselect";
import "../style2.css";

function Themlophoc(props) {
  const currencies = [
    {
      value: "Viện Công nghệ Thông tin và Truyền thông",
      label: "Viện Công nghệ Thông tin và Truyền thông",
    },
    {
      value: "Ngoại ngữ",
      label: "Ngoại ngữ",
    },
  ];
  const gioitinh = [
    {
      value: "Nam",
      label: "Nam",
    },
    {
      value: "Nữ",
      label: "Nữ",
    },
  ];
  const tinhtranghoc = [
    {
      value: "Học",
      label: "Học",
    },
    {
      value: "Nghỉ học",
      label: "Nghỉ học",
    },
  ];

  return (
    <div>
      <div className="quanlysinhvien-content">
        <p className="thongtincanhan-title">Nhập thông tin lớp học</p>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <div className="thongtincanhan-content">
          <div className="thongtincanhan-table">
            <form>
              <table>
                <tr>
                  <Customtext
                    labelField="Mã học phần"
                    valueField="CNTT2-1 K60"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    focus="true"
                    labelField="Phòng học"
                    valueField="TC205"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Khóa học"
                    valueField="60"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Thời gian"
                    valueField="9h30-11h30"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Thứ"
                    valueField="sáu"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Tối đa"
                    valueField="300"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Button
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
                    Cập nhật thông tin
                  </Button>
                </tr>
                <tr>
                  <Button
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
                    Import file excel
                  </Button>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Themlophoc;
