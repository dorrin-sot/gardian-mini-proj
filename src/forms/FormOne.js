import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import RequiredTextFieldWithError from "../components/RequiredTextFieldWithError";
import * as Atoms from "../recoil_components/atoms";
import NavigateNext from "@mui/icons-material/NavigateNext";
import "../App.css";

const FormOne = ({ onSubmit, stepper }) => {
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

  // listen for changes in weight and height and update bmi
  const [BMI, setBMI] = useRecoilState(Atoms.bmiState);
  const weight = useRecoilValue(Atoms.weightState);
  const height = useRecoilValue(Atoms.heightState);
  useEffect(() => {
    if (weight > 0 && height > 0) setBMI(calcBMI(weight, height));
  }, [weight, height]);

  // errored fields are fields that have encountered error(s)
  // all fields are empty in the beginning
  const [erroredFields, setErroredFields] = useState([
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "age",
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

    console.log(newErroredFields);
  };

  return (
    <Box className="form">
      <h2 className="form-title">صدور بیمه نامه عمر</h2>
      {stepper}
      <RequiredTextFieldWithError
        id="firstName"
        label="نام"
        recoilState={Atoms.firstNameState}
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="نام خانوادگی"
        id="lastname"
        recoilState={Atoms.lastNameState}
        onError={onError}
        onNotError={onNotError}
      />
      <br />
      <RequiredTextFieldWithError
        label="تلفن همراه"
        id="phoneNumber"
        recoilState={Atoms.phoneNumberState}
        customErrors={customErrors.phoneNumber}
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="ایمیل"
        id="email"
        type="email"
        recoilState={Atoms.emailState}
        customErrors={customErrors.email}
        fullWidth
        onError={onError}
        onNotError={onNotError}
      />
      <br />
      <RequiredTextFieldWithError
        label="سن"
        id="age"
        recoilState={Atoms.ageState}
        type="number"
        customErrors={customErrors.age}
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="وزن"
        id="weight"
        recoilState={Atoms.weightState}
        type="number"
        customErrors={customErrors.weight}
        adornment="کیلوگرم"
        onError={onError}
        onNotError={onNotError}
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
      />
      <RequiredTextFieldWithError
        label="بیمه انتخابی"
        recoilState={Atoms.agencyState}
        menuItems={Atoms.agencies}
        select
        onError={onError}
        onNotError={onNotError}
      />
      <Button
        className="submit-form-btn"
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

export default FormOne;
