import React, { useState ,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function Questions() {
  const location = useLocation();
   

    const [sessionID, setsessionID] = useState('');
    const [TutorID, setTutorID] = useState('');
    const [Question, setQuestion] = useState('');
    const [Answer, setAnswer] = useState('');
    const [status, setstatus] = useState('');
    const [subject, setsubject] = useState('');
    const [studentId, setstudentId] = useState('');

    const updateQuestion = (event) => {
      event.preventDefault();
      const val = event.target.value;
      setQuestion(val);
    };
    

    useEffect(() => {
      const qdetails = location.state && location.state.sessionData;
      const stu = location.state && location.state.studentemail;
      const value = localStorage.getItem('email');
      setsessionID(qdetails._id);
      setTutorID('653a9c74b624c419478bb73f');
      setsubject(qdetails.sessionSubject);
      setstudentId(value);

      

  
      
    }, []); 

    
   

    

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const Qbody = {
        question:Question ,
        subjectId: subject,
        tutorId: TutorID,
        studentId: studentId,
        sessionId: sessionID,
        answer:"NOT ANSWERED!",
        status: "Awaing Answer"
      };
    
      console.log("body: " + JSON.stringify(Qbody));
    
      axios({
        method: 'POST',
        url: 'http://localhost:3200/api/questions/create',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: Qbody,
      })
        .then((response) => {
          console.log('Arrived at login request');
          if (response.status === 200) {
            console.log('this is resData status ' + response.data.messageCode);
            if (response.data.messageCode === 1000) {
              Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Question Sent Successfully!',
                showConfirmButton: false,
                timer: 3500,
              });
            }
          }
          console.log("success!");
          window.location.replace('http://localhost:3000/StudentQuestions/?email='+studentId);
        })
        .catch(() => console.log('ISSUES!'));
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                          Ask Your Question
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Tutor"
                                    label="Tutor"
                                    name="TutorAge"
                                    value="Darren Ross"
                                    // ßonChange={(e) => updateTutorData('TutorAge', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="SessionSubject"
                                    label="Subject"
                                    name="SessionSubject"
                                    value={subject}
                                   
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="question"
                                    label="Question"
                                    name="question"
                                    value={Question}
                                    onChange={updateQuestion}
                                />
                            </Grid>
                           
                            
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send
                        </Button>
                        
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}