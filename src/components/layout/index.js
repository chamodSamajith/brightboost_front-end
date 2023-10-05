import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Box} from "@mui/material";
import {
  Person,
  People,
  // Dashboard,
  Public,
  Paid,
  Policy,
  Approval,
  HowToReg,
  BusinessOutlined,
  LockReset,
  DoneAll,
  Mail,
} from "@mui/icons-material";

import HeaderBar from "./HeaderBar";
import SideDrawer from "./SideDrawer";

// import { getLoggedUserSideMenu } from "../../store/actions";

const menuItems = [
  // {
  //   label: "Home",
  //   icon: <Dashboard />,
  //   path: "/",
  // },
  {
    code: "USER",
    label: "Create DF User",
    icon: <People />,
    path: "/df-users",
  },
  {
    code: "USER_ROLE",
    label: "DF User Roles",
    icon: <Person />,
    path: "/df-user-roles",
  },
  {
    code: "G_TEM",
    label: "Global Template",
    icon: <Public />,
    path: "/global-template",
  },
  {
    code: "FEE_TEM",
    label: "Fee Template",
    icon: <Paid />,
    path: "/fee-template",
  },
  // {
  //   label: "Approval Level Template",
  //   icon: <Approval />,
  //   path: "/approval-template",
  // },
  {
    code: "SME_USER",
    label: "Create SME Users",
    icon: <HowToReg />,
    path: "/sme-super-user",
  },
  {
    code: "SME",
    label: "Companies/Individuals",
    icon: <BusinessOutlined />,
    path: "/sme-business-account",
  },
  {
    code: "SME_AP_TEM",
    label: "Approval Level Template",
    icon: <Approval />,
    path: "/approval-template",
  },
  {
    code: "PWD_POLICY",
    label: "Password Policy",
    icon: <Policy />,
    path: "/pass-policy",
  },
  {
    code: "PWD_RESET",
    label: "DF User Password Reset",
    icon: <LockReset />,
    path: "/df-user-pass-reset",
  },
  {
    code: "SME_PWD_RESET",
    label: "SME User Password Reset",
    icon: <LockReset />,
    path: "/sme-user-pass-reset",
  },
  {
    code: "APPROVAL",
    label: "Approval Management",
    icon: <DoneAll />,
    path: "/approver",
  },
  {
    code: "SEC_INBOX",
    label: "Inbox",
    icon: <Mail />,
    path: "/inbox",
  },
];

const reports = [
  {
    code: "DF_USR_RPT",
    label: "DF User Creation",
    path: "/df-user-creation-report",
  },
  {
    code: "SUP_USR_REP",
    label: "DF Super User Creation",
    path: "/super-user-creation-report",
  },
  {
    code: "SUB_USR_REP",
    label: "Sub User Creation/Edit/Delete",
    path: "/sme-sub-user-management-report",
  },
  {
    code: "REG_SME_REP",
    label: "Total Registered Customer",
    path: "/total-registered-customer-report",
  },
  {
    code: "USR_SUM_REP",
    label: "User Summary",
    path: "/user-summary-report",
  },
  {
    code: "SME_PF_REP",
    label: "Company Portfolio",
    path: "/company-portfolio-report",
  },
  {
    code: "TXN_SUM_REP",
    label: "Total Transaction Summary",
    path: "/total-txn-summary-report",
  },
  {
    code: "TXN_DTL_REP",
    label: "Total Transaction",
    path: "/total-txn-report",
  },
  {
    code: "DTL_BIL_REP",
    label: "Detailed Biller",
    path: "/detailed-biller-report",
  },
  {
    code: "DTL_TRAN_REP",
    label: "Detailed Transfer",
    path: "/detailed-transfer-report",
  },
  {
    code: "SAL_FILE_REP",
    label: "Bulk File",
    path: "/bulk-file-report",
  },
  {
    code: "AUDIT_DTL_REP",
    label: "Audit Log",
    path: "/audit-log-report",
  },
];

const Layout = ({ isDrawerOpen, toggleDrawer, onHandleLogout }) => {
//   const dispatch = useDispatch();

//   const { loggedUserSideMenu } = useSelector((state) => state.login);

  const [assignedMenuItems, setAssignedMenuItems] = useState([]);
  const [assignedReportItems, setAssignedReportItems] = useState([]);

//   useEffect(() => {
//     dispatch(getLoggedUserSideMenu());
//   }, [dispatch]);

//   useEffect(() => {
//     if (loggedUserSideMenu && loggedUserSideMenu.length > 0) {
//       let assignedMItems = [];
//       let assignedrpts = [];

//       //check USER obj availablity
//       const isFoundMenus = loggedUserSideMenu.some((element) => {
//         if (element.code == "USER") {
//           return true;
//         }
//         return false;
//       });

//       if (isFoundMenus) {
//         //set assigned menu items
//         let userItems = loggedUserSideMenu.find(
//           (x) => x.code == "USER"
//         )?.menuItems;

//         userItems.forEach((item) => {
//           let obj = menuItems.find((obj) => obj.code === item.code);
//           if (obj) assignedMItems.push(obj);
//         });

//         setAssignedMenuItems(assignedMItems);
//       }

//       //check REPORT obj availablity
//       const isFoundReports = loggedUserSideMenu.some((element) => {
//         if (element.code == "REPORT") {
//           return true;
//         }
//         return false;
//       });

//       if (isFoundReports) {
//         //set assigned reports
//         let reportItems = loggedUserSideMenu.find(
//           (x) => x.code == "REPORT"
//         )?.menuItems;

//         reportItems.forEach((item) => {
//           let obj = reports.find((obj) => obj.code === item.code);
//           if (obj) assignedrpts.push(obj);
//         });

//         setAssignedReportItems(assignedrpts);
//       }
//     }
//   }, [loggedUserSideMenu]);

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
        menuItems={assignedMenuItems}
        reports={assignedReportItems}
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
