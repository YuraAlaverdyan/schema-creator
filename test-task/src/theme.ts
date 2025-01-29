import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f8f9fa",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: "#f8f9fa",
          },
        },
      },
    },
    palette: {
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
    },
  })