import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router-dom";
export  default function MainDrawer(){

    const navigate =useNavigate();
    const Items=[
        {
            name:"Dashboard",
            path:"dashboard",
            button:SpaceDashboardOutlinedIcon
        },
        {
            name:"Create Bot",
            path:"create-bot",
            button:CreateNewFolderOutlinedIcon
        },
        {
            name:"Manage Bots",
            path:"manage-bots",
            button:ManageAccountsOutlinedIcon
        },
        {
            name:"Setting",
            path:"settings",
            button:SettingsOutlinedIcon
        }
    ]
    
    return(
        <Box sx={{ height: "100%" 
        }}>
            {/* <Paper> */}
                <Box 
                    sx={{ }} role="presentation" 
                    // onClick={toggleDrawer(false)}
                >
                <Box
                    height={70}
                >

                </Box>
                <Divider />
                <List>
                    {Items.map((item) => {
                    const Icon = item.button;

                    return (
                        <Box padding={1}>
                            <ListItem key={item.name} disablePadding>
                            <ListItemButton
                                onClick={()=>navigate(item.path)}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
                                <Icon />
                                </ListItemIcon>

                                <ListItemText primary={item.name} />
                            </ListItemButton>
                            </ListItem>
                        </Box>
                    );
                    })}                
                </List>
            </Box>
            {/* </Paper> */}
        </Box>
    )
}