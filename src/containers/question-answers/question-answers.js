import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LeaveSession from "../session/leaveSession/leaveSession";


const QuestionsAnswers = () => {

    const [sessionid, setSessionId] = useState(new URLSearchParams(window.location.search).get(
        "id"
      ));

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
        <LeaveSession sessionID={sessionid} />
    </Box>
  );
};

export default QuestionsAnswers;
