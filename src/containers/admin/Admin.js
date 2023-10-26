import React from "react";
import { Box, Typography } from "@mui/material";
import Statistics from "./statistics/statistics";
import Dashboard from './dashboard/Dashboard';
const Admin = () => {

    return (
        <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography align="center" variant="h5">
            <Dashboard/>
            {/*<QuestionTable/>*/}
        </Typography>
      </Box>
    )

  };
  
  export default Admin;
