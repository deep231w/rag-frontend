import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function DashboardPage() {
  const admin= JSON.parse(localStorage.getItem("admin") || "null");

  const [botName , setBotName]=useState<string>("");

  async function createButton() {
    console.log("admin is = ", admin)

    if(!botName || !admin){
      console.log("error , missing creds");
      return;
    }
    try{
      const res =await axios.post(`${import.meta.env.VITE_API_URL}/bot/create`,{
        name:botName,
        adminId:admin.userId
      })

      console.log("bot create response- ", res);

    }catch(e){
      console.log("error in create bot= ", e);
    }
    
  }
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
                onChange={(e)=>setBotName(e.target.value)}
                label="Bot Name"
                fullWidth
            />

            <Button 
                variant="contained"
                color="secondary"
                onClick={createButton}
            > 
                Create
            </Button>

        </Box>
        
      </Box>
    </Box>
  );
}