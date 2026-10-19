import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const RENDER_COLD_START_DELAY_MS = 2500;

export function useRenderColdStartNotice(loading: boolean, delayMs: number = RENDER_COLD_START_DELAY_MS) {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShowNotice(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowNotice(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [loading, delayMs]);

  return showNotice;
}

export function RenderColdStartNotice({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 1,
        color: "#D98A8A",
      }}
    >
      <CircularProgress size={14} thickness={5} sx={{ color: "#D98A8A" }} />
      <Typography variant="body2" sx={{ color: "#D98A8A", fontSize: 13, lineHeight: 1.4 }}>
        The server may take a little longer to wake up after inactivity. Thanks for your patience!
      </Typography>
    </Box>
  );
}
