import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Customtext from "./customtext";
import Customselect from "./customselect";
import "./style2.css";

function Thongtinquanly(props) {
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
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleEditOK = () => {
    setEdit(false);
  };
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">Thông tin cá nhân</p>
      <hr style={{ opacity: "0.3", width: "100%" }} />
      <div className="thongtincanhan-content">
        <div className="thongtincanhan-left">
          <div className="thongtincanhan-table">
            <table>
              <tr>
                <Customtext
                  focus="true"
                  labelField="Họ và tên"
                  valueField="Phạm Văn Quyền"
                  statusField={edit}
                ></Customtext>
              </tr>
              <tr>
                <Customtext
                  labelField="Bộ môn"
                  valueField="Hệ thống thông tin"
                  statusField={edit}
                ></Customtext>
              </tr>
              <tr>
                <Customtext
                  labelField="Bậc đào tạo"
                  valueField="Thạc sĩ"
                  statusField={edit}
                ></Customtext>
              </tr>
              <tr>
                <Customselect
                  labelField="Khoa/Viện quản lý"
                  valueField="Viện Công nghệ Thông tin và Truyền thông"
                  currencies={currencies}
                  statusField={edit}
                ></Customselect>
              </tr>
              <tr>
                <Customselect
                  labelField="Giới tính"
                  valueField="Nam"
                  currencies={gioitinh}
                  statusField={edit}
                ></Customselect>
              </tr>

              <tr>
                <Customtext
                  disabled="true"
                  labelField="Email"
                  valueField="quyen.pv153093@sis.hust.edu.vn"
                  statusField={edit}
                ></Customtext>
              </tr>
              <tr>
                <Customtext
                  labelField="Số điện thoại"
                  valueField="0969456215"
                  statusField={edit}
                ></Customtext>
              </tr>
              <tr>
                <Customtext
                  labelField="CMT/CCCD"
                  valueField="142844602"
                  statusField={edit}
                ></Customtext>
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
                    style={{
                      width: "250px",
                      marginTop: "40px",
                      marginLeft: "3px",
                      fontWeight: "400",
                      background: "rgb(235, 43, 43)",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={handleEditOK}
                  >
                    Lưu thay đổi
                  </Button>
                )}
              </tr>
            </table>
          </div>
        </div>
        <div className="thongtincanhan-right"></div>
      </div>
    </div>
  );
}

export default Thongtinquanly;
