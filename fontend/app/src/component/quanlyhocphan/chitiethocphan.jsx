import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Customtext from "../customtext";
import Customselect from "../customselect";
import "../style2.css";

function Chitiethocphan(props) {
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

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleEditOK = () => {
    setEdit(false);
  };

  const hocphan = [
    {
      malophoc: "1991231",
      phonghoc: "TC401",
      soluongsv: 300,
    },
    {
      malophoc: "1991231",
      phonghoc: "TC401",
      soluongsv: 3000,
    },
    {
      malophoc: "1991231",
      phonghoc: "TC401",
      soluongsv: 3000,
    },
  ];
  const row = hocphan.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td className="td-tenhocphan">{data.malophoc}</td>
      <td>{data.phonghoc}</td>
      <td>{data.soluongsv}</td>
    </tr>
  ));
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">Thông tin học phần</p>

      <div className="thongtincanhan-content">
        <div className="thongtincanhan-left">
          <div className="thongtincanhan-table">
            <form>
              <table>
                <tr>
                  <Customtext
                    focus="true"
                    labelField="Mã học phần"
                    valueField="IT444"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Tên học phần"
                    valueField="Nhập môn công nghệ thông tin"
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
                  <Customselect
                    labelField="Khoa/Viện quản lý"
                    valueField="Viện Công nghệ Thông tin và Truyền thông"
                    currencies={currencies}
                    statusField={edit}
                  ></Customselect>
                </tr>
                <tr>
                  <Customtext
                    labelField="Số tín chỉ"
                    valueField={3}
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Trạng thái học phần"
                    valueField="đang mở"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Khối lượng sv đk"
                    valueField={1000}
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
              <th>Phòng học</th>
              <th>Số lượng sinh viên</th>
            </tr>
            {row}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Chitiethocphan;
