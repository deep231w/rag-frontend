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
  const [email, setEmail] = useState("test@account.com");
  const [password, setPassword] = useState("123456");
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
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Stack spacing={2.5} component="form" onSubmit={handleSubmit} noValidate>
            <Box>
              <Typography variant="caption" sx={{ color: "#475569", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700 }}>
                RAG Admin
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 700, letterSpacing: "-0.05em", color: "#0F172A" }}>
                Sign in to your workspace
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#475569", lineHeight: 1.6 }}>
                Access the RAG administration dashboard for bot management, document ingestion, and workspace configuration.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" variant="outlined" sx={{ borderColor: "rgba(185, 28, 28, 0.18)", color: "#991B1B", backgroundColor: "rgba(254, 226, 226, 0.8)" }}>
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#FFFFFF", color: "#0F172A" },     "& .MuiOutlinedInput-input": {color: "#000000",}, }}
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
                      sx={{ color: "#475569" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#FFFFFF", color: "#0F172A" },    "& .MuiOutlinedInput-input": {color: "#000000",}, }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#315C45",
                color: "#FFFFFF",
                fontWeight: 700,
                py: 1.25,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#284F3A" },
                "&.Mui-disabled": { backgroundColor: "rgba(49, 92, 69, 0.35)", color: "rgba(255, 255, 255, 0.8)" },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                  <CircularProgress size={18} thickness={5} sx={{ color: "#FFFFFF" }} />
                  Signing in...
                </Box>
              ) : (
                "Sign In"
              )}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", color: "#475569" }}>
              Don’t have an account?{" "}
              <Link href="/signup" underline="hover" sx={{ color: "#315C45", fontWeight: 600 }}>
                Create one
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}