import { Box, Grid, Paper, Typography } from "@mui/material";

import DashboardChart from "./charts/TestChart";
import Doughnutt from "./charts/Doghunt";

export default function Dashboard() {
  const metrics = [
    { title: "Total Bots", value: "24" },
    { title: "PDFs Uploaded", value: "128" },
    { title: "API Requests", value: "14.2K" },
    { title: "Active Users", value: "312" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Overview
        </Typography>
        <Typography variant="body2" sx={{ color: "#9AA4B2" }}>
          System activity and document ingestion across your RAG workspace.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {metrics.map((item) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                minHeight: 118,
                backgroundColor: "#1B2028",
                border: "1px solid #303744",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  borderColor: "#4B5568",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#9AA4B2",
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Bot Analytics
              </Typography>
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
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              File Distribution
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 260,
              }}
            >
              <Box
                sx={{
                  width: { xs: 210, md: 260 },
                  height: { xs: 210, md: 260 },
                }}
              >
                <Doughnutt />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}