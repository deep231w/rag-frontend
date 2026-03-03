import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h2">
          Create Bot
        </Typography>
        <Box
            sx={{
                pt:7,
                display:"flex",
                flexDirection:"column"
            }}
            gap={3}
        >
            <TextField
                label="Bot Name"
                fullWidth
            />

            <Button 
                variant="contained"
                color="secondary"
            > 
                Create
            </Button>

        </Box>
        
      </Box>
    </Box>
  );
}