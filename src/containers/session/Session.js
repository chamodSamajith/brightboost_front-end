import React ,{useEffect, useState} from "react";
import { Box, Typography, Button } from "@mui/material";
import CreateSession from '../session/createSession/createSession.js';
import { getAllSessionData } from "../../services/sessionService.js";
import { useNavigate } from "react-router";
import "./session.css";
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
{sessionStorage.getItem("type")!="student" && <div style={{display:"flex",justifyContent:"end",paddingBottom:"20px"}}>
       <Button variant="contained" onClick={handleOpenModal}>
        Create Session
      </Button>
      </div>}

<div style={{display:"flex"}}>
      <div style={{width:"50%"}}>
      <h2 style={{textAlign:"center"}}>Available Sessions</h2>
        {sessionData && sessionData.data && sessionData.data.map((values)=>(
          <div style={{display:'flex',cursor:"pointer"}}>
            <div  onClick={()=>navigateSession(values._id)} className="list">
            <p className="txt-style"> {values.sessionName}</p>
           </div>
           </div>
        ))
       
        }
       
       </div>

       <div style={{width:"50%"}}>

        <img className="img-style" src="https://olc-wordpress-assets.s3.amazonaws.com/uploads/2020/03/Online-teaching-class-header.png" />
       </div>
       </div>
      <CreateSession open={isModalOpen} onClose={handleCloseModal} getSessions={sessionRetrieve}/>
    </Box>
  );
};

export default Session;
