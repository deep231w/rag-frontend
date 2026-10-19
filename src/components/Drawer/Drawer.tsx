import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useLocation, useNavigate } from "react-router-dom";

export default function MainDrawer({ onCollapse, isCollapsed }: { onCollapse?: () => void; isCollapsed?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { name: "Dashboard", path: "dashboard", icon: SpaceDashboardOutlinedIcon },
    { name: "Create Bot", path: "create-bot", icon: CreateNewFolderOutlinedIcon },
    { name: "Manage Bots", path: "manage-bots", icon: ManageAccountsOutlinedIcon },
    { name: "Settings", path: "settings", icon: SettingsOutlinedIcon },
  ];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ px: 1.5, py: 2.5 }}>
        <Typography variant="caption" sx={{ color: "#9AA4B2", textTransform: "uppercase", letterSpacing: 1.2 }}>
          Workspace
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#303744" }} />
      <Box sx={{ px: 1.5, py: 1.5 }}>
        <List sx={{ display: "flex", flexDirection: "column", gap: 0.75, p: 0 }}>
          {items.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.includes(item.path);

            return (
              <ListItemButton
                key={item.name}
                onClick={() => {
                  navigate(`/home/${item.path}`);
                  if (onCollapse && !isCollapsed) {
                    onCollapse();
                  }
                }}
                selected={active}
                sx={{
                  px: 1.5,
                  py: 1,
                  minHeight: 44,
                  border: active ? "1px solid rgba(228,183,44,0.35)" : "1px solid transparent",
                  backgroundColor: active ? "rgba(228,183,44,0.12)" : "transparent",
                  color: active ? "#E8ECF2" : "#9AA4B2",
                  "& .MuiListItemIcon-root": {
                    color: active ? "#E4B72C" : "#9AA4B2",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    lineHeight: 1.4,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}