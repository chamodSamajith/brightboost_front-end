import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Modal, TextField, Button } from "@mui/material";


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createSessionData, getSessionDetailsData } from "../../../services/sessionService";
import toast from "react-hot-toast";
import './SessionLog.css';

const SessionLog =  ({ open, onClose , sessionID }) =>  {

    const [sessionLog, setsessionLog] = useState();
    
    useEffect(() => {
        getSessionLogs()

    }, [sessionID]);

    const getSessionLogs=async()=>{
        const api_response = await getSessionDetailsData(sessionID)
        
        if(api_response.status==200){
            setsessionLog(api_response)
        }
    }


    return (
        <Modal open={open} onClose={onClose}>


        <div style={{
            position: 'absolute',
            width: '600px',
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: 5,
            padding: 16,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}>
  
            <table>
          <tr>
    <th>Event Type</th>
    <th>Event data</th>
    <th>Time Stamp</th>
  </tr>
  {sessionLog && sessionLog.data && sessionLog.data.map((values)=>(
  <tr>
  <td>{values.eventType}</td>
  <td>{values.eventData}</td>
  <td>{values.timestamp}</td>
</tr>
  ))}

            </table>

      
        </div>

        </Modal>
      );
};

export default SessionLog;
