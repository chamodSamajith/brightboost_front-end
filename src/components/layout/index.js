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

const menuItemsAll = [
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
    label: "Tutor",
    icon: <Public />,
    path: "/tutor",
  },
  {
    code: "QL",
    label: "Quetion Logging",
    icon: <Paid />,
    path: "/TutorQuestions",
  },
];

const menuItemsStudent = [
  {
    code: "SESSION",
    label: "Session",
    icon: <People />,
    path: "/session",
  },
  {
    code: "QL",
    label: "Question Logging",
    icon: <Paid />,
    path: "/StudentQuestions",
  },
];

const menuItems3 = [
  {
    code: "SESSION",
    label: "Session",
    icon: <People />,
    path: "/session",
  },
  {
    code: "QL",
    label: "Quetion Answering",
    icon: <Paid />,
    path: "/TutorQuestions",
  },
];

const menuItemsAdmin = [
  {
    code: "SESSION",
    label: "Dashboard",
    icon: <People />,
    path: "/admin",
  },
];

const Layout = () => {
  const isStudent = (window.sessionStorage.getItem("userType"));
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    // setIsDrawerOpen(!isDrawerOpen)
    setIsDrawerOpen(false)
  }

  const onHandleLogout=()=>{
    window.sessionStorage.removeItem("IsLoggedIn");
    navigate('/login');
  }

  let selectedMenuItems;

  switch (isStudent) {
    case 'student':
      selectedMenuItems = menuItemsStudent;
      break;
    case 'tutor':
      selectedMenuItems = menuItemsStudent;
      break;
    case 'admin':
      selectedMenuItems = menuItemsAdmin;
      break;
    default:
      // Define a default value if needed
      selectedMenuItems = menuItemsAll;
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
        menuItems={selectedMenuItems}
        visible ={selectedMenuItems}
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
