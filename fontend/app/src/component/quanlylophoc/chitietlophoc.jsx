import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Customtext from "../customtext";
import "../style2.css";

function Chitietlophoc(props) {
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleEditOK = () => {
    setEdit(false);
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
            <form>
              <table>
                <tr>
                  <Customtext
                    labelField="Mã học phần"
                    valueField="CNTT2-1 K60"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    focus="true"
                    labelField="Phòng học"
                    valueField="TC205"
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
                    labelField="Thời gian"
                    valueField="9h30-11h30"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Thứ"
                    valueField="sáu"
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Số lượng đăng kí"
                    valueField={200}
                    statusField={edit}
                  ></Customtext>
                </tr>
                <tr>
                  <Customtext
                    labelField="Tối đa"
                    valueField="300"
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
                    onClick={handleEditOK}
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
