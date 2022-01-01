import { Box, Button, Checkbox, Divider, Stack } from "@mui/material";
import { useState } from "react";
import * as Atoms from "../recoil_components/atoms";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "../App.css";
import CheckBoxTextFieldPair from "../components/CheckBoxTextFieldPair";
import RequiredTextFieldWithError from "../components/RequiredTextFieldWithError";

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
    <Stack>
      <br />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
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
      </Stack>
      <RequiredTextFieldWithError
        label="بیماری‌ها و معلولیت‌ها"
        id="sicknesses"
        multiline
        required={false}
        onError={(_) => {}}
        onNotError={(_) => {}}
        recoilState={Atoms.sicknessesState}
        helperText="فهرستی از بیماری‌ها و یا معلولیت‌هایتان را در اینجا بنویسید"
        fullWidth
      />
      <br />
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Button
          variant="outlined"
          type="submit"
          disabled={erroredFields.length > 0}
          endIcon={<NavigateBeforeIcon />}
          onClick={onSubmit}
        >
          صفحه بعد
        </Button>
      </Stack>
    </Stack>
  );
};

function calcBMI(weight, height) {
  return Math.round((weight / (height * height)) * 1000) / 1000;
}

export default FormTwo;
