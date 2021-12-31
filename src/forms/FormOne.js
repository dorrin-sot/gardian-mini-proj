import { Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import RequiredTextFieldWithError from "../components/RequiredTextFieldWithError";
import * as Atoms from "../recoil_components/atoms";

const FormOne = ({ onSubmit, isMobile, style }) => {
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
        fieldIsValid: (newVal) => /^\+([0-9]){2,3}(([0-9]){5,9})$/.test(newVal),
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
        fieldIsValid: (newVal) => newVal >= 0,
        errMsg: "وزن نمیتواند عدد منفی باشد",
      },
    ],
    height: [
      {
        fieldIsValid: (newVal) => newVal >= 0,
        errMsg: "قد نمیتواند عدد منفی باشد",
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
    "نام",
    "نام خانوادگی",
    "تلفن همراه",
    "ایمیل",
    "سن",
    "وزن",
    "قد",
  ]);
  // if an error occurs add it to errored fields
  const onError = (field) => {
    const newErroredFields = erroredFields.filter((f) => f !== field);
    setErroredFields([...newErroredFields, field]);

    console.log(newErroredFields, erroredFields, [...newErroredFields, field]);
  };
  // if an error is fixed remove it from errored fields
  const onNotError = (field) => {
    const newErroredFields = erroredFields.filter((f) => f !== field);
    setErroredFields(newErroredFields);

    console.log(newErroredFields);
  };

  return (
    <form style={style}>
      <p>صدور بیمه نامه عمر</p>
      <RequiredTextFieldWithError
        label="نام"
        recoilState={Atoms.firstNameState}
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="نام خانوادگی"
        recoilState={Atoms.lastNameState}
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="تلفن همراه"
        recoilState={Atoms.phoneNumberState}
        customErrors={customErrors.phoneNumber}
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="ایمیل"
        type="email"
        recoilState={Atoms.emailState}
        customErrors={customErrors.email}
        fullWidth
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="سن"
        recoilState={Atoms.ageState}
        type="number"
        customErrors={customErrors.age}
        onError={onError}
        onNotError={onNotError}
      />
      <RequiredTextFieldWithError
        label="وزن"
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
        recoilState={Atoms.heightState}
        type="number"
        customErrors={customErrors.height}
        adornment="متر"
        onError={onError}
        onNotError={onNotError}
      />
      {/* if BMI > 0 show it as a label */}
      {BMI > 0 && <label htmlFor="height">BMI شما: {BMI}</label>}
      <RequiredTextFieldWithError
        label="بیمه انتخابی"
        recoilState={Atoms.agencyState}
        menuItems={Atoms.agencies}
        select
        onError={onError}
        onNotError={onNotError}
      />

      <LinearProgress variant="determinate" value={50} />
      <Button
        variant="outlined"
        type="submit"
        disabled={erroredFields.length > 0}
        onClick={onSubmit}
      >
        صفحه بعد!
      </Button>
    </form>
  );
};

function calcBMI(weight, height) {
  return Math.round((weight / (height * height)) * 100) / 100;
}

export default FormOne;
