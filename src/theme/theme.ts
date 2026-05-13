// src/theme.ts
import { createTheme } from "@mui/material/styles";

const drawerWidth = 250;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1", 
    },
    background: {
      default: "#020617",
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
    MuiCssBaseline:{
        styleOverrides:{
            paddingTop:"12px"
        }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#28262667",
          boxShadow: "7px",
          borderRadius:"12px",
          height:"70px",
          justifyContent:"center",
          marginTop:"12px",
        //   marginLeft:"12px",
          marginRight:"12px",
          border: "1px solid white",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
        //   width: drawerWidth,
          backgroundColor: "#28262667",
        //   borderRight: "1px solid rgba(255,255,255,0.05)",
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
      borderRadius: 12,
      textTransform: "none",
      fontWeight: 600,

      transition: "all 0.2s ease",
    },

    contained: {
      backgroundColor: "#c8a30f", // yellow
      color: "#000",

      "&:hover": {
        backgroundColor: "#70570a",
      },

      "&:active": {
        transform: "scale(0.98)",
      },

      "&.Mui-disabled": {
        backgroundColor: "rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.3)",
      },
    },
  },
},  },
});