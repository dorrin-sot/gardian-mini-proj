import { Stack, Button } from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import * as Atoms from "../recoil_components/atoms";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import BirthdateDatePicker from "../components/BirthdateDatePicker";
import RequiredTextFieldWithError from "../components/RequiredTextFieldWithError";
import "../App.css";

const FormOne = ({ onSubmit, isMobile }) => {
  const customErrors = {
    age: [
      {
        fieldIsValid: (newVal) => newVal <= 45,
        errMsg: "بیمه عمر برای افراد زیر ۴۵ سال تعریف میشود",
      },
      {
        fieldIsValid: (newVal) => newVal >= 0,
        errMsg: "سن نمیتواند عدد منفی باشد",
      },
    ],
    phoneNumber: [
      {
        fieldIsValid: (newVal) => /^0([0-9]){2,3}(([0-9]){5,9})$/.test(newVal),
        errMsg: "فرمت تلفن همراه نادرست است",
      },
    ],
    email: [
      {
        fieldIsValid: (newVal) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(newVal),
        errMsg: "فرمت ایمیل نادرست است",
      },
    ],
    weight: [
      {
        fieldIsValid: (newVal) => newVal > 0,
        errMsg: "وزن باید عدد مثبت باشد",
      },
    ],
    height: [
      {
        fieldIsValid: (newVal) => newVal > 0,
        errMsg: "قد باید عدد مثبت باشد",
      },
    ],
  };

  const BMI = useRecoilValue(Atoms.bmiState);

  // errored fields are fields that have encountered error(s)
  // all fields are empty in the beginning
  const [erroredFields, setErroredFields] = useState([
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "weight",
    "height",
  ]);
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
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
      >
        <RequiredTextFieldWithError
          id="firstName"
          label="نام"
          recoilState={Atoms.firstNameState}
          onError={onError}
          onNotError={onNotError}
          fullWidth
        />
        <RequiredTextFieldWithError
          label="نام خانوادگی"
          id="lastName"
          recoilState={Atoms.lastNameState}
          onError={onError}
          onNotError={onNotError}
          fullWidth
        />
      </Stack>{" "}
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
      >
        <RequiredTextFieldWithError
          label="تلفن همراه"
          id="phoneNumber"
          recoilState={Atoms.phoneNumberState}
          customErrors={customErrors.phoneNumber}
          onError={onError}
          onNotError={onNotError}
          fullWidth={isMobile}
        />{" "}
        <RequiredTextFieldWithError
          label="ایمیل"
          id="email"
          type="email"
          recoilState={Atoms.emailState}
          customErrors={customErrors.email}
          onError={onError}
          onNotError={onNotError}
          fullWidth
        />
      </Stack>{" "}
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
      >
        <RequiredTextFieldWithError
          label="وزن"
          id="weight"
          recoilState={Atoms.weightState}
          type="number"
          customErrors={customErrors.weight}
          adornment="کیلوگرم"
          onError={onError}
          onNotError={onNotError}
          fullWidth
        />
        <RequiredTextFieldWithError
          id="height"
          label="قد"
          helperText={BMI > 0 && `BMI شما: ${BMI}`}
          recoilState={Atoms.heightState}
          type="number"
          customErrors={customErrors.height}
          adornment="متر"
          onError={onError}
          onNotError={onNotError}
          fullWidth
        />
      </Stack>{" "}
      {!isMobile && <br />}{" "}
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
      >
        <BirthdateDatePicker
          label="تاریخ تولد"
          dateState={Atoms.birthdateState}
          ageState={Atoms.ageState}
          onError={onError}
          onNotError={onNotError}
          customErrors={customErrors.age}
          fullWidth
          required
        />
        <RequiredTextFieldWithError
          label="بیمه انتخابی"
          recoilState={Atoms.agencyState}
          menuItems={Atoms.agencies}
          select
          onError={onError}
          onNotError={onNotError}
          fullWidth
        />
      </Stack>{" "}
      <br />
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Button
          variant="outlined"
          type="submit"
          disabled={erroredFields.length > 0}
          endIcon={<NavigateBeforeIcon />}
          onClick={onSubmit}
        >
          صفحه بعد{" "}
        </Button>{" "}
      </Stack>{" "}
    </Stack>
  );
};

export default FormOne;
