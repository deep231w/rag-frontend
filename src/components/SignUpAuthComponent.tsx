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
                New Workspace
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 700, letterSpacing: "-0.05em" }}>
                Create your account
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#9AA4B2", lineHeight: 1.6 }}>
                Build and manage your own AI bots, documents, and RAG knowledge sources in one place.
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                variant="outlined"
                sx={{ borderColor: "rgba(244, 67, 54, 0.5)", color: "#F8D7DA", backgroundColor: "rgba(244, 67, 54, 0.06)" }}
              >
                {error}
              </Alert>
            )}

            {successMessage && (
              <Alert
                severity="success"
                variant="outlined"
                sx={{ borderColor: "rgba(46, 204, 113, 0.5)", color: "#D7F7E8", backgroundColor: "rgba(46, 204, 113, 0.06)" }}
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
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

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
                      sx={{ color: "#9AA4B2" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
                      sx={{ color: "#9AA4B2" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  Creating account...
                </Box>
              ) : (
                "Create Account"
              )}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", color: "#9AA4B2" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "#E4B72C", fontWeight: 600 }}>
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}