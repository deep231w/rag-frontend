import { Alert, Box, Grid, Snackbar, Typography, type AlertColor } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageBots(){

    const admin= JSON.parse(localStorage.getItem("admin") || "null");

      const [alert , setAlert]=useState<{
        message:string,
        servirity:AlertColor,
        open:boolean
      }>({
        message:"", 
        servirity:"info",
        open:false
      })
    
    async function fetchBots(){
        if(!admin){
            setAlert({open:true ,servirity:"warning", message:"please login again"});
            console.log("admin doesnot exist");
            return;
        }

        try{
            const response= await axios.get(`${import.meta.env.VITE_API_URL}/bot/getbotsdata`,{
                params:{adminId:admin.userId}
            })

            console.log("response of bots - ", response);

        }catch(e){
            console.log("error in fetch bots -", e);

        }
    }

    useEffect(()=>{
        fetchBots();
    },[admin])

    function handleClose (){
        // setSuccess(false);
        setAlert({open:false ,servirity:"info", message:""});
    }

    return(
        <Box 
            sx={{
                display:"flex",
                flexDirection:"column"
            }}
        >
            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center"
                }}
            >
                <Typography variant="h4">Manage Your Bots</Typography>
            </Box>
            <Box>
                <Grid>

                    <Typography variant="h6">Bot1</Typography>
                    <Typography variant="h6">Bot2</Typography>
                    <Typography variant="h6">Bot3</Typography>
                </Grid>
            </Box>
            {alert.open && 
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
    )
}