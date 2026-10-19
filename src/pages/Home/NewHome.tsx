import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MenuIcon from "../../assets/icons/MenuIcon";
import MainDrawer from "../../components/Drawer/Drawer";

export default function NewHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState<boolean>(!isMobile);
  const location = useLocation();
  const drawerWidth = 248;

  useEffect(() => {
    setOpenDrawer(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = openDrawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, openDrawer]);

  const pageTitle = useMemo(() => {
    const segment = location.pathname.split("/").filter(Boolean).at(-1) ?? "dashboard";
    const labels: Record<string, string> = {
      dashboard: "Overview",
      "create-bot": "Create Bot",
      "manage-bots": "Manage Bots",
      settings: "Settings",
    };
    return labels[segment] ?? "Bot Management";
  }, [location.pathname]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#101318" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#151920",
          color: "#E8ECF2",
          borderBottom: "1px solid #303744",
          boxShadow: "none",
          transition: "all 0.2s ease",
          ml: isMobile ? 0 : openDrawer ? `${drawerWidth}px` : 0,
          width: isMobile ? "100%" : openDrawer ? `calc(100% - ${drawerWidth}px)` : "100%",
        }}
      >
        <Toolbar sx={{ minHeight: 68, px: { xs: 2, sm: 3 } }}>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={() => setOpenDrawer((prev) => !prev)}
            sx={{
              mr: 2,
              width: 40,
              height: 40,
              border: "1px solid #303744",
              backgroundColor: "#1B2028",
              "&:hover": { backgroundColor: "#222833" },
            }}
          >
            <MenuIcon sx={{ width: 20, height: 20, color: "#E4B72C" }} />
          </IconButton>
          <Box>
            <Typography variant="caption" sx={{ color: "#9AA4B2", textTransform: "uppercase", letterSpacing: 1.2 }}>
              Bot Management
            </Typography>
            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600, lineHeight: 1.2 }}>
              {pageTitle}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="left"
        variant={isMobile ? "temporary" : "persistent"}
        ModalProps={{ keepMounted: isMobile }}
        sx={{
          width: isMobile ? "100%" : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "min(80vw, 280px)" : drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#151920",
            borderRight: isMobile ? "none" : "1px solid #303744",
            borderRadius: 0,
            boxShadow: isMobile ? "0 16px 40px rgba(0,0,0,0.45)" : "none",
            top: 0,
            height: "100vh",
            p: 0,
            maxWidth: "100vw",
          },
        }}
      >
        <MainDrawer onCollapse={() => setOpenDrawer(false)} isCollapsed={!openDrawer} />
      </Drawer>

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          transition: "all 0.2s ease",
          pl: isMobile ? 0 : openDrawer ? `${drawerWidth}px` : 0,
          pt: 8,
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

