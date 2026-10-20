import {
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowForwardRounded,
  ArticleOutlined,
  ChatBubbleOutlineOutlined,
  CloseOutlined,
  DashboardCustomizeOutlined,
  DataObjectOutlined,
  FolderOpenOutlined,
  HubOutlined,
  MenuOutlined,
  QueryStatsOutlined,
  SmartToyOutlined,
  StorageOutlined,
  WebhookOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Roadmap", href: "#roadmap" },
];

const featureCards = [
  {
    title: "Multiple Bots",
    text: "Create separate assistants for products, teams, and workflows without mixing their contexts.",
    accent: "#E4B72C",
    preview: "workspace",
  },
  {
    title: "Knowledge Grounded in Your Data",
    text: "Give each bot the documents and data it needs so answers reflect the information you provide.",
    accent: "#6E8FCF",
    preview: "retrieval",
  },
  {
    title: "Separate Knowledge Bases",
    text: "Keep retrieval collections isolated by bot, helping each assistant stay focused on its own domain.",
    accent: "#3C8D6F",
    preview: "isolation",
  },
  {
    title: "Configurable AI Infrastructure",
    text: "Choose and tune the supported model and embedding settings to fit each bot's backend setup.",
    accent: "#A8B7D1",
    preview: "infrastructure",
  },
  {
    title: "Document Management",
    text: "Upload, review, and manage the sources feeding each bot from a single workspace.",
    accent: "#D69E2E",
    preview: "documents",
  },
  {
    title: "Usage and Analytics",
    text: "Track bot activity and document coverage through the dashboard as your workspace grows.",
    accent: "#7EE0B4",
    preview: "analytics",
  },
];

const roadmapItems = [
  {
    label: "Planned",
    title: "Website SDK",
    text: "Bring a knowledge-powered bot into your website or application with a developer-friendly embed flow.",
    icon: WebhookOutlined,
  },
  {
    label: "Exploring",
    title: "Messaging Integrations",
    text: "Make bots available in Telegram and other channels where users already expect quick assistance.",
    icon: ChatBubbleOutlineOutlined,
  },
  {
    label: "Planned",
    title: "AI Agents",
    text: "Explore workflows where a bot can do more than answer questions and assist with task-oriented actions.",
    icon: SmartToyOutlined,
  },
];

function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handlePrimaryAction = () => navigate("/home/dashboard");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, rgba(228, 183, 44, 0.08), rgba(16, 19, 24, 0) 28%), #101318",
        color: "#E8ECF2",
      }}
    >
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(16, 19, 24, 0.78)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #303744",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 72,
            }}
          >
            <Box
              component="button"
              type="button"
              onClick={handlePrimaryAction}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.25,
                border: 0,
                background: "transparent",
                color: "#E8ECF2",
                cursor: "pointer",
                p: 0,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #E4B72C 0%, #F0C758 100%)",
                  boxShadow: "0 0 14px rgba(228,183,44,0.6)",
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.04em" }}>
                BotForge
              </Typography>
            </Box>

            {!isMobile && (
              <Stack direction="row" spacing={3.5} sx={{ alignItems: "center" }}>
                {navItems.map((item) => (
                  <Box
                    key={item.label}
                    component="a"
                    href={item.href}
                    sx={{
                      color: "#9AA4B2",
                      textDecoration: "none",
                      fontWeight: 500,
                      fontSize: 14,
                      transition: "color 0.2s ease",
                      "&:hover": { color: "#E8ECF2" },
                    }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Stack>
            )}

            {!isMobile ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrimaryAction}
                sx={{ minWidth: 132, px: 2.25, py: 1, fontWeight: 700 }}
              >
                Get Started
              </Button>
            ) : (
              <IconButton
                aria-label="Open navigation menu"
                onClick={() => setMobileOpen((prev) => !prev)}
                sx={{
                  border: "1px solid #303744",
                  backgroundColor: "#1B2028",
                  color: "#E8ECF2",
                  width: 40,
                  height: 40,
                }}
              >
                {mobileOpen ? <CloseOutlined fontSize="small" /> : <MenuOutlined fontSize="small" />}
              </IconButton>
            )}
          </Box>
        </Container>
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen && isMobile}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: "min(82vw, 320px)",
            backgroundColor: "#151920",
            borderLeft: "1px solid #303744",
            p: 2,
          },
        }}
      >
        <Stack spacing={1.5} sx={{ mt: 1 }}>
          {navItems.map((item) => (
            <Box
              key={item.label}
              component="a"
              href={item.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                color: "#E8ECF2",
                textDecoration: "none",
                fontWeight: 600,
                py: 1,
                px: 1,
                borderRadius: 1,
                border: "1px solid #303744",
                backgroundColor: "#1B2028",
              }}
            >
              {item.label}
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePrimaryAction}
            sx={{ mt: 1, fontWeight: 700 }}
          >
            Get Started
          </Button>
        </Stack>
      </Drawer>

      <main>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.08fr 1.08fr" },
              alignItems: "center",
              gap: { xs: 4, md: 6 },
              py: { xs: 6, sm: 8, md: 10 },
            }}
          >
            <Stack spacing={3}>
              <Chip
                label="RAG powered workspace"
                sx={{
                  alignSelf: "flex-start",
                  backgroundColor: "rgba(228, 183, 44, 0.12)",
                  color: "#E4B72C",
                  border: "1px solid rgba(228, 183, 44, 0.35)",
                  fontWeight: 700,
                  px: 0.5,
                  py: 0.5,
                  height: "auto",
                }}
              />

              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 0.96,
                    letterSpacing: "-0.07em",
                    fontSize: { xs: "2.8rem", sm: "4rem", md: "5rem" },
                    maxWidth: 620,
                  }}
                >
                  Your data. Your bots. Their knowledge.
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ color: "#B7C0CC", maxWidth: 600, fontSize: { xs: 17, md: 18 } }}>
                Build multiple knowledge-powered bots with their own isolated data. Upload your documents,
                connect the right knowledge to each bot, and create focused assistants grounded in the
                information you provide.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { xs: "stretch", sm: "center" } }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrimaryAction}
                  endIcon={<ArrowForwardRounded fontSize="small" />}
                  sx={{ minHeight: 48, px: 2.25, fontWeight: 700 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  href="#features"
                  sx={{ minHeight: 48, px: 2.25, fontWeight: 700 }}
                >
                  Explore Features
                </Button>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#DDE5F0" }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#3C8D6F",
                      boxShadow: "0 0 18px rgba(60, 141, 111, 0.8)",
                    }}
                  />
                  One platform. Multiple bots.
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#DDE5F0" }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#E4B72C",
                      boxShadow: "0 0 18px rgba(228, 183, 44, 0.8)",
                    }}
                  />
                  Separate knowledge by bot.
                </Box>
              </Stack>
            </Stack>

            <ProductPreview />
          </Box>
        </Container>

        <Box
          component="section"
          id="value-proposition"
          sx={{
            py: { xs: 6, md: 8 },
            borderTop: "1px solid #202933",
            borderBottom: "1px solid #202933",
            background: "linear-gradient(180deg, rgba(14,17,22,0.4) 0%, rgba(16,19,24,0.9) 100%)",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, lg: 5 }}>
                <Typography variant="overline" sx={{ color: "#E4B72C", letterSpacing: 1.4, fontWeight: 700 }}>
                  Value proposition
                </Typography>
                <Typography variant="h3" sx={{ mt: 1.25, mb: 1.5, letterSpacing: "-0.05em", fontWeight: 700 }}>
                  Different bots. Different knowledge. One workspace.
                </Typography>
                <Typography variant="body1" sx={{ color: "#B7C0CC", maxWidth: 520 }}>
                  Organize separate bots around different datasets, use cases, and audiences while keeping each
                  bot's retrieval context focused on the documents that matter most to it.
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, lg: 7 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },
                    border: "1px solid #303744",
                    borderRadius: 3,
                    background: "linear-gradient(180deg, #171D25 0%, #101318 100%)",
                  }}
                >
                  <Stack spacing={2.5}>
                    {[
                      { name: "Documentation Bot", label: "Docs", tone: "#E4B72C" },
                      { name: "Support Bot", label: "Claims", tone: "#6E8FCF" },
                      { name: "Engineering Bot", label: "Manuals", tone: "#3C8D6F" },
                    ].map((bot, index) => (
                      <Box
                        key={bot.name}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1.1fr 2fr 0.9fr",
                          gap: 2,
                          alignItems: "center",
                          border: "1px solid #303744",
                          borderRadius: 2,
                          p: 1.5,
                          backgroundColor: index % 2 === 0 ? "rgba(255,255,255,0.01)" : "rgba(228,183,44,0.02)",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: bot.tone,
                              boxShadow: `0 0 18px ${bot.tone}`,
                            }}
                          />
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {bot.name}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            overflow: "hidden",
                          }}
                        >
                          {[0, 1, 2, 3].map((item) => (
                            <Box
                              key={`${bot.name}-${item}`}
                              sx={{
                                height: 32,
                                minWidth: 54,
                                borderRadius: 1,
                                border: "1px solid rgba(255,255,255,0.08)",
                                background: item % 2 === 0 ? "rgba(228,183,44,0.08)" : "rgba(255,255,255,0.03)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#B7C0CC",
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: 0.8,
                              }}
                            >
                              {bot.label}
                            </Box>
                          ))}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <Chip
                            label={index === 0 ? "Ready" : index === 1 ? "Synced" : "Indexed"}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(255,255,255,0.03)",
                              color: "#DDE5F0",
                              border: "1px solid #303744",
                              fontWeight: 700,
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box component="section" id="features" sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: "#E4B72C", letterSpacing: 1.4, fontWeight: 700 }}>
                Core features
              </Typography>
              <Typography variant="h3" sx={{ mt: 1.25, letterSpacing: "-0.05em", fontWeight: 700 }}>
                Built for focused, practical knowledge work.
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {featureCards.map((feature, index) => (
                <Grid key={feature.title} size={{ xs: 12, md: 6, lg: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: 2.5,
                      borderRadius: 3,
                      background: "linear-gradient(180deg, #171D25 0%, #101318 100%)",
                      border: "1px solid #303744",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 2,
                          backgroundColor: `${feature.accent}1A`,
                          color: feature.accent,
                        }}
                      >
                        {index === 0 && <HubOutlined fontSize="small" />}
                        {index === 1 && <ArticleOutlined fontSize="small" />}
                        {index === 2 && <StorageOutlined fontSize="small" />}
                        {index === 3 && <DataObjectOutlined fontSize="small" />}
                        {index === 4 && <FolderOpenOutlined fontSize="small" />}
                        {index === 5 && <QueryStatsOutlined fontSize="small" />}
                      </Box>
                      <Chip
                        label={`0${index + 1}`}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.02)",
                          color: "#9AA4B2",
                          border: "1px solid #303744",
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.04em" }}>
                      {feature.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#B7C0CC", flexGrow: 1 }}>
                      {feature.text}
                    </Typography>

                    <FeatureMiniPreview type={feature.preview} accent={feature.accent} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box component="section" id="how-it-works" sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid #202933" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: "#E4B72C", letterSpacing: 1.4, fontWeight: 700 }}>
                How it works
              </Typography>
              <Typography variant="h3" sx={{ mt: 1.25, letterSpacing: "-0.05em", fontWeight: 700 }}>
                A simple loop for each bot.
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {[
                {
                  step: "01",
                  title: "Create a bot",
                  text: "Define a bot for a product, support workflow, or team, and customize its available configuration.",
                  icon: DashboardCustomizeOutlined,
                },
                {
                  step: "02",
                  title: "Add its knowledge",
                  text: "Upload the documents and set the model or retrieval settings relevant to that bot's dataset.",
                  icon: FolderOpenOutlined,
                },
                {
                  step: "03",
                  title: "Ask and retrieve",
                  text: "When a user asks a question, the bot pulls relevant context from its configured knowledge base and responds accordingly.",
                  icon: ChatBubbleOutlineOutlined,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Grid key={item.step} size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        height: "100%",
                        p: 3,
                        borderRadius: 3,
                        background: "linear-gradient(180deg, #171D25 0%, #101318 100%)",
                        border: "1px solid #303744",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Chip
                          label={item.step}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(228,183,44,0.12)",
                            color: "#E4B72C",
                            border: "1px solid rgba(228,183,44,0.35)",
                            fontWeight: 700,
                          }}
                        />
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            backgroundColor: "rgba(228,183,44,0.08)",
                            color: "#E4B72C",
                          }}
                        >
                          <Icon fontSize="small" />
                        </Box>
                      </Box>

                      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.04em" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#B7C0CC" }}>
                        {item.text}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Box component="section" id="roadmap" sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid #202933" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: "#E4B72C", letterSpacing: 1.4, fontWeight: 700 }}>
                Roadmap
              </Typography>
              <Typography variant="h3" sx={{ mt: 1.25, letterSpacing: "-0.05em", fontWeight: 700 }}>
                Built for more than a chat window.
              </Typography>
              <Typography variant="body1" sx={{ mt: 1.5, color: "#B7C0CC", maxWidth: 720 }}>
                Today, build focused bots grounded in your own data. Over time, the platform could grow into
                the places where your users and workflows already live.
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {roadmapItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        height: "100%",
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #303744",
                        background: "linear-gradient(180deg, rgba(228,183,44,0.04) 0%, #151920 100%)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
                        <Chip
                          label={item.label}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.03)",
                            color: "#DDE5F0",
                            border: "1px solid #303744",
                            fontWeight: 700,
                          }}
                        />
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            backgroundColor: "rgba(228,183,44,0.09)",
                            color: "#E4B72C",
                          }}
                        >
                          <Icon fontSize="small" />
                        </Box>
                      </Stack>

                      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.04em" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#B7C0CC" }}>
                        {item.text}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #303744",
                borderRadius: 4,
                background: "linear-gradient(180deg, #171D25 0%, #101318 100%)",
                p: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="overline" sx={{ color: "#E4B72C", letterSpacing: 1.4, fontWeight: 700 }}>
                  Start now
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, letterSpacing: "-0.05em", fontWeight: 700 }}>
                  Give your data a purpose.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.25, color: "#B7C0CC", maxWidth: 580 }}>
                  Create your first bot, organize its knowledge, and start exploring what you can build.
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handlePrimaryAction}
                endIcon={<ArrowForwardRounded />}
                sx={{ minHeight: 48, px: 2.5, fontWeight: 700 }}
              >
                Get Started
              </Button>
            </Paper>
          </Container>
        </Box>
      </main>

      <Box component="footer" sx={{ borderTop: "1px solid #202933", py: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.25 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #E4B72C 0%, #F0C758 100%)",
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.04em" }}>
                  BotForge
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#9AA4B2", maxWidth: 420 }}>
                One platform for multiple bots, each grounded in the knowledge that belongs to it.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2.5} sx={{ flexWrap: "wrap" }}>
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  component="a"
                  href={item.href}
                  sx={{ color: "#9AA4B2", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                >
                  {item.label}
                </Box>
              ))}
            </Stack>

            <Typography variant="caption" sx={{ color: "#7F8B9B" }}>
              © {new Date().getFullYear()} BotForge
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function ProductPreview() {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          p: { xs: 2, md: 2.5 },
          borderRadius: 4,
          border: "1px solid #303744",
          background: "linear-gradient(180deg, #171D25 0%, #101318 100%)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(228,183,44,0.12), rgba(110,143,207,0.04), transparent 55%)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #303744",
              pb: 1.75,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {[
                { background: "#D45B5B" },
                { background: "#E4B72C" },
                { background: "#3C8D6F" },
              ].map((dot) => (
                <Box
                  key={dot.background}
                  sx={{ width: 10, height: 10, borderRadius: "50%", background: dot.background }}
                />
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: "#9AA4B2", fontWeight: 700, letterSpacing: 1.2 }}>
              BOT WORKSPACE
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack spacing={1.5}>
                <BotPill name="Documentation Bot" tone="#E4B72C" active />
                <BotPill name="Support Bot" tone="#6E8FCF" />
                <BotPill name="Engineering Bot" tone="#3C8D6F" />
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 8 }}>
              <Box
                sx={{
                  border: "1px solid #303744",
                  borderRadius: 3,
                  backgroundColor: "#121821",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ color: "#E8ECF2", fontWeight: 700 }}>
                    Knowledge routing
                  </Typography>
                  <Chip
                    label="Grounded answer"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(60,141,111,0.15)",
                      color: "#7EE0B4",
                      border: "1px solid rgba(60,141,111,0.35)",
                    }}
                  />
                </Box>

                <Box sx={{ display: "grid", gap: 1.25 }}>
                  {[
                    { label: "Product docs", value: "14 files" },
                    { label: "Support guides", value: "9 files" },
                    { label: "Technical manuals", value: "12 files" },
                  ].map((source, index) => (
                    <Box
                      key={source.label}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1.4fr 0.8fr",
                        gap: 1,
                        alignItems: "center",
                        border: "1px solid #303744",
                        borderRadius: 2,
                        px: 1.5,
                        py: 1,
                        backgroundColor: index % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(228,183,44,0.02)",
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "#DDE5F0", fontWeight: 600 }}>
                        {source.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9AA4B2", textAlign: "right" }}>
                        {source.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    mt: 1,
                    border: "1px solid #303744",
                    borderRadius: 2,
                    backgroundColor: "rgba(228,183,44,0.04)",
                    p: 1.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#9AA4B2", textTransform: "uppercase", letterSpacing: 1.2 }}>
                    Retrieval context
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: "#DDE5F0" }}>
                    “What is the retry policy for document ingestion?”
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

function BotPill({ name, tone, active = false }: { name: string; tone: string; active?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.2,
        borderRadius: 2,
        border: active ? `1px solid ${tone}` : "1px solid #303744",
        backgroundColor: active ? `${tone}20` : "rgba(255,255,255,0.02)",
        px: 1.5,
        py: 1.1,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: tone,
          boxShadow: `0 0 18px ${tone}`,
        }}
      />
      <Typography variant="body2" sx={{ color: "#DDE5F0", fontWeight: 600 }}>
        {name}
      </Typography>
    </Box>
  );
}

function FeatureMiniPreview({ type, accent }: { type: string; accent: string }) {
  const commonCard = {
    border: "1px solid #303744",
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.02)",
    p: 1,
  };

  if (type === "workspace") {
    return (
      <Stack direction="row" spacing={1}>
        <Box sx={{ ...commonCard, flex: 1, minHeight: 78, backgroundColor: `${accent}18` }} />
        <Box sx={{ ...commonCard, flex: 1, minHeight: 78 }} />
        <Box sx={{ ...commonCard, flex: 1, minHeight: 78 }} />
      </Stack>
    );
  }

  if (type === "retrieval") {
    return (
      <Stack spacing={1}>
        <Box sx={{ ...commonCard, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "#9AA4B2" }}>
            Query
          </Typography>
          <Box sx={{ width: 56, height: 10, borderRadius: 5, backgroundColor: accent, opacity: 0.7 }} />
        </Box>
        <Box sx={{ ...commonCard, minHeight: 62, backgroundColor: `${accent}12` }} />
      </Stack>
    );
  }

  if (type === "isolation") {
    return (
      <Stack direction="row" spacing={1}>
        <Box sx={{ ...commonCard, flex: 1, minHeight: 82, backgroundColor: "rgba(60,141,111,0.08)" }} />
        <Box sx={{ ...commonCard, flex: 1, minHeight: 82, backgroundColor: "rgba(228,183,44,0.06)" }} />
        <Box sx={{ ...commonCard, flex: 1, minHeight: 82, backgroundColor: "rgba(110,143,207,0.08)" }} />
      </Stack>
    );
  }

  if (type === "infrastructure") {
    return (
      <Stack spacing={1}>
        <Box sx={{ ...commonCard, display: "flex", gap: 1, alignItems: "center" }}>
          <Box sx={{ width: 18, height: 18, borderRadius: 1, backgroundColor: accent }} />
          <Box sx={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.08)" }} />
        </Box>
        <Box sx={{ ...commonCard, display: "flex", gap: 1, alignItems: "center" }}>
          <Box sx={{ width: 18, height: 18, borderRadius: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
          <Box sx={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.06)" }} />
        </Box>
      </Stack>
    );
  }

  if (type === "documents") {
    return (
      <Stack spacing={1}>
        <Box sx={{ ...commonCard, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "#DDE5F0" }}>
            Uploads
          </Typography>
          <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: accent }} />
        </Box>
        <Box sx={{ ...commonCard, minHeight: 52 }} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ height: 82 }}>
      {[42, 58, 72, 88, 64].map((height, idx) => (
        <Box
          key={height}
          sx={{
            width: 18,
            height,
            borderRadius: "6px 6px 0 0",
            background: idx % 2 === 0 ? accent : "rgba(255,255,255,0.08)",
            opacity: idx === 0 ? 1 : 0.88,
          }}
        />
      ))}
    </Stack>
  );
}

export default LandingPage;