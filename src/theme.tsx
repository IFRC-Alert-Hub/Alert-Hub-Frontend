import { createTheme, Theme } from "@mui/material/styles";

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#f5333f",
    },
    background: {
      default: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 40,
      color: "#000000",
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 32,
      color: "#000000",
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 24,
      color: "#000000",
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 20,
      color: "#000000",
    },
    h5: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
      color: "#000000",
    },
    h6: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
      color: "#000000",
    },
  },
});
