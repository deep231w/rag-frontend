import {
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import DashboardChart from "./charts/TestChart";
import Doughnutt from "./charts/Doghunt";

export default function Dashboard() {
  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      {/* Top Metrics */}
      <Grid container spacing={2} mb={3}>
        {[
          {
            title: "Total Bots",
            value: "24",
          },
          {
            title: "PDF Uploaded",
            value: "128",
          },
          {
            title: "API Requests",
            value: "14.2K",
          },
          {
            title: "Active Users",
            value: "312",
          },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
            <Paper
              sx={{
                p: 3,

                background: "#111",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius: 4,

                height: 120,

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",

                transition: "0.2s",

                "&:hover": {
                  borderColor:
                    "rgba(255,255,255,0.18)",
                },
              }}
            >
              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,0.6)",
                  fontSize: 14,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2}>
        {/* Line Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              p: 3,

              background: "#111",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: 4,

              height: 420,
            }}
          >
            <Typography mb={2}>
              Bot Analytics
            </Typography>

            <Box
              sx={{
                height: 340,
              }}
            >
              <DashboardChart />
            </Box>
          </Paper>
        </Grid>

        {/* Doughnut */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,

              background: "#111",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: 4,

              height: 420,

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography mb={2}>
              File Distribution
            </Typography>

            <Box
              sx={{
                flex: 1,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 260,
                  height: 260,
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