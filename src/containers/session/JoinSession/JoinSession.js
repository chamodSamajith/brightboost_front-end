import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import "./JoinSession.css";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { enrollSessionData, getParticipantData, getSessionData } from "../../../services/sessionService";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import SessionLog from "../SessionLog/SessionLog";

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   padding: theme.spacing(1),
  textAlign: 'center',
//   color: theme.palette.text.secondary,
}));
const JoinSession = () => {
    const navigate = useNavigate();
    const [isSessionLogOpen, setIsSessionLogOpen] = useState(false);
    const [sessionid, setSessionId] = useState(new URLSearchParams(window.location.search).get(
        "id"
      ));

      const [sessionData, setSessionData] = useState();
      const [sessionParticipantData, setSessionParticipantData] = useState();


      const openSessionLog = () => {
        setIsSessionLogOpen(true);
      };
    
      const closeSessionLog = () => {
        setIsSessionLogOpen(false);
      };
    useEffect(() => {
        const session_id = new URLSearchParams(window.location.search).get(
            "id"
          );
          console.log(new URLSearchParams(window.location.search))

          if(session_id){
            setSessionId(session_id)
          }

    }, []);


    useEffect(() => {
       
        retrieveSessionData()
        retrieveSessionParticipantsData()
    }, [sessionid]);


    const retrieveSessionData=async()=>{
        console.log("afaf")
        const datas= await getSessionData(sessionid)
       
        if(datas.status==200){
            setSessionData(datas)
            console.log(datas)
        }else{
            toast.error("error retrieving session data")
        }

    }


    const retrieveSessionParticipantsData=async()=>{
        console.log("afaf")
        const datas= await getParticipantData(sessionid)
       
        if(datas.status==200){
            setSessionParticipantData(datas)
            console.log(datas)
        }else{
            toast.error("error retrieving session data")
        }

    }
    const sessionJoinSave=async()=>{
        const userType = sessionStorage.getItem("type")? sessionStorage.getItem("type"):"student"
        const userData = sessionStorage.getItem("user_id")? sessionStorage.getItem("user_id"):"652cdfbdd7819360bcb15ef5"

        let data={}
        if(userType=="student" || userType =="Student"){
            data={
                sessionID:sessionid,
                userId:userData,
                joinTime:new Date(),
                status:1,
                participantRole:"attendee"
            }
        }else{
            data={
                sessionID:sessionid,
                userId:userData,
                joinTime:new Date(),
                status:1,
                participantRole:"host"
            }
        }
         
        const api_response = await enrollSessionData(data)
        if(api_response.status==200){
            toast.success("Successfully joined session")
            navigate('/question-answers?id='+sessionid)   
        }else{
            toast.error("Error joining session")
        }
        

    }

    const formatDate = (unformattedDate) => {
        const date = new Date(unformattedDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

        return formattedDate
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

<SessionLog open={isSessionLogOpen} onClose={closeSessionLog} sessionID={sessionid} />

{sessionData &&     <Grid container spacing={2}>
  <Grid      
    
  item xs={7}>
    <Item style={{boxShadow:"none"}}>
        <div className="session-window">
            <p className="session-conducted">Session Conducted By : {sessionData && sessionData.data.hostUserId && sessionData.data.hostUserId.TutorFName}  {sessionData && sessionData.data.hostUserId && sessionData.data.hostUserId.TutorLName}</p>
            <p className="session-time">Session Time: {sessionData && sessionData.data && formatDate(sessionData.data.startTime)} - {sessionData && sessionData.data && formatDate(sessionData.data.endTime)}</p>
            <p className="session-notes">Special Notes: Have a piece of paper before joining session</p>
        </div>

    </Item>
  </Grid>
  <Grid item xs={5}>
    <Item style={{boxShadow:"none"}}>
      <div>
        <Button onClick={openSessionLog}>View Activity Log</Button>
        <p className="heading1">Ready to Join Session?</p>
        <p className="heading2">{sessionData && sessionData.data.sessionName}</p>
        {sessionParticipantData && sessionParticipantData.isHostJoined &&<p>Host has joined meeting</p>}
        <p className="heading3">{sessionParticipantData && sessionParticipantData.count} members already in the room</p>

        <button className="join-button" onClick={()=>sessionJoinSave()}>Join Now</button>
      </div>

    </Item>
  </Grid>
</Grid>}
    </Box>
  );
};

export default JoinSession;
