import React from "react";
import { Box, Button, IconButton, Toolbar, styled } from "@mui/material";
import {
  Menu,
} from "@mui/icons-material";
import MuiAppBar from "@mui/material/AppBar";


const DRAWER_WIDTH=240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const HeaderBar = ({ isOpen, toggleDrawer, handleLogout }) => {
  return (
    <AppBar position="absolute" open={isOpen}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(isOpen && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "flex-end",
            height: "64px",
          }}
        >
        </Box>
        <Button
          color="inherit"
          sx={{ textTransform: "none" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
