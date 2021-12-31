import { atom } from "recoil";

export const firstNameState = atom({
  key: "firstNameState",
  default: "",
});

export const lastNameState = atom({
  key: "lastNameState",
  default: "",
});

export const phoneNumberState = atom({
  key: "phoneNumberState",
  default: "",
});

export const emailState = atom({
  key: "emailState",
  default: "",
});

export const ageState = atom({
  key: "ageState",
  default: 0,
});

export const weightState = atom({
  key: "weightState",
  default: 0,
});

export const heightState = atom({
  key: "heightState",
  default: 0,
});

export const bmiState = atom({
  key: "bmiState",
  default: 0,
});

export const agencies = ["بیمه ۱", "بیمه ۲", "بیمه ۳", "بیمه ۴"];
export const agencyState = atom({
  key: "agencyState",
  default: agencies[0],
});
