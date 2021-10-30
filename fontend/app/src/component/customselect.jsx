import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import "./style2.css";

function Customtext(props) {
  const { labelField, valueField, currencies, statusField } = props;
  const [currency, setCurrency] = React.useState(valueField);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

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
          id="outlined-basic"
          label={labelField}
          select
          value={currency}
          variant="outlined"
          required
          margin="dense"
          fullWidth
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </td>
    </>
  );
}

export default Customtext;
