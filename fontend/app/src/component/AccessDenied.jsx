import React from "react";
import "./style2.css";

function AccessDenied(props) {
  return (
    <div className="page_404">
      <div className="four_zero_four_bg">
        <h1 className="title">403 ACCESS DENIED</h1>
      </div>
      <div className="contant_box_404">
        <a href="/Account" className="link_404">
          Go to Login
        </a>
      </div>
    </div>
  );
}

export default AccessDenied;
