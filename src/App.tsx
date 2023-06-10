import { Typography, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

import React from "react";

export const App = () => {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Typography variant="h1">IFRC Alert Hub</Typography>
      </ThemeProvider>
    </div>
  );
};

export default App;
