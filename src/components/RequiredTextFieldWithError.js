import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
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
  fullWidth,
  multiline,
  required = true, // required by default
  select, // is menu-type or not
  menuItems, // if is menu-type, is menu-item list
  onError,
  onNotError,
  disabled,
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
    if (err === true) onError(id);
    else onNotError(id);
  };
  const noError = () => handleError(false, "");
  const emptyError = () => handleError(true, `لطفا ${label} خود را وارد کنید`);

  // change handler: checks for errors and sets value
  const handleChange = ({ target: { value: newValue } }) => {
    // if is empty show empty error
    // otherwise clear error
    if (required && (!newValue || newValue === "")) emptyError();
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
    }
    setValue(newValue);
  };

  return (
    <TextField
      id={id}
      sx={{
        m: 2,
        mt: 2,
        mb: 3,
        width: fullWidth ? 650 : id === "email" ? 425 : 300,
      }}
      label={label}
      error={error}
      FormHelperTextProps={{ classes: "field-helper-text" }}
      helperText={errorMessage || helperText}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{adornment}</InputAdornment>
        ),
      }}
      variant="standard"
      fullWidth={fullWidth}
      multiline={multiline}
      type={type}
      required={required}
      select={select}
      disabled={disabled}
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
