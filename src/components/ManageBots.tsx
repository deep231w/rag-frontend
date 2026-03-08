import { Alert, Box, Button, Grid, Paper, Snackbar, Typography, type AlertColor } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomDrawer from "./CustomDrawer";

export default function ManageBots(){

    const admin= JSON.parse(localStorage.getItem("admin") || "null");

    const [bots , setBots]=useState<
        { id: string; adminId: string; botName: string }[]
    >([]);

      const [alert , setAlert]=useState<{
        message:string,
        servirity:AlertColor,
        open:boolean
      }>({
        message:"", 
        servirity:"info",
        open:false
      })

      const [isDrawer , setIsDrawer]=useState<boolean>(false);
      const [drawerContent , setDrawerContent]=useState<React.ReactNode>(null);

    
    async function fetchBots(){
        if(!admin){
            setAlert({open:true ,servirity:"warning", message:"please login again"});
            console.log("admin doesnot exist");
            return;
        }

        try{
            const response= await axios.get(`${import.meta.env.VITE_API_URL}/bot/getbotsdata`,{
                params:{
                    adminId:admin.userId
                }
            })

            console.log("response of bots - ", response.data);
            const botsdata=response.data.bots.map((bot:any)=>({
                id:bot._id,
                adminId:bot.adminId,
                botName:bot.name
            })); 
            setBots(botsdata);

            console.log("raw bots= ", botsdata)

        }catch(e){
            console.log("error in fetch bots -", e);

        }
    }

    useEffect(()=>{
        fetchBots();
    },[admin?.userId])

    function handleClose (){
        // setSuccess(false);
        setAlert({open:false ,servirity:"info", message:""});
    }

    //on bot click
    function BotCLick(bot:any) {
        console.log("bot clicked -" ,bot)
        setIsDrawer(true);
        setDrawerContent(
            <CustomDrawer
                bot={bot}
                onClose={()=>setDrawerContent(null)}
            />
        )
        
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
            <Box sx={{mt:4}}>
                <Grid container spacing={3}>
                    {bots.length>=1 ? (bots.map((bot)=>(
                        <Grid key={bot.id} size={{xs:12 , sm:6 , md:4}} >
                            <Button
                                fullWidth
                                onClick={()=>BotCLick(bot)}
                            >
                                <Paper sx={{p:3 ,width:"100%"}}>

                                    <Typography
                                        variant="h6"
                                    >
                                        {bot.botName}
                                    </Typography>
                                </Paper>
                            </Button>
                            
                        </Grid>
                    ))):(
                        <Box
                            sx={{
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center"
                            }}
                        >
                            <Typography variant="h5">No Bot Available</Typography>
                        </Box>
                    )}
                </Grid>
            </Box>
            {drawerContent}
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