import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "../../assets/icons/MenuIcon"
import { useState } from "react"
import MainDrawer from "../../components/Drawer/Drawer";

export default function NewHome (){

    const [openDrawer , setOpenDrawer]=useState<boolean>(false);

    const drawerWidth = 260;
    return (
        <Box>
            <AppBar 
                position="static"
                sx={{
                        transition: "all 0.3s",
                        ...(openDrawer && {
                        ml: `${drawerWidth}px`,
                        width: `calc(100% - ${drawerWidth}px)`,
                        }),
                    }}
            >
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>setOpenDrawer(!openDrawer)}>
                        <MenuIcon 
                            sx={{ 
                                width: 40, 
                                height: 40 ,
                                color:"yellow"
                            }} 
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: 'inherit',
                        }}
                    >
                        Bot Management
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer 
                open={openDrawer} 
                onClose={()=>setOpenDrawer(false)}

                anchor="left"
                variant="persistent"
                sx={{
                    "& .MuiDrawer-paper": {
                        borderRadius: "12px",
                        margin:"9px",
                        width:"245px",
                        height: `calc(100% - ${10 * 2}px)`
                    }
                }}  
            >
                    <MainDrawer/>                
            </Drawer>
        </Box>
    )
}

