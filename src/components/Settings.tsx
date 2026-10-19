import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
} from "@mui/material";

import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { RenderColdStartNotice, useRenderColdStartNotice } from "./RequestLoadingNotice";

export default function Settings() {
  const [provider, setProvider] = useState("gemini");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const slowNoticeVisible = useRenderColdStartNotice(loading || saving);

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