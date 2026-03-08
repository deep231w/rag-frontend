import { Box, Drawer, Typography } from "@mui/material";

export default function CustomDrawer({bot ,onClose}:{bot:any , onClose:()=>void}){

    console.log("bot in custom Drawer - ", bot)

    return(
        <Drawer anchor="right" open onClose={onClose}>
            <Box
                sx={{width:700 , p:3, mt:5 , display:"flex" , flexDirection:"column"  ,alignItems:"center"}}
            >
                <Typography variant="h4">{bot?.botName}</Typography>
                
            </Box>
        </Drawer>
    )
}