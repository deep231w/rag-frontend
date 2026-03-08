import { Box, Drawer, Typography } from "@mui/material";

export default function CustomDrawer({bot ,onClose}:{bot:any , onClose:()=>void}){

    console.log("bot in custom Drawer - ", bot)

    return(
        <Drawer anchor="right" open onClose={onClose}>
            <Box
                sx={{width:700 , p:3}}
            >
                <Typography> hello d</Typography>
            </Box>
        </Drawer>
    )
}