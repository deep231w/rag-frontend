import { Alert, Box, Button, Snackbar, TextField, Typography, type AlertColor } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateBot() {
  const admin= JSON.parse(localStorage.getItem("admin") || "null");

  const [botName , setBotName]=useState<string>("");
  const [success, setSuccess]=useState<boolean>(false);
  const [alert , setAlert]=useState<{
    message:string,
    servirity:AlertColor,
    open:boolean
  }>({
    message:"", 
    servirity:"info",
    open:false
  })

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

      if(res.status==200){
        setSuccess(true)
        setAlert({open:true ,servirity:"success", message:"bot create"});
      }
    }catch(e){
      console.log("error in create bot= ", e);
      setAlert({open:true ,servirity:"error", message:"bot creation failed!!"});
    }
  }

  function handleClose (){
    setSuccess(false);
  }

  useEffect(() => {
      if (success) {
        const timer = setTimeout(() => {
          setSuccess(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [success]);

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
      {success && 
        <Snackbar
          open={alert.open}
          autoHideDuration={6000} 
          onClose={handleClose}
        >
          <Alert
                onClose={handleClose}
                severity={alert.servirity}
                variant="filled"
                sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>}
    </Box>
  );
}