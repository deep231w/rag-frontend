// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E4B72C",
      light: "#F0C758",
      dark: "#C09716",
      contrastText: "#101318",
    },
    secondary: {
      main: "#8CA2B8",
      contrastText: "#E8ECF2",
    },
    success: {
      main: "#3C8D6F",
    },
    warning: {
      main: "#D69E2E",
    },
    error: {
      main: "#D96868",
    },
    info: {
      main: "#6E8FCF",
    },
    background: {
      default: "#101318",
      paper: "#1B2028",
    },
    text: {
      primary: "#E8ECF2",
      secondary: "#9AA4B2",
      disabled: "#717C8B",
    },
    divider: "#303744",
  },
  typography: {
    fontFamily: "Poppins, Inter, sans-serif",
    h1: { fontWeight: 700, letterSpacing: "-0.06em" },
    h2: { fontWeight: 700, letterSpacing: "-0.05em" },
    h3: { fontWeight: 700, letterSpacing: "-0.04em" },
    h4: { fontWeight: 700, letterSpacing: "-0.03em" },
    h5: { fontWeight: 600, letterSpacing: "-0.02em" },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.55 },
    body2: { lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#101318",
          color: "#E8ECF2",
          minHeight: "100vh",
        },
        "*::selection": {
          backgroundColor: "rgba(228, 183, 44, 0.28)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#151920",
          color: "#E8ECF2",
          boxShadow: "none",
          borderBottom: "1px solid #303744",
          borderRadius: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#151920",
          borderRight: "1px solid #303744",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          transition: "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
          "&:active": {
            transform: "translateY(0)",
          },
        },
        containedPrimary: {
          backgroundColor: "#E4B72C",
          color: "#101318",
          "&:hover": {
            backgroundColor: "#D3A517",
          },
        },
        containedSecondary: {
          backgroundColor: "#222833",
          color: "#E8ECF2",
          border: "1px solid #303744",
          "&:hover": {
            backgroundColor: "#2A3140",
          },
        },
        outlined: {
          borderColor: "#303744",
          color: "#E8ECF2",
          "&:hover": {
            borderColor: "#4B5568",
            backgroundColor: "rgba(255,255,255,0.02)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#151920",
          borderRadius: 10,
          color: "#E8ECF2",
          "& fieldset": {
            borderColor: "#303744",
          },
          "&:hover fieldset": {
            borderColor: "#4B5568",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#E4B72C",
          },
        },
        input: {
          color: "#E8ECF2",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#9AA4B2",
          "&.Mui-focused": {
            color: "#E4B72C",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "background-color 0.2s ease, border-color 0.2s ease",
          "&.Mui-selected": {
            backgroundColor: "rgba(228, 183, 44, 0.12)",
            border: "1px solid rgba(228, 183, 44, 0.35)",
            color: "#E8ECF2",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(228, 183, 44, 0.18)",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.02)",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1B2028",
          border: "1px solid #303744",
          color: "#E8ECF2",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: "#E8ECF2",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.03)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: "#E8ECF2",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.04)",
          },
        },
      },
    },
  },
});