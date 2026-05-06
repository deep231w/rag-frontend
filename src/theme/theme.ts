// src/theme.ts
import { createTheme } from "@mui/material/styles";

const drawerWidth = 240;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1", 
    },
    background: {
      default: "#0f172a", 
      paper: "#1e293b",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    h6: {
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          boxShadow: "7px",
          borderRadius:"12px",
          height:"70px",
          justifyContent:"center"
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: drawerWidth,
          backgroundColor: "#020617",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 24,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#e2e8f0",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});