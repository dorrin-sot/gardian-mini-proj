import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import FormOne from "./forms/FormOne";
import FormTwo from "./forms/FormTwo";
import { pageNumberState, steps } from "./recoil_components/atoms";
import { useRecoilState } from "recoil";
import { Step, StepLabel, Stepper } from "@mui/material";
import "./App.css";

// RTL cache and theme handling
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const themeRtl = createTheme({
  direction: "rtl",
});

function App() {
  const [pageNum, setPageNum] = useRecoilState(pageNumberState);
  const nextPage = () => setPageNum(pageNum + 1);

  const pageStepper = (
    <Stepper activeStep={pageNum - 1}>
      {steps.map((step) => (
        <Step key={step.num} completed={step.completed}>
          <StepLabel className="step-label">{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={themeRtl}>
        <div dir="rtl">
          {
            [
              <FormOne
                onSubmit={nextPage}
                stepper={pageStepper}
              />,
              <FormTwo
                onSubmit={nextPage}
                stepper={pageStepper}
              />,
            ][pageNum - 1]
          }
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

function getIsMobile() {
  return window.innerWidth <= 700;
}

export default App;
