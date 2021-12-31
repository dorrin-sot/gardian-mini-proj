import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../App.css";

const RequiredTextFieldWithError = ({
  id,
  label,
  helperText,
  type,
  recoilState,
  customErrors,
  adornment,
  select, // is menu-type or not
  menuItems, // if is menu-type, is menu-item list
  onError,
  onNotError,
}) => {
  const [value, setValue] = useRecoilState(recoilState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // error handlings
  const handleError = (err, errMsg) => {
    setError(err);
    setErrorMessage(errMsg);

    // if error is true add field to list of errored fields
    // otherwise remove it from errored fields
    if (err === true) onError(label);
    else onNotError(label);
  };
  const noError = () => handleError(false, "");
  const emptyError = () => handleError(true, `لطفا ${label} خود را وارد کنید`);

  // change handler: checks for errors and sets value
  const handleChange = ({ target: { value: newValue } }) => {
    // if is empty show empty error
    // otherwise clear error
    if (!newValue || newValue === "") emptyError();
    else {
      noError();

      // for each custom error if the "fieldIsValid" function returns true for "newValue" set error
      // otherwise clear error
      for (let i = 0; i < (customErrors || []).length; i++) {
        const { fieldIsValid, errMsg } = customErrors[i];
        if (!fieldIsValid(newValue)) {
          handleError(true, errMsg);
          break;
        }
        noError();
      }

      setValue(newValue);
    }
  };

  return (
    <TextField
      id={id}
      sx={{
        m: 2,
        mt: 2,
        mb: 3,
        width: 200,
      }}
      className="form-field"
      label={label}
      error={error}
      helperText={errorMessage || helperText}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{adornment}</InputAdornment>
        ),
      }}
      variant="standard"
      type={type}
      required
      select={select}
      // set default value if it is a menu-type field (has parameter "select")
      defaultValue={select && { value }}
    >
      {(menuItems || []).map((val, index) => (
        <MenuItem key={index + 1} value={val}>
          {val}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default RequiredTextFieldWithError;