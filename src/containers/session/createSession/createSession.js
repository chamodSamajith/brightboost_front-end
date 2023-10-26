import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Modal, TextField, Button, Select, MenuItem, InputLabel,FormControl  } from "@mui/material";
import "./createSession.css";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createSessionData } from "../../../services/sessionService";
import toast from "react-hot-toast";

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   padding: theme.spacing(1),
  textAlign: 'center',
//   color: theme.palette.text.secondary,
}));
const CreateSession =  ({ open, onClose , getSessions }) => {

    const [sessionName, setsessionName] = useState();
    const [sessionTutor, setsessionTutor] = useState();
    const [sessionStart, setsessionStart] = useState();
    const [sessionEnd, setsessionEnd] = useState();
    const [sessionSubject, setsessionSubject] = useState();
    const [maxParticipants, setmaxParticipants] = useState();
    const [teachers, setTeachers] = useState([{_id:"652ce16cd7819360bcb15ef8",tutorName:"Chamika Visal"}]);
    const [subjects, setSubjects] = useState([{_id:"652cf021622b1cfef18e3e44",subjectName:"History"},{_id:"652cf021622b1cfef18e3e44",subjectName:"IT"},{_id:"652cf021622b1cfef18e3e44",subjectName:"Geography"},{_id:"652cf021622b1cfef18e3e44",subjectName:"Maths"}]);

    // useEffect(() => {


    // }, []);

    const sessionCreateSave=async()=>{
        const data={
            userId:"652cefdb622b1cfef18e3e41",
            sessionName:sessionName,
            startTime:sessionStart,
            endTime:sessionEnd,
            status:1,
            maximumParticipants:maxParticipants,
            subject:sessionSubject
        }

        const api_response=await createSessionData(data);
        if(api_response.status==200){
            toast.success("successfully created session")
            onClose()
            getSessions()
        }else{
            toast.error("error creating session")
        }
        

       

        
    }


    return (
        <Modal open={open} onClose={onClose}>
          <div style={{
            position: 'absolute',
            width: 400,
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: 5,
            padding: 16,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}>
       

          <form>
            <h2>Create Session</h2>
            <div>
          <TextField style={{width:'100%'}}  value={sessionName} onChange={(e)=>setsessionName(e.target.value)} id="standard-basic" label="Session Name" variant="standard" />
          </div>

          <div>
          <TextField value={sessionTutor} onChange={(e)=>setsessionTutor(e.target.value)} style={{width:'100%'}}  helperText="Please select tutor" select id="standard-basic" label="Pick Tutor" variant="standard" >

          {teachers && teachers.map((option) => (
            <option key={option._id} value={option._id}>
              {option.tutorName}
            </option>
          ))}
          </TextField>
          </div>

          <div>
          <TextField value={sessionStart} onChange={(e)=>setsessionStart(e.target.value)} style={{width:'100%'}} type="datetime-local" id="standard-basic" label="Start Time" helperText="Start Time" variant="standard" />
          </div>

          <div>
          <TextField style={{width:'100%'}}  value={sessionEnd} onChange={(e)=>setsessionEnd(e.target.value)} id="standard-basic" type="datetime-local" label="End Time" helperText="End Time" variant="standard" />
          </div>

<div>
<FormControl variant="standard"   style={{width:"100%"}}>
<InputLabel id="demo-simple-select-label">Session Subject</InputLabel>
  <Select

    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sessionSubject}
    label="Age"
    onChange={(e)=>setsessionSubject(e.target.value)}
  >
    {subjects && subjects.map((option) => (
<MenuItem value={option.subjectName}>{option.subjectName}</MenuItem>
))}
    
  </Select>


          {/* <TextField value={sessionSubject} onChange={(e)=>setsessionSubject(e.target.value)} style={{width:'100%'}}  helperText="Please select subject" select id="standard-basic" label="Pick subject" variant="standard" >

{subjects && subjects.map((option) => (
  <option key={option.subjectName} value={option.subjectName}>
    {option.subjectName}
  </option>
))}
</TextField> */}
</FormControl>
</div>
          <div>
          <TextField style={{width:'100%'}}  value={maxParticipants} onChange={(e)=>setmaxParticipants(e.target.value)}  type="number" id="standard-basic" label="Maximum Participants" variant="standard" />
          </div>



            <div className="btn-submit">
            <Button style={{marginRight:"5px"}} variant="outlined" onClick={()=>onClose()}>Close</Button>

            <Button variant="contained" onClick={()=>sessionCreateSave()}>Create Session</Button>
            </div>
          </form>


          </div>
        </Modal>
      );
};

export default CreateSession;
