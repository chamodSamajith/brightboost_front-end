import React from "react";
import { Box, Typography } from "@mui/material";

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
         BrigtBoost admin landing page
        </Typography>
      </Box>
    )

  };
  
  export default Admin;
