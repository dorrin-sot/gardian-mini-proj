import { Box, Button, Checkbox } from "@mui/material";
import { useState } from "react";
import * as Atoms from "../recoil_components/atoms";
import NavigateNext from "@mui/icons-material/NavigateNext";
import "../App.css";
import CheckBoxTextFieldPair from "../recoil_components/CheckBoxTextFieldPair";

const FormTwo = ({ onSubmit, stepper }) => {
  const customErrors = {
    smokeCount: [
      {
        fieldIsValid: (newVal) => newVal >= 0,
        errMsg: "تعداد دفعات سیگار کشیدن نمیتواند عدد منفی باشد",
      },
    ],
    vapeCount: [
      {
        fieldIsValid: (newVal) => newVal >= 0,
        errMsg: "تعداد دفعات قلیان کشیدن نمیتواند عدد منفی باشد",
      },
    ],
  };

  // errored fields are fields that have encountered error(s)
  // all fields are empty in the beginning
  const [erroredFields, setErroredFields] = useState([]);
  // if an error occurs add it to errored fields
  const onError = (field) => {
    const newErroredFields = erroredFields.filter((f) => f !== field);
    setErroredFields([...newErroredFields, field]);
  };
  // if an error is fixed remove it from errored fields
  const onNotError = (field) => {
    const newErroredFields = erroredFields.filter((f) => f !== field);
    setErroredFields(newErroredFields);

    console.log(newErroredFields);
  };

  return (
    <Box className="form">
      <h2 className="form-title">صدور بیمه نامه عمر</h2>
      {stepper}
      <CheckBoxTextFieldPair
        id="smoking"
        label="سیگار"
        boolRecoilState={Atoms.doesSmokeState}
        countRecoilState={Atoms.smokeCountState}
        onError={onError}
        onNotError={onNotError}
        customErrors={customErrors.smokeCount}
      />
      <CheckBoxTextFieldPair
        id="vaping"
        label="قلیان"
        boolRecoilState={Atoms.doesVapeState}
        countRecoilState={Atoms.vapeCountState}
        onError={onError}
        onNotError={onNotError}
        customErrors={customErrors.vapeCount}
      />
      <Button
        variant="outlined"
        type="submit"
        disabled={erroredFields.length > 0}
        startIcon={<NavigateNext />}
        onClick={onSubmit}
      >
        <span className="submit-form-btn">صفحه بعد</span>
      </Button>
    </Box>
  );
};

function calcBMI(weight, height) {
  return Math.round((weight / (height * height)) * 1000) / 1000;
}

export default FormTwo;
