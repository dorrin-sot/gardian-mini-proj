import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import FormOne from "./forms/FormOne";
import FormTwo from "./forms/FormTwo";
import * as Atoms from "./recoil_components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import "./App.css";

// RTL cache and theme handling
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const themeRtl = createMuiTheme({
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

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={themeRtl}>
        <div dir="rtl">
          <Box className="form">
            <h2 className="form-title"> صدور بیمه نامه عمر </h2>
            <Stepper activeStep={pageNum - 1}>
              {steps.map((step) => (
                <Step
                  onClick={() => console.log(step)}
                  key={step.num}
                  completed={step.completed}
                >
                  <StepLabel> {step.label} </StepLabel>
                </Step>
              ))}
            </Stepper>
            {
              [
                <FormOne onSubmit={nextPage} />,
                <FormTwo onSubmit={nextPage} />,
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
