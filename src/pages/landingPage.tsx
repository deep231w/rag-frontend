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
  BarChartOutlined,
  ChatBubbleOutlineOutlined,
  ChevronRightOutlined,
  CloseOutlined,
  DashboardCustomizeOutlined,
  DatasetOutlined,
  FolderOpenOutlined,
  HubOutlined,
  MenuOutlined,
  MessageOutlined,
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
    accent: "#315C45",
    accentSoft: "#EAF2EE",
    icon: HubOutlined,
  },
  {
    title: "Grounded in Your Data",
    text: "Give each bot the documents and data it needs so answers reflect the information you provide.",
    accent: "#3559A8",
    accentSoft: "#EAF1FB",
    icon: ArticleOutlined,
  },
  {
    title: "Separate Knowledge Bases",
    text: "Keep each bot's retrieval context isolated so relevant knowledge stays in the right lane.",
    accent: "#C66A36",
    accentSoft: "#F9EFE6",
    icon: StorageOutlined,
  },
  {
    title: "Model Configuration",
    text: "Tune the supported model and embedding settings where the application exposes them.",
    accent: "#4F5A59",
    accentSoft: "#EEF0EF",
    icon: DatasetOutlined,
  },
  {
    title: "Document Management",
    text: "Upload, inspect, and keep the source material connected to each bot in one place.",
    accent: "#236E68",
    accentSoft: "#EAF7F5",
    icon: FolderOpenOutlined,
  },
  {
    title: "Usage and Analytics",
    text: "Track activity and document coverage through the dashboard as the workspace grows.",
    accent: "#6B5C9A",
    accentSoft: "#F1EEF9",
    icon: BarChartOutlined,
  },
];

const roadmapItems = [
  {
    label: "Planned",
    title: "Website SDK",
    text: "Bring a knowledge-powered bot into your website or application with a developer-friendly embed flow.",
    icon: WebhookOutlined,
    accent: "#315C45",
  },
  {
    label: "Exploring",
    title: "Messaging Integrations",
    text: "Make bots available in Telegram and other channels where users already expect quick assistance.",
    icon: MessageOutlined,
    accent: "#3559A8",
  },
  {
    label: "Planned",
    title: "AI Agents",
    text: "Explore workflows where a bot can do more than answer questions and assist with task-oriented actions.",
    icon: SmartToyOutlined,
    accent: "#C66A36",
  },
];

function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handlePrimaryAction = () => navigate("/home/dashboard");

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#F7F6F2", color: "#20241F" }}>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(247, 246, 242, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #DCDDD5",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: 74,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box component="button" type="button" onClick={handlePrimaryAction} sx={{ display: "inline-flex", alignItems: "center", gap: 1.15, border: 0, background: "transparent", cursor: "pointer", p: 0, color: "#20241F" }}>
              <Box sx={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#315C45" }} />
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.06em", fontFamily: '"Manrope", "Inter", sans-serif' }}>
                BotForge
              </Typography>
            </Box>

            {!isMobile && (
              <Stack direction="row" spacing={3.25} sx={{ alignItems: "center" }}>
                {navItems.map((item) => (
                  <Box
                    key={item.label}
                    component="a"
                    href={item.href}
                    sx={{
                      color: "#555B55",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      transition: "color 0.2s ease",
                      "&:hover": { color: "#20241F" },
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
                onClick={handlePrimaryAction}
                sx={{
                  minWidth: 138,
                  minHeight: 42,
                  backgroundColor: "#315C45",
                  color: "#FFFFFF",
                  borderRadius: 2,
                  boxShadow: "none",
                  fontWeight: 700,
                  px: 2,
                  "&:hover": { backgroundColor: "#294E3D" },
                }}
              >
                Get Started
              </Button>
            ) : (
              <IconButton
                aria-label="Open navigation menu"
                onClick={() => setMobileOpen((prev) => !prev)}
                sx={{
                  border: "1px solid #DCDDD5",
                  backgroundColor: "#FFFFFF",
                  color: "#20241F",
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
            backgroundColor: "#FFFFFF",
            borderLeft: "1px solid #DCDDD5",
            p: 2,
          },
        }}
      >
        <Stack spacing={1.5}>
          {navItems.map((item) => (
            <Box
              key={item.label}
              component="a"
              href={item.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                textDecoration: "none",
                color: "#20241F",
                fontWeight: 700,
                p: 1.25,
                borderRadius: 1.5,
                border: "1px solid #DCDDD5",
                backgroundColor: "#F4F4F1",
              }}
            >
              {item.label}
            </Box>
          ))}
          <Button
            variant="contained"
            fullWidth
            onClick={handlePrimaryAction}
            sx={{
              mt: 1,
              backgroundColor: "#315C45",
              color: "#FFFFFF",
              borderRadius: 2,
              fontWeight: 700,
              minHeight: 44,
            }}
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
              gridTemplateColumns: { xs: "1fr", lg: "1.05fr 1fr" },
              alignItems: "center",
              gap: { xs: 4, lg: 6 },
              py: { xs: 6, sm: 7, md: 9 },
            }}
          >
            <Stack spacing={3}>
              <Chip
                label="KNOWLEDGE INFRASTRUCTURE"
                sx={{
                  alignSelf: "flex-start",
                  backgroundColor: "#EAF2EE",
                  color: "#315C45",
                  border: "1px solid #D4E0D8",
                  borderRadius: 999,
                  fontWeight: 800,
                  letterSpacing: 1.1,
                  px: 1,
                  py: 0.4,
                  height: "auto",
                  fontSize: 11,
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Manrope", "Inter", sans-serif',
                  fontSize: { xs: "2.7rem", sm: "4rem", md: "4.8rem" },
                  lineHeight: 0.94,
                  letterSpacing: "-0.07em",
                  maxWidth: 580,
                  fontWeight: 800,
                  color: "#20241F",
                }}
              >
                Your data. Your bots. Their knowledge.
              </Typography>

              <Typography variant="body1" sx={{ maxWidth: 560, fontSize: { xs: 17, md: 18 }, lineHeight: 1.7, color: "#555B55" }}>
                Build multiple knowledge-powered bots with their own isolated data. Upload your documents,
                connect the right knowledge to each bot, and create focused assistants grounded in the
                information you provide.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { xs: "stretch", sm: "center" } }}>
                <Button
                  variant="contained"
                  onClick={handlePrimaryAction}
                  endIcon={<ArrowForwardRounded fontSize="small" />}
                  sx={{
                    minHeight: 48,
                    minWidth: 160,
                    backgroundColor: "#315C45",
                    color: "#FFFFFF",
                    borderRadius: 2,
                    fontWeight: 700,
                    px: 2.25,
                    boxShadow: "none",
                    "&:hover": { backgroundColor: "#294E3D" },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  href="#features"
                  sx={{
                    minHeight: 48,
                    minWidth: 170,
                    borderColor: "#DCDDD5",
                    color: "#20241F",
                    borderRadius: 2,
                    fontWeight: 700,
                    px: 2.25,
                    "&:hover": { borderColor: "#BFC5BE", backgroundColor: "#F3F3F0" },
                  }}
                >
                  Explore Features
                </Button>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
                  gap: 0,
                  border: "1px solid #DCDDD5",
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                  maxWidth: 620,
                }}
              >
                <FactItem label="Multiple independent bots" />
                <FactItem label="Dedicated knowledge per bot" />
                <FactItem label="Document-grounded replies" />
              </Box>
            </Stack>

            <ProductDiagram />
          </Box>
        </Container>

        <Box
          component="section"
          id="value-proposition"
          sx={{
            py: { xs: 6, md: 8 },
            borderTop: "1px solid #DCDDD5",
            borderBottom: "1px solid #DCDDD5",
            backgroundColor: "#F1F2EE",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3.5} alignItems="center">
              <Grid size={{ xs: 12, lg: 5 }}>
                <Typography variant="overline" sx={{ color: "#315C45", fontWeight: 800, letterSpacing: 1.4 }}>
                  VALUE PROPOSITION
                </Typography>
                <Typography variant="h3" sx={{ mt: 1.5, mb: 1.5, letterSpacing: "-0.055em", fontWeight: 800, lineHeight: 1.02, fontFamily: '"Manrope", "Inter", sans-serif' }}>
                  Different bots. Different knowledge. One workspace.
                </Typography>
                <Typography variant="body1" sx={{ color: "#555B55", lineHeight: 1.75, maxWidth: 510 }}>
                  Organize separate bots around different datasets, use cases, and audiences while keeping each
                  bot's retrieval context focused on the documents that matter most to it.
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, lg: 7 }}>
                <Stack spacing={1.75}>
                  {[{ name: "Documentation Bot", tone: "#315C45", files: ["API", "Guide", "Release"], state: "Ready" }, { name: "Support Bot", tone: "#3559A8", files: ["FAQ", "Claims", "Checklist"], state: "Synced" }, { name: "Engineering Bot", tone: "#C66A36", files: ["Design", "Infra", "Runbook"], state: "Indexed" }].map((bot, index) => (
                    <Box
                      key={bot.name}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1.15fr 1.9fr 0.8fr" },
                        alignItems: "center",
                        gap: 2,
                        border: "1px solid #DCDDD5",
                        borderRadius: 2,
                        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F7F6F2",
                        p: 1.5,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: bot.tone }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                          {bot.name}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {bot.files.map((file) => (
                          <Box key={`${bot.name}-${file}`} sx={{ border: "1px solid #DCDDD5", backgroundColor: "#FFFFFF", borderRadius: 1, px: 1, py: 0.6, fontSize: 10, fontWeight: 800, letterSpacing: 0.8, color: "#555B55", textTransform: "uppercase" }}>
                            {file}
                          </Box>
                        ))}
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
                        <Chip label={bot.state} size="small" sx={{ border: "1px solid #DCDDD5", backgroundColor: "#F4F4F1", color: "#20241F", fontWeight: 700 }} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box component="section" id="features" sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 760, mb: 4 }}>
              <Typography variant="overline" sx={{ color: "#315C45", fontWeight: 800, letterSpacing: 1.4 }}>
                CORE FEATURES
              </Typography>
              <Typography variant="h3" sx={{ mt: 1.25, letterSpacing: "-0.055em", fontWeight: 800, lineHeight: 1.08, fontFamily: '"Manrope", "Inter", sans-serif' }}>
                Built for focused, practical knowledge work.
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Paper elevation={0} sx={{ height: "100%", p: 3, borderRadius: 3, border: "1px solid #DCDDD5", backgroundColor: "#FFFFFF" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ width: 46, height: 46, borderRadius: 2, bg: "transparent", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#EAF2EE", color: "#315C45" }}>
                      <StorageOutlined fontSize="small" />
                    </Box>
                    <Chip label="01" size="small" sx={{ backgroundColor: "#F4F4F1", color: "#555B55", border: "1px solid #DCDDD5", fontWeight: 800 }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.04em", mb: 1.25, fontFamily: '"Manrope", "Inter", sans-serif' }}>
                    Separate knowledge bases by bot
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555B55", lineHeight: 1.75, mb: 2.5 }}>
                    Keep each bot's retrieval context isolated so the right information is used at the right time, without mixing unrelated datasets.
                  </Typography>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1.25 }}>
                    {[{ name: "Docs", color: "#315C45" }, { name: "Support", color: "#3559A8" }, { name: "Eng", color: "#C66A36" }].map((bucket) => (
                      <Box key={bucket.name} sx={{ border: "1px solid #DCDDD5", borderRadius: 2, backgroundColor: "#F7F6F2", p: 1.5, minHeight: 104, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Box sx={{ width: 18, height: 18, borderRadius: 1.5, backgroundColor: bucket.color }} />
                        <Typography variant="caption" sx={{ color: "#555B55", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>{bucket.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {featureCards.filter((_, idx) => idx !== 2).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Grid key={feature.title} size={{ xs: 12, md: 6, lg: 3 }}>
                    <Paper elevation={0} sx={{ height: "100%", p: 2.5, borderRadius: 3, border: "1px solid #DCDDD5", backgroundColor: "#FFFFFF" }}>
                      <Stack spacing={2}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Box sx={{ width: 40, height: 40, borderRadius: 2, backgroundColor: feature.accentSoft, color: feature.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon fontSize="small" />
                          </Box>
                          <Chip label={`0${index + 1}`} size="small" sx={{ backgroundColor: "#F4F4F1", color: "#555B55", border: "1px solid #DCDDD5", fontWeight: 800 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.04em", fontFamily: '"Manrope", "Inter", sans-serif' }}>{feature.title}</Typography>
                        <Typography variant="body2" sx={{ color: "#555B55", lineHeight: 1.7 }}>{feature.text}</Typography>
                        <FeatureMiniPreview accent={feature.accent} />
                      </Stack>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Box component="section" id="how-it-works" sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid #DCDDD5" }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 760, mb: 4 }}>
              <Typography variant="overline" sx={{ color: "#315C45", fontWeight: 800, letterSpacing: 1.4 }}>
                HOW IT WORKS
              </Typography>
              <Typography variant="h3" sx={{ mt: 1.25, letterSpacing: "-0.055em", fontWeight: 800, lineHeight: 1.08, fontFamily: '"Manrope", "Inter", sans-serif' }}>
                A simple loop for each bot.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, minmax(0, 1fr))" }, gap: 2.5 }}>
              {[
                { step: "01", title: "Create a bot", text: "Define the bot and its working context.", icon: DashboardCustomizeOutlined, accent: "#315C45" },
                { step: "02", title: "Add documents", text: "Upload the files that belong to that bot.", icon: FolderOpenOutlined, accent: "#3559A8" },
                { step: "03", title: "Retrieve", text: "Use the configured retrieval path to find relevant context.", icon: ArticleOutlined, accent: "#236E68" },
                { step: "04", title: "Respond", text: "Generate a grounded answer from the bot's own knowledge.", icon: ChatBubbleOutlineOutlined, accent: "#C66A36" },
              ].map((item) => (
                <Box key={item.step} sx={{ border: "1px solid #DCDDD5", borderRadius: 3, backgroundColor: "#FFFFFF", p: 2.5 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Chip label={item.step} size="small" sx={{ backgroundColor: "#EAF2EE", color: "#315C45", border: "1px solid #D4E0D8", fontWeight: 800 }} />
                      <Box sx={{ width: 38, height: 38, borderRadius: 2, backgroundColor: "#F4F4F1", color: item.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <item.icon fontSize="small" />
                      </Box>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.04em", fontFamily: '"Manrope", "Inter", sans-serif' }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: "#555B55", lineHeight: 1.7 }}>{item.text}</Typography>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        <Box component="section" id="roadmap" sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid #DCDDD5", backgroundColor: "#F4F4F1" }}>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 760, mb: 4 }}>
              <Typography variant="overline" sx={{ color: "#315C45", fontWeight: 800, letterSpacing: 1.4 }}>
                ROADMAP
              </Typography>
              <Typography variant="h3" sx={{ mt: 1.25, letterSpacing: "-0.055em", fontWeight: 800, lineHeight: 1.08, fontFamily: '"Manrope", "Inter", sans-serif' }}>
                Built for more than a chat window.
              </Typography>
              <Typography variant="body1" sx={{ mt: 1.5, color: "#555B55", lineHeight: 1.75, maxWidth: 720 }}>
                Today, build focused bots grounded in your own data. Over time, the platform could grow into the places where your users and workflows already live.
              </Typography>
            </Box>

            <Grid container spacing={2.5}>
              {roadmapItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                    <Paper elevation={0} sx={{ height: "100%", p: 3, borderRadius: 3, border: "1px solid #DCDDD5", backgroundColor: "#FFFFFF" }}>
                      <Stack spacing={2}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Chip label={item.label} size="small" sx={{ backgroundColor: "#F4F4F1", color: "#20241F", border: "1px solid #DCDDD5", fontWeight: 800 }} />
                          <Box sx={{ width: 40, height: 40, borderRadius: 2, backgroundColor: "#F4F4F1", color: item.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon fontSize="small" />
                          </Box>
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.04em", fontFamily: '"Manrope", "Inter", sans-serif' }}>{item.title}</Typography>
                        <Typography variant="body2" sx={{ color: "#555B55", lineHeight: 1.7 }}>{item.text}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #DCDDD5", backgroundColor: "#1F2A26", p: { xs: 3, md: 5 }, display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 3 }}>
              <Box>
                <Typography variant="overline" sx={{ color: "#DDE9E2", fontWeight: 800, letterSpacing: 1.4 }}>
                  START NOW
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, letterSpacing: "-0.055em", fontWeight: 800, lineHeight: 1.08, fontFamily: '"Manrope", "Inter", sans-serif', color: "#FFFFFF" }}>
                  Give your data a purpose.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.25, color: "#DAE5E0", maxWidth: 560, lineHeight: 1.7 }}>
                  Create your first bot, organize its knowledge, and start exploring what you can build.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={handlePrimaryAction}
                endIcon={<ArrowForwardRounded />}
                sx={{
                  minHeight: 48,
                  minWidth: 160,
                  backgroundColor: "#F7F6F2",
                  color: "#1F2A26",
                  borderRadius: 2,
                  fontWeight: 800,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#EEF0ED" },
                }}
              >
                Get Started
              </Button>
            </Paper>
          </Container>
        </Box>
      </main>

      <Box component="footer" sx={{ borderTop: "1px solid #DCDDD5", py: 4, backgroundColor: "#F7F6F2" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.25 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: 2, backgroundColor: "#315C45" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.06em", fontFamily: '"Manrope", "Inter", sans-serif' }}>
                  BotForge
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#555B55", maxWidth: 430, lineHeight: 1.7 }}>
                One platform for multiple bots, each grounded in the knowledge that belongs to it.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2.5} sx={{ flexWrap: "wrap" }}>
              {navItems.map((item) => (
                <Box key={item.label} component="a" href={item.href} sx={{ color: "#555B55", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
                  {item.label}
                </Box>
              ))}
            </Stack>

            <Typography variant="caption" sx={{ color: "#6C746F" }}>
              © {new Date().getFullYear()} BotForge
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function ProductDiagram() {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #DCDDD5",
          borderRadius: 4,
          backgroundColor: "#FFFFFF",
          p: { xs: 2, md: 2.5 },
          boxShadow: "0 24px 48px rgba(32, 36, 31, 0.06)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ borderBottom: "1px solid #DCDDD5", pb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {["#D64E3A", "#D7A84F", "#315C45"].map((color) => (
              <Box key={color} sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color }} />
            ))}
          </Box>
          <Typography variant="caption" sx={{ color: "#6C746F", fontWeight: 800, letterSpacing: 1.2 }}>
            BOT WORKSPACE
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack spacing={1.25}>
              <BotNode label="Documentation Bot" tone="#315C45" active />
              <BotNode label="Support Bot" tone="#3559A8" />
              <BotNode label="Engineering Bot" tone="#C66A36" />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 8 }}>
            <Box sx={{ border: "1px solid #DCDDD5", borderRadius: 3, backgroundColor: "#F7F6F2", p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Knowledge routing
                </Typography>
                <Chip label="Grounded answer" size="small" sx={{ border: "1px solid #D4E0D8", backgroundColor: "#EAF2EE", color: "#315C45", fontWeight: 800 }} />
              </Box>

              <Stack spacing={1.25}>
                {[
                  { name: "Product docs", count: "14 files", tone: "#315C45" },
                  { name: "Support guides", count: "9 files", tone: "#3559A8" },
                  { name: "Technical manuals", count: "12 files", tone: "#C66A36" },
                ].map((source) => (
                  <Box key={source.name} sx={{ border: "1px solid #DCDDD5", borderRadius: 2, px: 1.25, py: 1, display: "grid", gridTemplateColumns: "1.4fr 0.8fr", alignItems: "center", backgroundColor: "#FFFFFF" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: 2, backgroundColor: source.tone }} />
                      <Typography variant="body2" sx={{ color: "#20241F", fontWeight: 700 }}>{source.name}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: "#6C746F", textAlign: "right", fontWeight: 700 }}>{source.count}</Typography>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ mt: 1.5, border: "1px solid #DCDDD5", borderRadius: 2, backgroundColor: "#FFFFFF", p: 1.5 }}>
                <Typography variant="caption" sx={{ color: "#6C746F", letterSpacing: 1.2, fontWeight: 800 }}>
                  RETRIEVAL CONTEXT
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: "#20241F", lineHeight: 1.6 }}>
                  “What is the retry policy for document ingestion?”
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

function BotNode({ label, tone, active = false }: { label: string; tone: string; active?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 2,
        border: active ? `1px solid ${tone}` : "1px solid #DCDDD5",
        backgroundColor: active ? `${tone}14` : "#FFFFFF",
        px: 1.4,
        py: 1.1,
      }}
    >
      <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: tone }} />
      <Typography variant="body2" sx={{ color: "#20241F", fontWeight: 700 }}>{label}</Typography>
    </Box>
  );
}

function FeatureMiniPreview({ accent }: { accent: string }) {
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Box sx={{ border: "1px solid #DCDDD5", borderRadius: 2, backgroundColor: "#F7F6F2", p: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: 16, height: 16, borderRadius: 1.5, backgroundColor: accent }} />
        <Box sx={{ flex: 1, height: 10, borderRadius: 999, backgroundColor: "#DCDDD5" }} />
      </Box>
      <Box sx={{ border: "1px solid #DCDDD5", borderRadius: 2, backgroundColor: "#FFFFFF", p: 1, display: "grid", gap: 0.8 }}>
        <Box sx={{ display: "flex", gap: 0.75 }}>
          <Box sx={{ width: 54, height: 30, borderRadius: 1.5, border: "1px solid #DCDDD5", backgroundColor: "#F7F6F2" }} />
          <Box sx={{ flex: 1, height: 30, borderRadius: 1.5, border: "1px solid #DCDDD5", backgroundColor: "#F7F6F2" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Box sx={{ width: 88, height: 10, borderRadius: 999, backgroundColor: "#DCDDD5" }} />
          <ChevronRightOutlined sx={{ fontSize: 16, color: accent }} />
        </Box>
      </Box>
    </Box>
  );
}

function FactItem({ label }: { label: string }) {
  return (
    <Box sx={{ borderRight: "1px solid #DCDDD5", px: 2, py: 1.5, backgroundColor: "#FFFFFF" }}>
      <Typography variant="caption" sx={{ display: "block", color: "#6C746F", fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase" }}>
        Product
      </Typography>
      <Typography variant="body2" sx={{ color: "#20241F", fontWeight: 700, mt: 0.5 }}>{label}</Typography>
    </Box>
  );
}

export default LandingPage;