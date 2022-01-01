import { Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import * as Atoms from "../recoil_components/atoms";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import "../App.css";
import CheckBoxTextFieldPair from "../components/CheckBoxTextFieldPair";
import RequiredTextFieldWithError from "../components/RequiredTextFieldWithError";

const FormTwo = ({ onSubmit, isMobile, isConfirmPage }) => {
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
  };

  return (
    <Stack>
      <br />
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-evenly"
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
          direction={isMobile ? "row" : "column"}
        />
        <CheckBoxTextFieldPair
          id="vaping"
          label="قلیان"
          boolRecoilState={Atoms.doesVapeState}
          countRecoilState={Atoms.vapeCountState}
          onError={onError}
          onNotError={onNotError}
          customErrors={customErrors.vapeCount}
          direction={isMobile ? "row" : "column"}
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
        fullWidth={false}
      />
      {!isMobile && <br />}
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Button
          variant="outlined"
          type="submit"
          disabled={erroredFields.length > 0}
          endIcon={
            isConfirmPage ? (
              <SentimentVerySatisfiedIcon />
            ) : (
              <NavigateBeforeIcon />
            )
          }
          onClick={onSubmit}
        >
          {isConfirmPage ? "تایید اطلاعات" : "صفحه بعد"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FormTwo;
