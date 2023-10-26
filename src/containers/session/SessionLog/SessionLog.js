import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Modal, TextField, Button } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createSessionData, getSessionDetailsData, getSessionUniqueCountData } from "../../../services/sessionService";
import toast from "react-hot-toast";
import './SessionLog.css';

const SessionLog =  ({ open, onClose , sessionID }) =>  {

    const [sessionLog, setsessionLog] = useState();
    const [sessionAtendance, setsessionAtendance] = useState();

    const TabPanel = ({ value, index, children }) => {
        return (
          <div hidden={value !== index}>
            {value === index && children}
          </div>
        );
      };

      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    useEffect(() => {
        getSessionLogs()
        getSessionAttendance()
    }, [sessionID]);

    const getSessionLogs=async()=>{
        const api_response = await getSessionDetailsData(sessionID)
        
        if(api_response.status==200){
            setsessionLog(api_response)
        }
    }

    const getSessionAttendance=async()=>{
        const api_response = await getSessionUniqueCountData(sessionID)
        
        if(api_response.status==200){
            setsessionAtendance(api_response)
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
            height:'90vh',
            transform: `translate(-50%, -50%)`,
          }}>
  

      

            <Tabs value={value} onChange={handleChange}>
          <Tab label="Activity Log" />
          <Tab label="Unique Attendance list" />
        </Tabs>
  
      <TabPanel value={value} index={0}>
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

      </TabPanel>
      <TabPanel value={value} index={1}>
           <h5 style={{padding:"10px"}}>Total Count : {sessionAtendance && sessionAtendance.count}</h5> 

            <table>
          <tr>
    <th>Host Id</th>
    <th>Student ID</th>
    <th>Type</th>
  </tr>
  {sessionAtendance && sessionAtendance.data && sessionAtendance.data.map((values)=>(
  <tr>
  <td>{values.hostId}</td>
  <td>{values.userId}</td>
  <td>{values.participantRole}</td>
</tr>
  ))}

            </table>
      </TabPanel>

        </div>

        </Modal>
      );
};

export default SessionLog;