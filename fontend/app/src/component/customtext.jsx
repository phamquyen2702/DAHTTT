import { TextField } from "@material-ui/core";
import React from "react";
import "./style2.css";

function Customtext(props) {
  const { labelField, valueField, disabled, focus, statusField } = props;
  if (!statusField) {
    return (
      <>
        <th>{labelField} :</th>
        <td>{valueField}</td>
      </>
    );
  }
  return (
    <>
      <th>{labelField} :</th>
      <td>
        <TextField
          autoFocus={focus}
          disabled={disabled}
          id="outlined-basic"
          variant="outlined"
          required
          margin="dense"
          fullWidth
          helperText=""
          value={valueField}
        />
      </td>
    </>
  );
}

export default Customtext;
