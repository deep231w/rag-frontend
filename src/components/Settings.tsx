import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

export default function Settings() {
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
        {/* Header */}
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

        {/* Main Grid */}
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
          {/* LLM Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,

              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",

              border:
                "1px solid rgba(255,255,255,0.08)",

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
                fullWidth
                label="OpenAI API Key"
                placeholder="sk-xxxxxxxx"

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon
                        sx={{
                          color:
                            "rgba(255,255,255,0.4)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Claude API Key"
                placeholder="sk-ant-xxxxxxxx"

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon
                        sx={{
                          color:
                            "rgba(255,255,255,0.4)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Gemini API Key"
                placeholder="AIzaSyxxxxxxxx"

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon
                        sx={{
                          color:
                            "rgba(255,255,255,0.4)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>

          {/* Embedding Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,

              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",

              border:
                "1px solid rgba(255,255,255,0.08)",

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

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <TextField
                fullWidth
                label="Embedding API Key"
                placeholder="Enter embedding provider key"

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyOutlinedIcon
                        sx={{
                          color:
                            "rgba(255,255,255,0.4)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Embedding Model"
                placeholder="text-embedding-3-small"
              />

              <TextField
                fullWidth
                label="Vector Database"
                placeholder="Pinecone / Weaviate / Chroma"
              />
            </Box>
          </Paper>
        </Box>

        {/* Bottom Save */}
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
            startIcon={<SaveOutlinedIcon />}
            sx={{
              px: 4,
              height: 50,
              borderRadius: 3,
            }}
          >
            Save Configuration
          </Button>
        </Box>
      </Box>
    </Box>
  );
}