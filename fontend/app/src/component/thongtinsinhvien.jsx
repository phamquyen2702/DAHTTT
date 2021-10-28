import React from "react";
import "./style2.css";

function Detailsv(props) {
  return (
    <div className="thongtincanhan">
      <p className="thongtincanhan-title">Thông tin cá nhân</p>
      <hr style={{ opacity: "0.3", width: "50%", marginLeft: "25%" }} />
      <div className="thongtincanhan-table">
        <table>
          <tr>
            <th>Họ và tên :</th>
            <td>Phạm Văn Quyền</td>
          </tr>
          <tr>
            <th>Chương trình : </th>
            <td>CT Nhóm ngành CNTT-TT 2-2015</td>
          </tr>
          <tr>
            <th>Bậc đào tạo :</th>
            <td>Đại học đại trà</td>
          </tr>
          <tr>
            <th>Khoa/Viện quản lý :</th>
            <td>Viện Công nghệ Thông tin và Truyền thông</td>
          </tr>
          <tr>
            <th>Giới tính :</th>
            <td>Nam</td>
          </tr>
          <tr>
            <th>Lớp :</th>
            <td>CNTT2-1 K60</td>
          </tr>
          <tr>
            <th>Khóa học:</th>
            <td>60</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>quyen.pv153093@sis.hust.edu.vn</td>
          </tr>
          <tr>
            <th>Tình trạng học tập:</th>
            <td>học</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Detailsv;
