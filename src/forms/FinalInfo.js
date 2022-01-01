// import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
// import { Button, Stack } from "@mui/material";

// const FinalInfo = (onSubmit) => {
//   return (
//     <Stack>
//       <br />
//       <Stack direction="row" justifyContent="center" alignItems="center">
//         <Button
//           variant="outlined"
//           type="submit"
//           endIcon={<SentimentVerySatisfiedIcon fontSizeLarge />}
//           onClick={onSubmit}
//           sx={{
//             mt: 20,
//             p: 2,
//             fontSize: 30,
//           }}
//         >
//           تایید و بازگشت به اول
//         </Button>
//       </Stack>
//     </Stack>
//   );
// };

// export default FinalInfo;



// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import { useRecoilValue } from "recoil";
// import * as Atoms from "../recoil_components/atoms";
// import { Box, Stack } from "@mui/material";
// import { flexbox } from "@mui/system";

// const FinalInfo = () => {
//   const values = [
//     useRecoilValue(Atoms.firstNameState),
//     useRecoilValue(Atoms.lastNameState),
//     useRecoilValue(Atoms.emailState),
//     useRecoilValue(Atoms.phoneNumberState),
//     useRecoilValue(Atoms.birthdateState),
//     useRecoilValue(Atoms.ageState),
//     useRecoilValue(Atoms.weightState),
//     useRecoilValue(Atoms.heightState),
//     useRecoilValue(Atoms.bmiState),
//     useRecoilValue(Atoms.agencyState),
//     useRecoilValue(Atoms.doesSmokeState),
//     useRecoilValue(Atoms.doesVapeState),
//     useRecoilValue(Atoms.smokeCountState),
//     useRecoilValue(Atoms.vapeCountState),
//     useRecoilValue(Atoms.sicknessesState),
//   ];
//   const [
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     birthdate,
//     age,
//     weight,
//     height,
//     bmi,
//     agency,
//     doesSmoke,
//     doesVape,
//     smokeCount,
//     vapeCount,
//     sicknesses,
//   ] = values;
//   const labels = [
//     "نام",
//     "نام خانوادگی",
//     "ایمیل",
//     "تلفن همراه",
//     "تاریخ تولد",
//     "سن",
//     "وزن",
//     "قد",
//     "BMI",
//     "بیمه انتخابی",
//     "مصرف سیگار",
//     "مصرف قلیان",
//     "تعداد نخ سیگار در روز",
//     "تعداد بار قلیان در روز",
//     "بیماری‌ها/معلولیت‌ها",
//   ];

//   return (
//     <div style={{ flexDirection: "row" }}>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//       <Item>Item 1</Item>
//     </div>
//   );
// };

// export default FinalInfo;

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   width: 100,
//   color: theme.palette.text.secondary,
// }));
