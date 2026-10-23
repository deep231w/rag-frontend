import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
  type AlertColor,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import CustomDrawer from "./botSecDrawer";
import BotSecDrawer from "./botSecDrawer";
import { PdfViewer } from "./PdfViewer";
import BotIcon from "../assets/icons/BotIcon";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { RenderColdStartNotice, useRenderColdStartNotice } from "./RequestLoadingNotice";

type BotRecord = {
  id: string;
  adminId: string;
  botName: string;
  description: string;
  botKey?: string;
  files: { id: string; fileName: string; url: string }[];
};

type SnippetLanguage = "node" | "javascript" | "react";

const maskSecret = (value: string) => {
  if (!value) return "";
  if (value.length <= 12) return "••••••";
  return `${value.slice(0, 6)}••••••${value.slice(-4)}`;
};

const getApiBaseUrl = () => {
  const baseUrl = typeof import.meta.env !== "undefined" ? String(import.meta.env.VITE_API_URL || "") : "";
  return baseUrl ? baseUrl.replace(/\/+$/, "") : "https://api.yourdomain.com";
};

const escapeForSnippet = (value: string) => JSON.stringify(value);

const buildNodeSnippet = (botId: string, botKey: string) => {
  const botIdValue = escapeForSnippet(botId || "YOUR_BOT_ID");
  const botKeyValue = escapeForSnippet(botKey || "YOUR_BOT_API_KEY");
  const apiBaseUrl = getApiBaseUrl();

  return `import { config } from "dotenv";

config();

const API_BASE_URL = process.env.API_BASE_URL ?? "${apiBaseUrl}";
const BOT_ID = process.env.BOT_ID ?? ${botIdValue};
const BOT_API_KEY = process.env.BOT_API_KEY ?? ${botKeyValue};

const question = "What information is available in this bot's documents?";

const response = await fetch(\`${apiBaseUrl}/ask-bot-sdk\`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    question,
    botId: BOT_ID,
    botKey: BOT_API_KEY,
  }),
});

if (!response.ok) {
  throw new Error(\`Request failed: \${response.status} \${response.statusText}\`);
}

const data = await response.json();
console.log(data);
console.log(data.answer ?? "No answer returned.");`;
};

const buildJavaScriptSnippet = (botId: string, botKey: string) => {
  const botIdValue = escapeForSnippet(botId || "YOUR_BOT_ID");
  const botKeyValue = escapeForSnippet(botKey || "YOUR_BOT_API_KEY");
  const apiBaseUrl = getApiBaseUrl();

  return `// Security warning: browser JavaScript is public.
// Never commit a real secret API key to a frontend file or Git repo.
// For production, call your backend or a serverless function instead.

const apiBaseUrl = "${apiBaseUrl}";
const botId = ${botIdValue};
const botKey = ${botKeyValue};

const question = "What information is available in this bot's documents?";

const response = await fetch(\`${apiBaseUrl}/ask-bot-sdk\`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    question,
    botId,
    botKey,
  }),
});

if (!response.ok) {
  throw new Error(\`Request failed: \${response.status} \${response.statusText}\`);
}

const data = await response.json();
console.log(data);
console.log(data.answer ?? "No answer returned.");`;
};

const buildReactSnippet = (botId: string) => {
  const botIdValue = escapeForSnippet(botId || "YOUR_BOT_ID");
  const apiBaseUrl = getApiBaseUrl();

  return `import { useState } from "react";

const apiBaseUrl = "${apiBaseUrl}";
const botId = ${botIdValue};
const botKey = "REPLACE_WITH_SERVER_PROXY_RESULT";

export default function BotQueryExample() {
  const [question, setQuestion] = useState("What information is available in this bot's documents?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(\`${apiBaseUrl}/ask-bot-sdk\`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          botId,
          botKey,
        }),
      });

      if (!response.ok) {
        throw new Error(\`Request failed: \${response.status} \${response.statusText}\`);
      }

      const data = await response.json();
      setAnswer(data.answer ?? "No answer returned.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Ask a question"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Ask Bot"}
      </button>

      {error && <p role="alert">{error}</p>}
      {answer && <p>{answer}</p>}
    </form>
  );
}`;
};

export default function ManageBots() {
  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  const [bots, setBots] = useState<BotRecord[]>([]);

  const [loading, setLoading] = useState(false);
  const slowNoticeVisible = useRenderColdStartNotice(loading);

  const [alert, setAlert] = useState<{
    message: string;
    servirity: AlertColor;
    open: boolean;
  }>({
    message: "",
    servirity: "info",
    open: false,
  });

  const [selectedBot, setSelectedBot] = useState<BotRecord | null>(null);
  const [isDrawer, setIsDrawer] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [PdfForView, setPdfForView] = useState<any>();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState<SnippetLanguage>("node");
  const [showApiKey, setShowApiKey] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, bot: BotRecord) => {
    setAnchorEl(event.currentTarget);
    setSelectedBot(bot);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const closeExportModal = () => {
    setExportModalOpen(false);
    setShowApiKey(false);
    setActiveSnippetTab("node");
  };

  const handleCopyText = async (value: string, label: string) => {
    if (!value) {
      setAlert({
        open: true,
        servirity: "warning",
        message: `${label} is not available yet.`,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setAlert({
        open: true,
        servirity: "success",
        message: `${label} copied to clipboard.`,
      });
    } catch (error) {
      setAlert({
        open: true,
        servirity: "error",
        message: `Unable to copy ${label.toLowerCase()} to the clipboard.`,
      });
    }
  };

  async function fetchBots() {
    if (!admin) {
      setAlert({ open: true, servirity: "warning", message: "please login again" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bot/getbotsdata`, {
        params: { adminId: admin.userId },
        headers: {
          "ngrok-skip-browser-warning": "true",
          Accept: "application/json",
        },
      });

      const botsdata = response.data.bots.map((bot: any) => ({
        id: bot._id,
        adminId: bot.adminId,
        botName: bot.name,
        description: bot.description || "N/A",
        botKey: bot.botKey || "",
        files: bot.files.map((f: any) => ({
          id: f._id,
          fileName: f.name,
          url: f.url,
        })),
      }));
      setBots(botsdata);
    } catch (e) {
      console.log("error in fetch bots -", e);
    } finally {
      setLoading(false);
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

  function BotCLick(bot: BotRecord) {
    setIsDrawer(!isDrawer);
    setDrawerContent(
      <BotSecDrawer
        bot={bot}
        onClose={() => setDrawerContent(null)}
        isOpenPdf={() => setIsPdfViewerOpen(true)}
        setPdfFile={handleSetPdfFileForView}
        admin={admin}
      />
    );
  }

  const activeBotId = selectedBot?.id || "";
  const activeBotKey = selectedBot?.botKey || "";
  const hasBotKey = Boolean(activeBotKey && activeBotKey.trim());
  const activeSnippet =
    activeSnippetTab === "node"
      ? buildNodeSnippet(activeBotId, activeBotKey)
      : activeSnippetTab === "javascript"
        ? buildJavaScriptSnippet(activeBotId, activeBotKey)
        : buildReactSnippet(activeBotId);

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

      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#9AA4B2" }}>
          <CircularProgress size={18} thickness={5} sx={{ color: "#E4B72C" }} />
          <Typography variant="body2">Loading bots…</Typography>
        </Box>
      )}
      <RenderColdStartNotice visible={slowNoticeVisible} />

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
              {loading ? "Loading bots..." : "No bots found."}
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
        <MenuItem
          onClick={() => {
            if (selectedBot) {
              BotCLick(selectedBot);
            }
            handleCloseMenu();
          }}
        >
          Open
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>Manage</MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedBot) {
              setExportModalOpen(true);
            }
            handleCloseMenu();
          }}
        >
          Export
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: "#D96868" }}>
          Delete Bot
        </MenuItem>
      </Menu>

      <Dialog
        open={exportModalOpen}
        onClose={closeExportModal}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: "#101720",
            border: "1px solid #303744",
            borderRadius: 3,
            boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
            overflow: "hidden",
          },
        }}
      >
        {selectedBot && (
          <>
            <DialogTitle sx={{ borderBottom: "1px solid #303744", pb: 2, px: 3, pt: 2.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#F8FAFC" }}>
                    Integrate Your Bot
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: "#9AA4B2" }}>
                    Connect your application to this bot using our API.
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1.5, color: "#E4B72C" }}>
                    {selectedBot.botName}
                  </Typography>
                </Box>

                <IconButton
                  onClick={closeExportModal}
                  aria-label="Close export modal"
                  sx={{
                    border: "1px solid #303744",
                    backgroundColor: "#151920",
                    color: "#E2E8F0",
                    width: 36,
                    height: 36,
                  }}
                >
                  <CloseOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ px: 3, py: 3 }}>
              <Stack spacing={3}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(16, 24, 32, 0.9)",
                    border: "1px solid #303744",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: "#9AA4B2", mb: 1.5 }}>
                    Bot credentials
                  </Typography>

                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" sx={{ color: "#9AA4B2", display: "block", mb: 0.75 }}>
                        Bot ID
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                          p: 1.25,
                          borderRadius: 1.5,
                          border: "1px solid #303744",
                          backgroundColor: "#0F172A",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            fontSize: 13,
                            color: "#E2E8F0",
                            wordBreak: "break-all",
                          }}
                        >
                          {activeBotId || "Bot ID unavailable"}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<ContentCopyOutlinedIcon fontSize="small" />}
                          disabled={!activeBotId}
                          onClick={() => handleCopyText(activeBotId, "Bot ID")}
                          sx={{ minWidth: 110, borderColor: "#3B4252", color: "#F8FAFC" }}
                        >
                          Copy
                        </Button>
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="caption" sx={{ color: "#9AA4B2", display: "block", mb: 0.75 }}>
                        Bot API Key
                      </Typography>

                      {!hasBotKey ? (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          <Alert severity="warning" sx={{ borderRadius: 2 }}>
                            API key not generated. Generate a bot API key before integrating this bot.
                          </Alert>
                          <Typography variant="body2" sx={{ color: "#9AA4B2" }}>
                            This secret must not be exposed in public frontend code or committed to Git. The API key
                            must remain on the server or behind your backend proxy.
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                            p: 1.25,
                            borderRadius: 1.5,
                            border: "1px solid #303744",
                            backgroundColor: "#0F172A",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "monospace",
                              fontSize: 13,
                              color: "#E2E8F0",
                              wordBreak: "break-all",
                              flex: 1,
                            }}
                          >
                            {showApiKey ? activeBotKey : maskSecret(activeBotKey)}
                          </Typography>

                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: "#3B4252", color: "#F8FAFC" }}
                              onClick={() => setShowApiKey((current) => !current)}
                              startIcon={showApiKey ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                            >
                              {showApiKey ? "Hide" : "Reveal"}
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<ContentCopyOutlinedIcon fontSize="small" />}
                              onClick={() => handleCopyText(activeBotKey, "Bot API key")}
                              sx={{ minWidth: 110, borderColor: "#3B4252", color: "#F8FAFC" }}
                            >
                              Copy
                            </Button>
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </Box>

                <Box>
                  <Box sx={{ mb: 1.5 }}>
                    <Tabs
                      value={activeSnippetTab}
                      onChange={(_, value) => setActiveSnippetTab(value)}
                      variant="fullWidth"
                      sx={{
                        border: "1px solid #303744",
                        borderRadius: 2,
                        backgroundColor: "#151920",
                        minHeight: 44,
                        ".MuiTabs-indicator": {
                          backgroundColor: "#E4B72C",
                          height: 3,
                          borderRadius: 2,
                        },
                      }}
                    >
                      <Tab label="Node.js" value="node" sx={{ color: "#CBD5E1", fontWeight: 600 }} />
                      <Tab label="JavaScript" value="javascript" sx={{ color: "#CBD5E1", fontWeight: 600 }} />
                      <Tab label="React" value="react" sx={{ color: "#CBD5E1", fontWeight: 600 }} />
                    </Tabs>
                  </Box>

                  {hasBotKey ? (
                    <>
                      <Box
                        sx={{
                          p: 2,
                          border: "1px solid #303744",
                          borderRadius: 2,
                          backgroundColor: "#0F172A",
                          overflowX: "auto",
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.5 }}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<ContentCopyOutlinedIcon fontSize="small" />}
                            onClick={() => handleCopyText(activeSnippet, "Code snippet")}
                            sx={{ backgroundColor: "#E4B72C", color: "#111827", fontWeight: 700 }}
                          >
                            Copy code
                          </Button>
                        </Box>
                        <Typography
                          component="pre"
                          sx={{
                            margin: 0,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            color: "#E2E8F0",
                            fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
                            fontSize: 12,
                            lineHeight: 1.7,
                          }}
                        >
                          {activeSnippet}
                        </Typography>
                      </Box>

                      {activeSnippetTab === "javascript" && (
                        <Typography variant="caption" sx={{ mt: 1.5, display: "block", color: "#FBBF24" }}>
                          Browser JavaScript is public. Do not put a real secret API key in frontend code or commit it to
                          Git. Use your backend or a serverless function for secret handling in production.
                        </Typography>
                      )}

                      {activeSnippetTab === "react" && (
                        <Typography variant="caption" sx={{ mt: 1.5, display: "block", color: "#FBBF24" }}>
                          Production apps should keep secret API keys on the server. Use a backend proxy or serverless
                          function rather than committing real keys to React source or Vite environment variables.
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Alert severity="warning" sx={{ borderRadius: 2 }}>
                      Code examples are unavailable until this bot has an API key. Generate the key first, then refresh this
                      modal to view authenticated integration snippets.
                    </Alert>
                  )}
                </Box>

                <Divider sx={{ borderColor: "#303744" }} />

                <Box sx={{ pb: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: "#9AA4B2", mb: 1 }}>
                    Request contract
                  </Typography>
                  <Typography sx={{ color: "#DDE7F3", fontFamily: "monospace", fontSize: 12, lineHeight: 1.8 }}>
                    POST /ask-bot-sdk
                  </Typography>
                  <Typography sx={{ color: "#9AA4B2", fontSize: 12, mt: 1 }}>
                    {`{ "question": "What information is available in this bot's documents?", "botId": "${activeBotId || "<selected-bot-id>"}", "botKey": "${hasBotKey ? activeBotKey : "<selected-bot-api-key>"}" }`}
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>

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