import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Person,
  People,
  Public,
  Paid,
} from "@mui/icons-material";

import HeaderBar from "./HeaderBar";
import SideDrawer from "./SideDrawer";


const menuItems = [
  {
    code: "SESSION",
    label: "Session",
    icon: <People />,
    path: "/session",
  },
  {
    code: "ADMIN",
    label: "Admin",
    icon: <Person />,
    path: "/admin",
  },
  {
    code: "TUTOR",
    label: "TUTOR",
    icon: <Public />,
    path: "/page3",
  },
  {
    code: "QL",
    label: "Quetion Logging",
    icon: <Paid />,
    path: "/page4",
  },
];

const Layout = () => {

  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const onHandleLogout=()=>{
    window.sessionStorage.removeItem("IsLoggedIn");
    navigate('/login');
  }

  return (
    <Box sx={{ display: "flex" }}>

      {/* Header bar */}
      <HeaderBar
        toggleDrawer={toggleDrawer}
        isOpen={isDrawerOpen}
        handleLogout={onHandleLogout}
      />

      {/* SideDrawer */}
      <SideDrawer
        toggleDrawer={toggleDrawer}
        isOpen={isDrawerOpen}
        menuItems={menuItems}
      />

      {/* Main container */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "calc(100vh - 64px)",
          minWidth: "700px",
          overflow: "auto",
          mt: 8,
          p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
