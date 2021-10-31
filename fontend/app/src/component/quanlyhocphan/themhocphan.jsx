import { Button } from "@material-ui/core";
import React from "react";
import Customtext from "../customtext";
import Customselect from "../customselect";
import "../style2.css";

function Themhocphan(props) {
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
        <p className="thongtincanhan-title">Nhập thông tin học phần</p>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <div className="thongtincanhan-content">
          <div className="thongtincanhan-table">
            <form>
              <table>
                <tr>
                  <Customtext
                    focus="true"
                    labelField="Mã học phần"
                    valueField="IT444"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Tên học phần"
                    valueField="Nhập môn công nghệ thông tin"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Chương trình"
                    valueField="CT Nhóm ngành CNTT-TT 2-2015"
                    statusField="true"
                  ></Customtext>
                </tr>

                <tr>
                  <Customselect
                    labelField="Khoa/Viện quản lý"
                    valueField="Viện Công nghệ Thông tin và Truyền thông"
                    currencies={currencies}
                    statusField="true"
                  ></Customselect>
                </tr>
                <tr>
                  <Customtext
                    labelField="Số tín chỉ"
                    valueField={3}
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Trạng thái học phần"
                    valueField="đang mở"
                    statusField="true"
                  ></Customtext>
                </tr>
                {/* <tr>
                  <Customtext
                    labelField="Khối lượng sv đk"
                    valueField={1000}
                    statusField="true"
                  ></Customtext>
                </tr> */}
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

export default Themhocphan;
