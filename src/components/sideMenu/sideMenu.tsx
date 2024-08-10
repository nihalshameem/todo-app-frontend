import React, { FC } from "react";

import { SideMenuWrapper } from "./SideMenu.styled";

import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const SideMenu: FC<any> = (props) => {
  const { window, logout } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar color="transparent" />
      {/* <Divider /> */}
      <List style={{ color: "#fff" }}>
        <ListItem key={"new"} disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <TodayIcon className="white-icon" />
            </ListItemIcon>
            <ListItemText primary={"Add New Task"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"today"} disablePadding>
          <ListItemButton component={Link} to="/today-tasks">
            <ListItemIcon>
              <TodayIcon className="white-icon" />
            </ListItemIcon>
            <ListItemText primary={"Today's Tasks"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"old"} disablePadding>
          <ListItemButton component={Link} to="/old-tasks">
            <ListItemIcon>
              <TodayIcon className="white-icon" />
            </ListItemIcon>
            <ListItemText primary={"Old Pending Tasks"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"upcoming"} disablePadding>
          <ListItemButton component={Link} to="/upcoming-tasks">
            <ListItemIcon>
              <EventIcon className="white-icon" />
            </ListItemIcon>
            <ListItemText primary={"Upcoming Tasks"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"completed"} disablePadding>
          <ListItemButton component={Link} to="/completed-tasks">
            <ListItemIcon>
              <CalendarMonthIcon className="white-icon" />
            </ListItemIcon>
            <ListItemText primary={"Completed Tasks"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"logout"} disablePadding onClick={logout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon className="white-icon" />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <SideMenuWrapper>
      <CssBaseline />
      <AppBar
        color="transparent"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        classes={{ root: "appBarStyle" }}
      >
        <Toolbar color="transparent">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Task App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        color="transparent"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "transparent",
              color: "#fff",
            },
          }}
          open
          style={{ borderRightColor: "transparent", background: "transparent" }}
          color="transparent"
          className="mainSide"
        >
          {drawer}
        </Drawer>
      </Box>
    </SideMenuWrapper>
  );
};

export default SideMenu;
