import { FormOutlined } from "@ant-design/icons";
import React from "react";
import "../style2.css";
import { Empty } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
function DataRender({ datas }) {
  const match = useRouteMatch();
  return (
    <>
      <div className="table-dangki">
        <table style={{ width: "100%", padding: "10px" }}>
          {datas.length > 0 && (
            <tr>
              <th>Mã lớp</th>
              <th>Mã học phần</th>
              <th>Phòng học</th>
              <th>Số lượng</th>
              <th>Tối đa</th>
              <th>Chi tiết</th>
            </tr>
          )}
          {datas &&
            datas.map((data, index) => (
              <tr>
                <td>{data.classId}</td>
                <td>{data.subjectId}</td>
                <td>{data.location}</td>
                <td>{data.registered}</td>
                <td>{data.limit}</td>
                <td className="chitiet">
                  <Link to={`${match.url}/${data.classId}`}>
                    <FormOutlined />
                  </Link>
                </td>
              </tr>
            ))}
          {datas.length === 0 && (
            <Empty
              style={{
                color: "red",
                fontWeight: "600",
                fontStyle: "italic",
                fontSize: "13px",
              }}
              description="(Empty)"
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            />
          )}
        </table>
      </div>
    </>
  );
}

export default DataRender;
