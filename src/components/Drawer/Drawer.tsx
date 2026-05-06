import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";

export  default function MainDrawer(){

    const Items=[
        {
            name:"Dashboard",
            path:"/dashboard",
            button:<></>
        },
        {
            name:"Create Bot",
            path:"/dashboard",
            button:<></>
        },
        {
            name:"Manage Bots",
            path:"/dashboard",
            button:<></>
        },
        {
            name:"Setting",
            path:"/dashboard",
            button:<></>
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
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                </Box>
            {/* </Paper> */}
        </Box>
    )
}