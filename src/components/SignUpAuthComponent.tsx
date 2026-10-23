import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { setStoredAuth } from "../auth";

export default function SignUpAuthComponent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showDisclaimerServerLOading, setShowDisclaimerServerLOading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please complete all fields.");
      setSuccessMessage(null);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setSuccessMessage(null);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setSuccessMessage(null);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccessMessage(null);
      return;
    }

    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setShowDisclaimerServerLOading(false);

    const disclaimerTimer = window.setTimeout(() => {
      setShowDisclaimerServerLOading(true);
    }, 2000);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/signup`, {
        name: trimmedName,
        email: trimmedEmail.toLowerCase(),
        password,
      });

      const token = response?.data?.token;
      const admin = response?.data?.admin;

      if (!token) {
        throw new Error("Registration succeeded but no session token was returned.");
      }

      setStoredAuth(token, admin || null);
      setSuccessMessage("Account created successfully. Redirecting...");
      navigate("/home/dashboard", { replace: true });
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message;
      const fallback = err?.message || "Unable to create your account right now.";
      setError(serverMessage || fallback);
    } finally {
      clearTimeout(disclaimerTimer);
      setLoading(false);
      setShowDisclaimerServerLOading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2, py: 4, position: "relative" }}>
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
                New Workspace
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 700, letterSpacing: "-0.05em", color: "#0F172A" }}>
                Create your account
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#475569", lineHeight: 1.6 }}>
                Build and manage your own AI bots, documents, and RAG knowledge sources in one place.
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                variant="outlined"
                sx={{ borderColor: "rgba(185, 28, 28, 0.18)", color: "#991B1B", backgroundColor: "rgba(254, 226, 226, 0.8)" }}
              >
                {error}
              </Alert>
            )}

            {successMessage && (
              <Alert
                severity="success"
                variant="outlined"
                sx={{ borderColor: "rgba(22, 101, 52, 0.18)", color: "#166534", backgroundColor: "rgba(220, 252, 231, 0.8)" }}
              >
                {successMessage}
              </Alert>
            )}

            <TextField
              label="Name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#FFFFFF", color: "#0F172A" },    "& .MuiOutlinedInput-input": {color: "#000000",}, }}
            />

            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "#FFFFFF", color: "#0F172A" },    "& .MuiOutlinedInput-input": {color: "#000000",}, }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
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

            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: "#475569" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  Creating account...
                </Box>
              ) : (
                "Create Account"
              )}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", color: "#475569" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "#315C45", fontWeight: 600 }}>
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>

      {showDisclaimerServerLOading && (
        <Box
          sx={{
            position: "fixed",
            left: "50%",
            bottom: { xs: 16, sm: 24 },
            transform: "translateX(-50%)",
            width: "min(92vw, 560px)",
            zIndex: 1500,
            px: 1,
            pointerEvents: "none",
          }}
        >
          <Alert
            severity="warning"
            variant="filled"
            sx={{
              borderRadius: 2,
              background: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
              color: "#7F1D1D",
              border: "1px solid rgba(153, 27, 27, 0.22)",
              boxShadow: "0 12px 24px rgba(127, 29, 29, 0.14)",
              alignItems: "center",
              "& .MuiAlert-icon": { color: "#DC2626" },
              "& .MuiAlert-message": { color: "#7F1D1D" },
            }}
          >
            <Stack spacing={0.25}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.4, color: "#7F1D1D" }}>
                Server wake-up notice
              </Typography>
              <Typography variant="body2" sx={{ color: "#7F1D1D", lineHeight: 1.5 }}>
                The backend is hosted on Render and may sleep when inactive. It can take a little time to wake up before account creation completes.
              </Typography>
            </Stack>
          </Alert>
        </Box>
      )}
    </Box>
  );
}