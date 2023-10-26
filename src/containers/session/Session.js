import React ,{useEffect, useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import CreateSession from '../session/createSession/createSession.js';
import { getAllSessionData } from "../../services/sessionService.js";
import { useNavigate } from "react-router";
const Session = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionData, setSessionData] = useState();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sessionRetrieve=async()=>{

    const api_response= await getAllSessionData()

    if(api_response.status==200){
      setSessionData(api_response)
    }
  }

  const navigateSession=(sessionId)=>{
      navigate('/join-session/?id='+sessionId)
  }

  useEffect(() => {
    sessionRetrieve()

  }, []);
  return (
    <Box
      sx={{
        height: "100%",

      }}
    >
      <div style={{display:"flex",justifyContent:"end"}}>
       <Button variant="contained" onClick={handleOpenModal}>
        Create Session
      </Button>
      </div>
<h2>Session get</h2>
      
        {sessionData && sessionData.data && sessionData.data.map((values)=>(
          <div style={{display:'flex'}}>
           <Button onClick={()=>navigateSession(values._id)}>{values.sessionName}</Button>
           </div>
        ))
       
        }
       
    

      <CreateSession open={isModalOpen} onClose={handleCloseModal} getSessions={sessionRetrieve}/>
    </Box>
  );
};

export default Session;
