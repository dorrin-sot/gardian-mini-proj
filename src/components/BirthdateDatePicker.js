import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import "../App.css";

const BirthdateDatePicker = ({
  id,
  dateState,
  ageState,
  fullWidth,
  required,
  onError,
  onNotError,
  customErrors,
}) => {
  const [birthdate, setBirthdate] = useRecoilState(dateState);
  const age = useRecoilValue(ageState);

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
  const emptyError = () =>
    handleError(true, `لطفا تاریخ تولد خود را وارد کنید`);

  // change handler: checks for errors and sets value
  const handleChange = (newValue) => {
    // if is empty show empty error
    // otherwise clear error
    if (required && (!newValue || newValue === "")) emptyError();
    else {
      noError();

      // for each custom error if the "fieldIsValid" function returns true for "newValue" set error
      // otherwise clear error
      for (let i = 0; i < (customErrors || []).length; i++) {
        const { fieldIsValid, errMsg } = customErrors[i];
        if (!fieldIsValid(age)) {
          handleError(true, errMsg);
          break;
        }
        noError();
      }
    }
    setBirthdate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="ناریخ تولد"
        id={id}
        value={birthdate}
        onChange={handleChange}
        disableFuture // birthdate cant be in the future
        clearable
        openTo="year"
        views={["year", "month"]}
        inputFormat="MMM/yyyy"
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              m: 2,
              mt: 2,
              mb: 3,
            }}
            error={error}
            helperText={errorMessage || `سن: ${age} سال`}
            fullWidth={fullWidth}
            required={required}
          />
        )}
      />{" "}
    </LocalizationProvider>
  );
};

export default BirthdateDatePicker;
