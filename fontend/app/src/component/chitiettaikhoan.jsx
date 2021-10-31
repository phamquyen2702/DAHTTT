import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Customtext from "./customtext";
import Customselect from "./customselect";
import "./style2.css";

function Chitiettaikhoan(props) {
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

  const lophocs = [
    {
      malophoc: "1991231",
      mahocphan: "IT4444",
      tenhocphan: "Phân tích và thiết kế hệ thống thông tin",
      phonghoc: "TC401",
      sotinchi: 3,
    },
    {
      malophoc: "1991231",
      mahocphan: "IT4455",
      tenhocphan: "Đồ án 3",
      phonghoc: "TC401",
      sotinchi: 2,
    },
    {
      malophoc: "1991231",
      mahocphan: "IT4455",
      tenhocphan: "Đồ án 3",
      phonghoc: "TC401",
      sotinchi: 2,
    },
    {
      malophoc: "1991231",
      mahocphan: "IT4455",
      tenhocphan: "Đồ án 3",
      phonghoc: "TC401",
      sotinchi: 2,
    },
  ];
  const row = lophocs.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{data.malophoc}</td>
      <td>{data.mahocphan}</td>
      <td className="td-tenhocphan">{data.tenhocphan}</td>
      <td>{data.phonghoc}</td>
      <td>{data.sotinchi}</td>
    </tr>
  ));
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">Thông tin cá nhân</p>

      <div className="thongtincanhan-content">
        <div className="thongtincanhan-left">
          <div className="thongtincanhan-table">
            <form>
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
                    labelField="Chương trình"
                    valueField="CT Nhóm ngành CNTT-TT 2-2015"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Bậc đào tạo"
                    valueField="Đại học đại trà"
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
                    labelField="Lớp"
                    valueField="CNTT2-1 K60"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Khóa học"
                    valueField="60"
                    statusField={edit}
                  ></Customtext>
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
                  <Customtext
                    disabled="true"
                    labelField="Tình trạng học tập"
                    valueField="học"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Tình trạng đăng kí"
                    valueField="Đã đăng kí"
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
            </form>
          </div>
        </div>
      </div>
      <div className="thongtindangkisv-bottom">
        <hr style={{ width: "100%", marginTop: "5%" }} />
        <p className="thongtincanhan-title">Thông tin đăng kí</p>

        <div className="table-dangki">
          <table style={{ width: "100%", padding: "10px" }}>
            <tr>
              <th>STT</th>
              <th>Mã lớp học</th>
              <th>Mã học phần</th>
              <th>Tên học phần</th>
              <th>Phòng học</th>
              <th>Số tín chỉ</th>
            </tr>
            {row}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Chitiettaikhoan;
