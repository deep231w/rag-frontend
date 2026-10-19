import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { setStoredAuth } from "../auth";

export default function SignInAuthComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectFrom = (location.state as { from?: string } | null)?.from || "/home/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both your email and password.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/signin`, {
        email: email.trim(),
        password,
      });

      const token = response?.data?.token;
      const admin = response?.data?.admin;

      if (!token) {
        throw new Error("Authentication failed: no token returned.");
      }

      setStoredAuth(token, admin || null);
      navigate(redirectFrom, { replace: true });
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message;
      const fallback = err?.message || "Unable to sign in right now.";
      setError(serverMessage || fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2, py: 4 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: "#1B2028",
            border: "1px solid #303744",
            boxShadow: "none",
          }}
        >
          <Stack spacing={2.5} component="form" onSubmit={handleSubmit} noValidate>
            <Box>
              <Typography variant="caption" sx={{ color: "#9AA4B2", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700 }}>
                RAG Admin
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 700, letterSpacing: "-0.05em" }}>
                Sign in to your workspace
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#9AA4B2", lineHeight: 1.6 }}>
                Access the RAG administration dashboard for bot management, document ingestion, and workspace configuration.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" variant="outlined" sx={{ borderColor: "rgba(244, 67, 54, 0.5)", color: "#F8D7DA", backgroundColor: "rgba(244, 67, 54, 0.06)" }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: "#9AA4B2" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#E4B72C",
                color: "#101318",
                fontWeight: 700,
                py: 1.25,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#F0C94A" },
                "&.Mui-disabled": { backgroundColor: "rgba(228, 183, 44, 0.4)", color: "rgba(16, 19, 24, 0.6)" },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <CircularProgress size={18} thickness={5} sx={{ color: "#101318" }} />
                  Signing in...
                </Box>
              ) : (
                "Sign In"
              )}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", color: "#9AA4B2" }}>
              Don’t have an account?{" "}
              <Link href="/signup" underline="hover" sx={{ color: "#E4B72C", fontWeight: 600 }}>
                Create one
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}