import { atom, selector } from "recoil";
import moment from "moment";

// a list of booleans to show if each page is completed or not
export const pagesCompletionState = atom({
  key: "pagesCompletionState",
  default: [false, false, false],
});

export const stepsState = selector({
  key: "stepsState",
  get: ({ get }) => {
    const completeds = get(pagesCompletionState);
    return [
      {
        label: "اطلاعات شخصی",
        completed: completeds[0],
        num: 1,
      },
      {
        label: "اطلاعات پزشکی",
        completed: completeds[1],
        num: 2,
      },
      {
        label: "ارسال اطلاعات",
        completed: completeds[2],
        num: 3,
      },
    ];
  },
});

// is the current page number
// the first page (in "pagesCompletionState") that wasnt completed (is false)
export const pageNumberState = selector({
  key: "pageNumberState",
  get: ({ get }) => {
    const completeds = get(pagesCompletionState);
    for (var i = 0; i < completeds.length; i++)
      if (!completeds[i]) return i + 1;
  },
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

export const birthdateState = atom({
  key: "birthdateState",
  default: Date.now(),
});

export const ageState = selector({
  key: "ageState",
  get: ({ get }) =>
    moment(Date.now()).diff(moment(get(birthdateState)), "years"),
});

export const weightState = atom({
  key: "weightState",
  default: 0,
});

export const heightState = atom({
  key: "heightState",
  default: 0,
});

function calcBMI(weight, height) {
  return Math.round((weight / (height * height)) * 1000) / 1000;
}
export const bmiState = selector({
  key: "bmiState",
  get: ({ get }) => {
    const [weight, height] = [get(weightState), get(heightState)];

    if (weight > 0 && height > 0) return calcBMI(weight, height);
    return 0;
  },
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

export const sicknessesState = atom({
  key: "sicknessesState",
  default: "",
});
