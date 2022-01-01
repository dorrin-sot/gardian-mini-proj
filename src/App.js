import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import FormOne from "./forms/FormOne";
import FormTwo from "./forms/FormTwo";
import FinalInfo from "./forms/FinalInfo";
import * as Atoms from "./recoil_components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import "./App.css";
import { useState } from "react";

// RTL cache and theme handling
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Yekan",
  },
});

function App() {
  const [pageCompleted, setPageCompleted] = useRecoilState(
    Atoms.pagesCompletionState
  );
  const pageNum = useRecoilValue(Atoms.pageNumberState);
  const steps = useRecoilValue(Atoms.stepsState);
  const nextPage = () =>
    setPageCompleted([
      ...pageCompleted.slice(0, pageNum - 1),
      true,
      ...pageCompleted.slice(pageNum),
    ]);

  const [isMobile, setIsMobile] = useState(getIsMobile());

  window.addEventListener("resize", (e) => {
    if (isMobile != getIsMobile()) setIsMobile(getIsMobile());
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
                  <StepLabel> {step.label} </StepLabel>
                </Step>
              ))}
            </Stepper>
            {
              [
                <FormOne onSubmit={nextPage} isMobile={isMobile} />,
                <FormTwo onSubmit={nextPage} isMobile={isMobile} />,
                <FinalInfo />,
              ][pageNum - 1]
            }
          </Box>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

function getIsMobile() {
  return window.innerWidth <= 700;
}

export default App;
