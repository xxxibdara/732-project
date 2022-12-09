import PropTypes from "prop-types";
import { useMemo } from "react";

import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import shadows, { customShadows } from "./shadows";

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 5 },
      typography,
      shadows,
      customShadows
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
