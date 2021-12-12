import React from "react";
import "./style2.css";

function NotFound(props) {
  return (
    <div class="page_404">
      <div class="four_zero_four_bg">
        <h1 class="title">404 NOT FOUND</h1>
      </div>
      <div class="contant_box_404">
        <h3 class="description">Look like you're lost</h3>
        <p>the page you are looking for not avaible!</p>
        <a href="/home" class="link_404">
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
