import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  IconButton,
  Divider,
  Toolbar,
  styled,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Collapse,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {
  ChevronLeft,
  TableView,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const DRAWER_WIDTH=240

// import Loading from "../Loading";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const SideDrawer = ({ isOpen, toggleDrawer, menuItems, reports }) => {
  const location = useLocation();

  // const { isGettingLoggedUserSideMenu, isErrorGettingLoggedUserSideMenu } =
  //   useSelector((state) => state.login);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleScroll = () => {
    window.scrollTo(0, 0);
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: [6],
          pr: [1],
        }}
      >
        <Typography variant="h6" color="#681F6E" fontWeight={"bold"}>
          ADMIN
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>

      <Divider />

      {/* {isGettingLoggedUserSideMenu ? (
        <Loading />
      ) : */}
       (
        <>
          {/* {!isErrorGettingLoggedUserSideMenu && ( */}
            <List>
              {menuItems && menuItems.length > 0 && (
                <>
                  {menuItems.map((item) => (
                    <ListItemButton
                      key={item.label}
                      component={Link}
                      to={item.path}
                      selected={location.pathname === item.path}
                      onClick={handleScroll}
                    >
                      <ListItemIcon sx={{ color: "#681F6E" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          color: "#8D8D8D",
                        }}
                      />
                    </ListItemButton>
                  ))}
                </>
              )}
            </List>
          // )}
        </>
      )}
    </Drawer>
  );
};

export default SideDrawer;
