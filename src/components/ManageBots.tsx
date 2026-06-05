import { Alert, Box, Grid, IconButton, Menu, MenuItem, Snackbar, Typography, type AlertColor } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomDrawer from "./CustomDrawer";
import { PdfViewer } from "./PdfViewer";
import BotIcon from "../assets/icons/BotIcon";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function ManageBots(){

    const admin= JSON.parse(localStorage.getItem("admin") || "null");

    const [bots , setBots]=useState<
        { 
            id: string; 
            adminId: string; 
            botName: string;
            description:string;
            files:[]
        }[]
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

      const [selectedBot, setSelectedBot] = useState<any>(null);
      const [isDrawer , setIsDrawer]=useState<boolean>(false);
      const [drawerContent , setDrawerContent]=useState<React.ReactNode>(null);

      //pdf viewer 
      const [isPdfViewerOpen  , setIsPdfViewerOpen]=useState(false);
    //   const [viewFile, setViewFile]=useState();
      const [PdfForView , setPdfForView]=useState<any>();
      
      //menu button
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (
            event: React.MouseEvent<HTMLElement>,
            bot: any
        ) => {
            setAnchorEl(event.currentTarget);
            setSelectedBot(bot);
        };
        const handleCloseMenu = () => {
            setAnchorEl(null);
        };


    
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
                },
                  headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Accept": "application/json"
                }
            })

            console.log("response of bots - ", response.data);
            const botsdata=response.data.bots.map((bot:any)=>({
                id:bot._id,
                adminId:bot.adminId,
                botName:bot.name,
                description:bot.description || "N/A",
                files:bot.files.map((f:any)=>({
                    id:f._id,
                    fileName:f.name,
                    url:f.url
                }))
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

    const handleSetPdfFileForView=(data:any)=>{
        setPdfForView(data);
    }

    //on bot click
    function BotCLick(bot:any) {
        console.log("bot clicked -" ,bot)
        setIsDrawer(!isDrawer);
        setDrawerContent(
            <CustomDrawer
                bot={bot}
                onClose={()=>setDrawerContent(null)}
                isOpenPdf={()=>setIsPdfViewerOpen(true)}
                setPdfFile={handleSetPdfFileForView}
                admin={admin}
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
                        <Grid key={bot.id} size={{xs:12 , sm:6 , md:3}} >
                            <Box
                            sx={{
                                position: "relative",


                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "18px",

                                background: "rgba(255,255,255,0.04)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",

                                boxShadow: "0 8px 30px rgba(0,0,0,0.35)",

                                p: 3,
                                m:2,

                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",

                                transition: "all 0.25s ease",

                                "&:hover": {
                                transform: "translateY(-4px)",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                },
                            }}
                            >
                            {/* Top Section */}
                            <Box
                                sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                                }}
                            >
                                <Box
                                sx={{
                                    width: 120,
                                    height: 120,

                                    borderRadius: "50%",

                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",

                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                                >
                                <BotIcon height="80px" width="80px" />
                                </Box>

                                <Box textAlign="center">
                                <Typography
                                    variant="h6"
                                    sx={{
                                    fontWeight: 700,
                                    color: "#f8fafc",
                                    }}
                                >
                                    {bot.botName}
                                </Typography>

                                <Typography
                                    sx={{
                                    mt: 1,
                                    fontSize: 14,
                                    color: "rgba(255,255,255,0.65)",

                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    }}
                                >
                                    {bot.description}
                                </Typography>
                                </Box>
                            </Box>

                            {/* Bottom Section */}
                            <Box
                                sx={{
                                mt: 3,

                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                }}
                            >
                                <IconButton
                                    sx={{
                                        color: "rgba(255,255,255,0.65)",

                                        "&:hover": {
                                        background: "rgba(255,255,255,0.08)",
                                        color: "#fff",
                                        },
                                    }}
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open}
                                    onClick={(e) => handleClick(e, bot)}
                                >
                                    <MoreVertOutlinedIcon />
                                </IconButton>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleCloseMenu}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={
                                        ()=>{
                                            BotCLick(selectedBot);
                                            handleCloseMenu();
                                        }
                                    }>View</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>Manage</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>Export</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>Delete Bot</MenuItem>
                                </Menu>
                            </Box>
                            </Box>                            
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
            {isPdfViewerOpen && 
                <PdfViewer
                    open={isPdfViewerOpen}
                    onClose={()=>setIsPdfViewerOpen(false)}
                    file={PdfForView}
                />
            }
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