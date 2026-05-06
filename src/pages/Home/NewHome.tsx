import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "../../assets/icons/MenuIcon"
import { useState } from "react"
import MainDrawer from "../../components/Drawer/Drawer";

export default function NewHome (){

    const [openDrawer , setOpenDrawer]=useState<boolean>(false);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon 
                            sx={{ width: 50, height: 50 }} 
                            onClick={()=>setOpenDrawer(!openDrawer)}
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
            {openDrawer &&
                <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)}>
                    <MainDrawer/>
                </Drawer>
            }
        </Box>
    )
}

