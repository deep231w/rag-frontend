import {
  Alert,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
  type AlertColor,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomDrawer from "./CustomDrawer";
import { PdfViewer } from "./PdfViewer";
import BotIcon from "../assets/icons/BotIcon";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

export default function ManageBots() {
  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  const [bots, setBots] = useState<
    {
      id: string;
      adminId: string;
      botName: string;
      description: string;
      files: { id: string; fileName: string; url: string }[];
    }[]
  >([]);

  const [alert, setAlert] = useState<{
    message: string;
    servirity: AlertColor;
    open: boolean;
  }>({
    message: "",
    servirity: "info",
    open: false,
  });

  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [isDrawer, setIsDrawer] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [PdfForView, setPdfForView] = useState<any>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, bot: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedBot(bot);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  async function fetchBots() {
    if (!admin) {
      setAlert({ open: true, servirity: "warning", message: "please login again" });
      console.log("admin doesnot exist");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bot/getbotsdata`, {
        params: {
          adminId: admin.userId,
        },
        headers: {
          "ngrok-skip-browser-warning": "true",
          Accept: "application/json",
        },
      });

      console.log("response of bots - ", response.data);
      const botsdata = response.data.bots.map((bot: any) => ({
        id: bot._id,
        adminId: bot.adminId,
        botName: bot.name,
        description: bot.description || "N/A",
        files: bot.files.map((f: any) => ({
          id: f._id,
          fileName: f.name,
          url: f.url,
        })),
      }));
      setBots(botsdata);
    } catch (e) {
      console.log("error in fetch bots -", e);
    }
  }

  useEffect(() => {
    fetchBots();
  }, [admin?.userId]);

  function handleClose() {
    setAlert({ open: false, servirity: "info", message: "" });
  }

  const handleSetPdfFileForView = (data: any) => {
    setPdfForView(data);
  };

  function BotCLick(bot: any) {
    console.log("bot clicked -", bot);
    setIsDrawer(!isDrawer);
    setDrawerContent(
      <CustomDrawer
        bot={bot}
        onClose={() => setDrawerContent(null)}
        isOpenPdf={() => setIsPdfViewerOpen(true)}
        setPdfFile={handleSetPdfFileForView}
        admin={admin}
      />
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Manage Bots
        </Typography>
        <Typography variant="body2" sx={{ color: "#9AA4B2" }}>
          Review your configured bot collections and manage document access.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {bots.length >= 1 ? (
          bots.map((bot) => (
            <Grid key={bot.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  border: "1px solid #303744",
                  borderRadius: 2,
                  backgroundColor: "#1B2028",
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    borderColor: "#4B5568",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#151920",
                        border: "1px solid #303744",
                      }}
                    >
                      <BotIcon height="30px" width="30px" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>
                        {bot.botName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9AA4B2" }}>
                        {bot.files.length} document{bot.files.length === 1 ? "" : "s"}
                      </Typography>
                    </Box>
                  </Box>

                  <IconButton
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={(e) => handleClick(e, bot)}
                    sx={{ border: "1px solid #303744", backgroundColor: "#151920" }}
                  >
                    <MoreVertOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#9AA4B2",
                    fontSize: 14,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: 42,
                  }}
                >
                  {bot.description}
                </Typography>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                  <Typography
                    variant="button"
                    sx={{
                      color: "#E4B72C",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                    onClick={() => BotCLick(bot)}
                  >
                    Open
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                backgroundColor: "#1B2028",
                border: "1px solid #303744",
                borderRadius: 2,
                p: 3,
                color: "#9AA4B2",
              }}
            >
              No bots found.
            </Box>
          </Grid>
        )}
      </Grid>

      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => { BotCLick(selectedBot); handleCloseMenu(); }}>Open</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Manage</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Export</MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: "#D96868" }}>Delete Bot</MenuItem>
      </Menu>

      {drawerContent && drawerContent}
      {isPdfViewerOpen && PdfForView && (
        <PdfViewer open={isPdfViewerOpen} file={PdfForView} onClose={() => setIsPdfViewerOpen(false)} />
      )}

      {alert.open && (
        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.servirity} variant="filled" sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}