import { atom } from "recoil";

export const steps = [
  {
    label: "وارد کردن اطلاعات شخصی",
    completed: false,
    num: 1,
  },
  {
    label: "وارد کردن اطلاعات پزشکی",
    completed: false,
    num: 2,
  },
  {
    label: "مرور اطلاعات",
    completed: false,
    num: 3,
  },
];
export const pageNumberState = atom({
  key: "pageNumberState",
  default: steps[1].num,
});

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

export const doesSmokeState = atom({
  key: "doesSmokeState",
  default: false,
});

export const smokeCountState = atom({
  key: "smokeCountState",
  default: 0,
});

export const doesVapeState = atom({
  key: "doesVapeState",
  default: false,
});

export const vapeCountState = atom({
  key: "vapeCountState",
  default: 0,
});
