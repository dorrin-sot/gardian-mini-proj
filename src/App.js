import rtlPlugin from "stylis-plugin-rtl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import * as Atoms from "./recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FormOne from "./forms/FormOne";
import FormTwo from "./forms/FormTwo";
import {
  Alert,
  Box,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Snackbar,
} from "@mui/material";
import "./App.css";
import useResetAllAtoms from "./hooks/useResetAllAtoms";

// RTL cache and theme handling
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Yekan",
  },
});

function App() {
  const [pagesCompleted, setPagesCompleted] = useRecoilState(
    Atoms.pagesCompletionState
  );
  const pageNum = useRecoilValue(Atoms.pageNumberState);
  const resetAllAtoms = useResetAllAtoms();
  const nextPage = () => {
    // if on last page reset all atoms (also causing going back to first page)
    // otherwise go to next page
    if (pagesCompleted[0] && pagesCompleted[1] && !pagesCompleted[2]) {
      resetAllAtoms.forEach((resetFn) => resetFn());
    } else
      setPagesCompleted([
        ...pagesCompleted.slice(0, pageNum - 1),
        true,
        ...pagesCompleted.slice(pageNum),
      ]);
  };
  const steps = useRecoilValue(Atoms.stepsState);

  const [isMobile, setIsMobile] = useState(getIsMobile());
  // if window is resized, update isMobile
  window.addEventListener("resize", (e) => {
    const newIsMobile = getIsMobile();
    if (isMobile !== newIsMobile) setIsMobile(newIsMobile);
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" className="top">
          <Box className="form">
            <h2 className="form-title"> صدور بیمه نامه عمر </h2>
            <Stepper activeStep={pageNum - 1}>
              {steps.map((step) => (
                <Step key={step.num} completed={step.completed}>
                  <StepLabel fontSize="inherit"> {step.label} </StepLabel>
                </Step>
              ))}
            </Stepper>
            {
              [
                <FormOne onSubmit={nextPage} isMobile={isMobile} />,
                <FormTwo onSubmit={nextPage} isMobile={isMobile} />,
                <FormTwo
                  onSubmit={nextPage}
                  isMobile={isMobile}
                  isConfirmPage
                />,
              ][pageNum - 1]
            }
          </Box>
          {/* Toast for completeion on last page */}
          <Snackbar open={pageNum === 3} autoHideDuration={5000}>
            <Alert
              variant="filled"
              severity="success"
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={nextPage} // goes back to first page
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              اطلاعات شما با موفقیت ثبت شد!
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

function getIsMobile() {
  return window.innerWidth <= 700;
}

export default App;
