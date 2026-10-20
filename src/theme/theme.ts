// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E4B72C",
      light: "#F2C74D",
      dark: "#C79D1D",
      contrastText: "#101318",
    },
    secondary: {
      main: "#6E8FCF",
      contrastText: "#E8ECF2",
    },
    success: {
      main: "#3C8D6F",
    },
    warning: {
      main: "#E4B72C",
    },
    error: {
      main: "#F87171",
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
      disabled: "#6B7280",
    },
    divider: "#303744",
  },
  typography: {
    fontFamily: '"Inter", "Manrope", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.07em" },
    h2: { fontWeight: 800, letterSpacing: "-0.065em" },
    h3: { fontWeight: 700, letterSpacing: "-0.055em" },
    h4: { fontWeight: 700, letterSpacing: "-0.04em" },
    h5: { fontWeight: 700, letterSpacing: "-0.035em" },
    h6: { fontWeight: 700, letterSpacing: "-0.03em" },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.65 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: "#101318",
        },
        body: {
          backgroundColor: "#101318",
          color: "#E8ECF2",
          minHeight: "100vh",
        },
        "#root": {
          minHeight: "100vh",
          backgroundColor: "#101318",
        },
        "*::selection": {
          backgroundColor: "rgba(228, 183, 44, 0.2)",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1B2028",
          borderColor: "#303744",
          color: "#E8ECF2",
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
          borderLeft: "none",
          borderRight: "none",
          color: "#E8ECF2",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 700,
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
            backgroundColor: "#F0C94A",
          },
        },
        containedSecondary: {
          backgroundColor: "#1B2028",
          color: "#E8ECF2",
          border: "1px solid #303744",
          "&:hover": {
            backgroundColor: "#222833",
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
          backgroundColor: "#101318",
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
          color: "#9AA4B2",
          "&.Mui-selected": {
            backgroundColor: "rgba(228, 183, 44, 0.12)",
            border: "1px solid rgba(228, 183, 44, 0.35)",
            color: "#E8ECF2",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(228, 183, 44, 0.18)",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.03)",
          },
          "& .MuiListItemIcon-root": {
            color: "#9AA4B2",
          },
          "&.Mui-selected .MuiListItemIcon-root": {
            color: "#E4B72C",
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
            backgroundColor: "rgba(255,255,255,0.04)",
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