import { Box, Button, Drawer, Input, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function CustomDrawer({bot ,onClose}:{bot:any , onClose:()=>void}){

    console.log("bot in custom Drawer - ", bot)
    const [files , setFiles]=useState(null);

    return(
        <Drawer anchor="right" open onClose={onClose}>
            <Box
                sx={{width:700 , p:3, mt:5 , display:"flex" , flexDirection:"column"  }}
            >
                <Typography sx={{textAlign:"center"}} variant="h4">{bot?.botName}</Typography>

                <Box
                    sx={{
                        display:"flex",
                        pt:4,
                        width:"100%",
                        gap:2
                    }}
                    
                >
                    <TextField
                        label="File name"
                        disabled
                        variant="outlined"
                        size="small"  
                        fullWidth  
                    />
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Select
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                    >
                        Upload
                    </Button>
                </Box>

                {/* uploaded files */}
                <Box
                    sx={{
                        pt:3
                    }}
                >
                    <Typography
                        variant="h6"
                        color="gray"
                        sx={{ textAlign: "left", width: "100%" }}
                    >
                        Files
                    </Typography>
                    <Box sx={{display:"flex" , flexDirection:"column"}}>
                        {/* input boxex in column */}
                        {files ? (<Box>
                               
                        </Box>):
                        (<Box sx={{display:"flex" , justifyContent:"center"}}>
                            <Typography sx={{textAlign:"center" }} variant="h6">No Files Available!</Typography>
                        </Box>)}
                    </Box>
                </Box>

                {/* test chat performance */}
                <Box sx={{display:"flex" , pt:3 , flexDirection:"column" , gap:2}}>
                    <Typography sx={{textAlign:"left"}} color="gray" variant="h6">Test {bot.botName}'s Response</Typography>
                    <Box sx={{display:"flex" ,flexDirection:"column" , gap:1}}>
                        <Paper
                            sx={{color:"gray" , height:"490px"}}
                        >

                        </Paper>
                        <Box sx={{display:"flex" , flexDirection:"row" , gap:2}}>
                            <TextField
                                label="Type ..."
                                variant="outlined"
                                size="small"  
                                fullWidth  
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                            >Send</Button>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}