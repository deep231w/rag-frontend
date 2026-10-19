import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Stack,
} from "@mui/material";

import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RenderColdStartNotice, useRenderColdStartNotice } from "./RequestLoadingNotice";
import { clearStoredAuth, getStoredAdmin } from "../auth";

export default function Settings() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState("gemini");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const slowNoticeVisible = useRenderColdStartNotice(loading || saving || logoutLoading);
  const admin = getStoredAdmin();

  async function fetchConfig() {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/confg/getconfig`);
      console.log("res of fetch confg-", res);
    } catch (e) {
      console.log("error in fetch config- ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/confg/saveconfig`, {
        provider,
      });
    } catch (error) {
      console.log("save config failed", error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (logoutLoading) return;

    setLogoutLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/admin/logout`, {
            token,
          });
        } catch (error) {
          console.info("Server logout unavailable or ignored; continuing local session cleanup.", error);
        }
      }

      clearStoredAuth();
      navigate("/signin", { replace: true });
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 950,
        }}
      >
        <Box mb={4}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            AI Settings
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "rgba(255,255,255,0.55)",
              fontSize: 15,
            }}
          >
            Configure your LLM providers and embedding
            infrastructure.
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2.5, color: "#9AA4B2" }}>
            <CircularProgress size={18} thickness={5} sx={{ color: "#E4B72C" }} />
            <Typography variant="body2">Loading configuration…</Typography>
          </Box>
        )}
        <RenderColdStartNotice visible={slowNoticeVisible} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <PsychologyOutlinedIcon />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                }}
              >
                LLM Providers
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <TextField
                select
                fullWidth
                label="LLM Provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                <MenuItem value="openai">OpenAI</MenuItem>
                <MenuItem value="gemini">Gemini</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="API Key"
                placeholder="sk-ant-xxxxxxxx"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Model"
                placeholder="gemini-embedding-001"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <MemoryOutlinedIcon />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                }}
              >
                Embedding Models
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mb: 2 }}
            >
              * For now we only support Gemini embeddings, with "gemini-embedding-001" model
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <TextField
                fullWidth
                label="Gemini Embedding API Key"
                placeholder="Enter embedding provider key "
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Embedding Model"
                placeholder="text-embedding-3-small"
                defaultValue="gemini-embedding-001"
                disabled
              />

              <TextField
                fullWidth
                label="Service"
                placeholder="Gemini / openai /claude"
                defaultValue="Gemini"
                disabled
              />
            </Box>
          </Paper>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            backgroundColor: "#1B2028",
            border: "1px solid #303744",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <PersonOutlineOutlinedIcon sx={{ color: "#E4B72C" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
              Account
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: "#9AA4B2", mb: 2 }}>
            Manage the current authenticated session for this administration workspace.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between" }}>
            <Box>
              <Typography variant="caption" sx={{ color: "#9AA4B2", textTransform: "uppercase", letterSpacing: 1.1 }}>
                Signed in as
              </Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>
                {admin?.email || "Current administrator"}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="warning"
              startIcon={logoutLoading ? <CircularProgress size={16} sx={{ color: "#E4B72C" }} /> : <LogoutOutlinedIcon />}
              onClick={handleLogout}
              disabled={logoutLoading}
              sx={{
                borderColor: "rgba(228, 183, 44, 0.4)",
                color: "#E4B72C",
                backgroundColor: "rgba(228, 183, 44, 0.04)",
                px: 2.5,
                py: 1,
                borderRadius: 2,
                fontWeight: 700,
                "&:hover": { borderColor: "#E4B72C", backgroundColor: "rgba(228, 183, 44, 0.1)" },
              }}
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </Button>
          </Stack>
        </Paper>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={saving ? <CircularProgress size={16} sx={{ color: "#101318" }} /> : <SaveOutlinedIcon />}
            sx={{
              px: 4,
              height: 50,
              borderRadius: 3,
            }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Configuration"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}