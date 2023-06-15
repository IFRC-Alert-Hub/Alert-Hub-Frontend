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
      default: "#FAF9F9",
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
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#f5333f",
            },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#5A5A5A",
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.MuiCheckbox-root.Mui-checked": {
            color: "#f5333f",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
  },
});
