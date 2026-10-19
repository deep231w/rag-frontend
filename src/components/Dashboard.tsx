import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardChart from "./charts/TestChart";
import Doughnutt from "./charts/Doghunt";
import { RenderColdStartNotice, useRenderColdStartNotice } from "./RequestLoadingNotice";

type Metric = {
  title: string;
  value: string;
  helper: string;
  tone?: "neutral" | "success" | "warning";
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [bots, setBots] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([
    { title: "Bot Count", value: "--", helper: "Configured collections", tone: "neutral" },
    { title: "Documents Indexed", value: "--", helper: "Across all bots", tone: "success" },
    { title: "Avg Files / Bot", value: "--", helper: "Content density", tone: "warning" },
    { title: "Ready Bots", value: "--", helper: "With uploaded files", tone: "neutral" },
  ]);
  const [loading, setLoading] = useState(true);
  const slowNoticeVisible = useRenderColdStartNotice(loading);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bot/getbotsdata`, {
          params: { adminId: JSON.parse(localStorage.getItem("admin") || "null")?.userId },
        });

        if (!active) return;

        const nextBots = Array.isArray(response?.data?.bots) ? response.data.bots : [];
        setBots(nextBots);

        const totalDocuments = nextBots.reduce(
          (sum: number, bot: any) => sum + (Array.isArray(bot?.files) ? bot.files.length : 0),
          0,
        );
        const readyBots = nextBots.filter((bot: any) => Array.isArray(bot?.files) && bot.files.length > 0).length;
        const avgFilesPerBot = nextBots.length ? totalDocuments / nextBots.length : 0;

        setMetrics([
          {
            title: "Bot Count",
            value: String(nextBots.length),
            helper: `${readyBots} with uploaded files`,
            tone: "neutral",
          },
          {
            title: "Documents Indexed",
            value: String(totalDocuments),
            helper: "Across your bot collections",
            tone: "success",
          },
          {
            title: "Avg Files / Bot",
            value: avgFilesPerBot ? avgFilesPerBot.toFixed(1) : "0.0",
            helper: "For active bot clusters",
            tone: "warning",
          },
          {
            title: "Ready Bots",
            value: String(readyBots),
            helper: nextBots.length ? `${Math.round((readyBots / nextBots.length) * 100)}% of workspace` : "No bots yet",
            tone: "neutral",
          },
        ]);
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();
    return () => {
      active = false;
    };
  }, []);

  const recentBots = useMemo(
    () =>
      bots
        .map((bot: any) => ({
          id: bot?._id || bot?.id,
          name: bot?.name || "Untitled Bot",
          description: bot?.description || "No description provided",
          files: Array.isArray(bot?.files) ? bot.files : [],
        }))
        .sort((a, b) => b.files.length - a.files.length)
        .slice(0, 4),
    [bots],
  );

  const totalDocuments = useMemo(
    () => recentBots.reduce((sum, bot) => sum + bot.files.length, 0),
    [recentBots],
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.04em" }}>
              Workspace Overview
            </Typography>
            <Chip
              label={loading ? "Syncing" : "Live"}
              size="small"
              sx={{
                backgroundColor: loading ? "rgba(228, 183, 44, 0.14)" : "rgba(60, 141, 111, 0.15)",
                color: loading ? "#E4B72C" : "#7EE0B4",
                border: "1px solid rgba(255,255,255,0.08)",
                fontWeight: 600,
              }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: "#9AA4B2" }}>
            Monitor ingestion health, bot readiness, and document coverage across your RAG workspace.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/home/create-bot")}
          sx={{
            backgroundColor: "#E4B72C",
            color: "#101318",
            fontWeight: 700,
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#F0C94A" },
          }}
        >
          Create Bot
        </Button>
      </Box>

      <Grid container spacing={2}>
        {metrics.map((item) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                minHeight: 128,
                background: "linear-gradient(180deg, #1B2028 0%, #171D25 100%)",
                border: "1px solid #303744",
                borderRadius: 2.5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  borderColor: "#4B5568",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9AA4B2",
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor:
                      item.tone === "success"
                        ? "#3C8D6F"
                        : item.tone === "warning"
                          ? "#E4B72C"
                          : "#6E8FCF",
                    boxShadow:
                      item.tone === "success"
                        ? "0 0 18px rgba(60, 141, 111, 0.7)"
                        : item.tone === "warning"
                          ? "0 0 18px rgba(228, 183, 44, 0.7)"
                          : "0 0 18px rgba(110, 143, 207, 0.7)",
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "end", gap: 1.5, mt: 1.5 }}>
                {loading && item.value === "--" ? (
                  <CircularProgress size={20} thickness={5} sx={{ color: "#E4B72C" }} />
                ) : (
                  <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1.1 }}>
                    {item.value}
                  </Typography>
                )}
              </Box>

              <Typography variant="caption" sx={{ color: "#9AA4B2", mt: 0.75 }}>
                {item.helper}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "#9AA4B2" }}>
          <CircularProgress size={18} thickness={5} sx={{ color: "#E4B72C" }} />
          <Typography variant="body2">Loading workspace data…</Typography>
        </Box>
      )}
      <RenderColdStartNotice visible={slowNoticeVisible} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: "#1B2028",
              border: "1px solid #303744",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
                  Bot Activity
                </Typography>
                <Typography variant="caption" sx={{ color: "#9AA4B2" }}>
                  Recent bot creation trend
                </Typography>
              </Box>
              <Chip label="Last 5 days" size="small" sx={{ backgroundColor: "#151920", color: "#9AA4B2", border: "1px solid #303744" }} />
            </Box>
            <Box sx={{ height: 320 }}>
              <DashboardChart />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: "#1B2028",
              border: "1px solid #303744",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
                File Mix
              </Typography>
              <Chip label={`${totalDocuments} docs`} size="small" sx={{ backgroundColor: "#151920", color: "#9AA4B2", border: "1px solid #303744" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 260 }}>
              <Box sx={{ width: { xs: 210, md: 240 }, height: { xs: 210, md: 240 } }}>
                {loading ? <CircularProgress size={40} sx={{ color: "#E4B72C" }} /> : <Doughnutt />}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: "#1B2028",
              border: "1px solid #303744",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.03em" }}>
                Recent Activity
              </Typography>
              <Typography variant="caption" sx={{ color: "#9AA4B2" }}>
                {recentBots.length} active collections
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              {recentBots.length > 0 ? (
                recentBots.map((bot) => (
                  <Box
                    key={bot.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid #303744",
                      backgroundColor: "#151920",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{bot.name}</Typography>
                      <Typography variant="caption" sx={{ color: "#9AA4B2" }}>
                        {bot.description}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Chip
                        label={`${bot.files.length} files`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(228, 183, 44, 0.12)",
                          color: "#E4B72C",
                          border: "1px solid rgba(228, 183, 44, 0.22)",
                        }}
                      />
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    border: "1px dashed #303744",
                    borderRadius: 2,
                    p: 2,
                    color: "#9AA4B2",
                    backgroundColor: "#151920",
                  }}
                >
                  No bot activity yet. Create a bot to begin ingesting documents.
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              backgroundColor: "#1B2028",
              border: "1px solid #303744",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.03em", mb: 2 }}>
              Workspace Summary
            </Typography>

            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid #303744" }}>
                <Typography variant="body2" sx={{ color: "#9AA4B2" }}>Status</Typography>
                <Chip label={loading ? "Syncing" : "Healthy"} size="small" sx={{ backgroundColor: "rgba(60, 141, 111, 0.12)", color: "#7EE0B4", border: "1px solid rgba(126,224,180,0.2)" }} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid #303744" }}>
                <Typography variant="body2" sx={{ color: "#9AA4B2" }}>Indexed documents</Typography>
                <Typography sx={{ fontWeight: 600 }}>{totalDocuments}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid #303744" }}>
                <Typography variant="body2" sx={{ color: "#9AA4B2" }}>Bot coverage</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {bots.length ? `${Math.round((bots.filter((bot) => Array.isArray(bot?.files) && bot.files.length > 0).length / bots.length) * 100)}%` : "0%"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
                <Typography variant="body2" sx={{ color: "#9AA4B2" }}>Action</Typography>
                <Button
                  size="small"
                  onClick={() => navigate("/home/manage-bots")}
                  sx={{ p: 0, minWidth: 0, color: "#E4B72C", fontWeight: 700 }}
                >
                  Manage bots
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}