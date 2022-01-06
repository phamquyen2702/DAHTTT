import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React from "react";
import "./style.scss";
function AlertRemove({ open, handleCancel, handleOk, message}) {
  return (
    <>
      <Dialog open={open} onClose={handleCancel}>
        <DialogContent
          className="dialogpass"
        >
          <DialogContentText
            style={{
              paddingBottom: "20px",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Trở lại</Button>
          <Button onClick={handleOk}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertRemove;
