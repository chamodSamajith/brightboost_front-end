import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CakeIcon from '@mui/icons-material/Cake';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Album() {
  const [userDataNew, setUserData] = useState({
    StudentFName: 'chamika',
        StudentLName: '',
        StudentAge: '',
        StudentAddress: '',
        StudentEmail: '',
        StudentPhone: '',
  });
  const [tutorSchedules, setTutorSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log('Component mounted! This is like componentDidMount.');

   
  const userData = location.state && location.state.userData;

  console.log("data from : ", userData.data.StudentFName)
  if (userData) {
    // Update userDataNew with userData
    setUserData({
      ...userDataNew,
      StudentFName: userData.data.StudentFName,
      StudentLName: userData.data.StudentLName,
      StudentAge: userData.data.StudentAge,
      StudentAddress: userData.data.StudentAddress,
      StudentEmail: userData.data.StudentEmail,
      StudentPhone: userData.data.StudentPhone,
    });
  }

  


  // Define the API endpoint
  const apiUrl = 'http://localhost:3200/api/session/all';

  // Make an HTTP GET request to the API
  axios.get(apiUrl)
    .then((response) => {
      // If the request is successful, set the data in the state
      setTutorSchedules(response.data.data);
      console.log("this is data: ",response.data.data )
      setLoading(false); 
    })
    .catch((error) => {
      // Handle any errors here
      console.error('Error fetching data:', error);
    });

    
  }, []); // An empty dependency array means this effect runs only once, on component mount


  const cards = tutorSchedules;
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const handleRefreshClick = () => {
    // Reload the current page
    window.location.reload();
  };
  const navigateToSession = (id)=>{
    window.location.replace('http://localhost:3000/join-session/?id='+id);
    //window.location.replace('http://localhost:3000/login');
  };

  const navigateToAskQuestion =(schedule)=>{
    console.log(schedule);
    const userData = location.state && location.state.userData;
    navigate('/question-answers', { state: { sessionData: schedule, studentemail: userDataNew.StudentEmail} });
    localStorage.setItem('email', userDataNew.StudentEmail);
  }
  

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Student Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {userDataNew.StudentFName} {userDataNew.StudentLName}
            </Typography>
            <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Home Address" secondary={userDataNew.StudentAddress} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocalPhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Phone Number" secondary={userDataNew.StudentPhone} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CakeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Age" secondary={userDataNew.StudentAge} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AttachEmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email" secondary={userDataNew.StudentEmail} />
      </ListItem>
    </List>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
              <Button onClick={handleRefreshClick} variant="outlined">Press for the latest Sessions</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        {loading ? (
        <p>Loading...</p>
      ) : tutorSchedules.length > 0 ? (
          <Grid container spacing={4}>
            {tutorSchedules.map((schedule) => (
              <Grid item key={schedule._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://media.istockphoto.com/id/1361844238/photo/high-school-professor-assisting-her-students-in-e-learning-on-laptop-in-the-classroom.jpg?s=612x612&w=0&k=20&c=RUI6d64h2mszvH2CicmeSCp_sZowN1p81dtuctGIaRM="
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {schedule.sessionSubject} - {schedule.sessionName}
                    </Typography>
                    <Typography>
                      Conducted by:  {schedule.TutorName? schedule.TutorName :"Darren Ross"} </Typography>
                      <Typography>  Start Time:  {schedule.startTime} </Typography>
                      <Typography>   End Time: {schedule.endTime} </Typography>
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>navigateToSession(schedule._id)} >Attend</Button>
                    <Button size="small"onClick={()=>navigateToAskQuestion(schedule)}>My Questions</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>) : (
        <p>No tutor schedules found.</p>
      )}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Album;