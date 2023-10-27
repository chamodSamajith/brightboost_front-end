import React, { useEffect, useState } from "react";
import { Box, Typography, Grid,Button,Dialog,DialogContent,DialogTitle,DialogContentText,DialogActions } from "@mui/material";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { enrollSessionData, getParticipantData, getSessionData, leaveSessionData } from "../../../services/sessionService";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";


const LeaveSession = ({ sessionID }) => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

const leaveActiveSession=async ()=>{
    const userType = sessionStorage.getItem("type")? sessionStorage.getItem("type"):"student"
    const userData = sessionStorage.getItem("user_id")? sessionStorage.getItem("user_id"):"652cdfbdd7819360bcb15ef5"
    let data={}
    if(userType=="student" || userType =="Student"){
        data={
            userId:userData,
            sessionID:sessionID,
            exttimestamp:new Date()
        }
    }else if(userType=="tutor" || userType =="Tutor"){
        data={
            hostId:userData,
            sessionID:sessionID,
            exttimestamp:new Date()
        }
    }

    const api_response = await leaveSessionData(data)
    if(api_response.status==200){
        toast.success("You left session")
        navigate("/session")
    }else{
        toast.error("error leaving session")
    }
}
  return (
    <div>
      <div style={{display:"flex",justifyContent:"end"}}>
  <Button onClick={()=>handleClickOpen()}>Leave Session</Button>
  </div>


  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to end session?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You leaving the session will make you miss all the events happening during the session. Click on agree to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>leaveActiveSession()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  </div>
  );
};

export default LeaveSession;
