import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import FormOne from "./forms/FormOne";
import FormTwo from "./forms/FormTwo";

// RTL cache and theme handling
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const themeRtl = createTheme({
  direction: "rtl",
});

function App() {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  // update "isMobile" if window is resized
  // window.addEventListener("resize", () => setIsMobile(getIsMobile()));

  const [pageNum, setPageNum] = useState(1);
  const goToPageTwo = () => setPageNum(2);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={themeRtl}>
        <div dir="rtl">
          {pageNum === 1 ? (
            <FormOne
              onSubmit={goToPageTwo}
              // isMobile={isMobile}
            />
          ) : (
            <FormTwo
            // isMobile={isMobile}
            />
          )}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

function getIsMobile() {
  return window.innerWidth <= 700;
}

export default App;
