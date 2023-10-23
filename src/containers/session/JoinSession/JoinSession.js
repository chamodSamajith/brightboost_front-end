import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import "./JoinSession.css";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   padding: theme.spacing(1),
  textAlign: 'center',
//   color: theme.palette.text.secondary,
}));
const JoinSession = () => {

    const [sessionid, setSessionId] = useState(new URLSearchParams(window.location.search).get(
        "id"
      ));

    useEffect(() => {
        const session_id = new URLSearchParams(window.location.search).get(
            "id"
          );

          if(session_id){
            setSessionId(session_id)
          }

    }, []);

    const sessionJoinSave=()=>{
        const data={
            sessionID:sessionid,
            userId:"1",
            joinTime:new Date(),
            participantRole:"attendee"
        }


    }


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
     <Grid container spacing={2}>
  <Grid      
    
  item xs={7}>
    <Item style={{boxShadow:"none"}}>
        <div className="session-window">
            <p className="session-conducted">Session Conducted By : Uthpala Samarakoon</p>
            <p className="session-time">Session Time: 01.00pm - 02.00pm</p>
            <p className="session-notes">Special Notes: Have a piece of paper before joining session</p>
        </div>

    </Item>
  </Grid>
  <Grid item xs={5}>
    <Item style={{boxShadow:"none"}}>
      <div>
        <p className="heading1">Ready to Join Session?</p>
        <p className="heading2">Geography Session</p>
        <p className="heading3">500 members already in the room</p>

        <button className="join-button">Join Now</button>
      </div>

    </Item>
  </Grid>
</Grid>
    </Box>
  );
};

export default JoinSession;
