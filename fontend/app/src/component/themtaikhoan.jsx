import { Button } from "@material-ui/core";
import React from "react";
import Customtext from "./customtext";
import Customselect from "./customselect";
import "./style2.css";

function Themtaikhoan(props) {
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
        <p className="thongtincanhan-title">Nhập thông tin cá nhân</p>
        <hr style={{ opacity: "0.3", width: "100%" }} />
        <div className="thongtincanhan-content">
          <div className="thongtincanhan-table">
            <form>
              <table>
                <tr>
                  <Customtext
                    focus="true"
                    labelField="Họ và tên"
                    valueField="Phạm Văn Quyền"
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
                  <Customtext
                    labelField="Bậc đào tạo"
                    valueField="Đại học đại trà"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customselect
                    labelField="Khoa/Viện quản lý"
                    valueField="Viện Công nghệ Thông tin và Truyền thông"
                    statusField="true"
                    currencies={currencies}
                  ></Customselect>
                </tr>
                <tr>
                  <Customselect
                    labelField="Giới tính"
                    valueField="Nam"
                    currencies={gioitinh}
                    statusField="true"
                  ></Customselect>
                </tr>
                <tr>
                  <Customtext
                    labelField="Lớp"
                    valueField="CNTT2-1 K60"
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
                    labelField="Email"
                    valueField="quyen.pv153093@sis.hust.edu.vn"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Số điện thoại"
                    valueField="0969456215"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="CMT/CCCD"
                    valueField="142844602"
                    statusField="true"
                  ></Customtext>
                </tr>
                <tr>
                  <Customselect
                    labelField="Tình trạng học tập"
                    valueField="Học"
                    currencies={tinhtranghoc}
                    statusField="true"
                  ></Customselect>
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

export default Themtaikhoan;
