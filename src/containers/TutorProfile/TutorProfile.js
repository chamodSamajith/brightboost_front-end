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
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { green, lightGreen, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';


import TextField from '@mui/material/TextField';

import { Schedule } from '@mui/icons-material';

function Album() {
  const [answer, setAnswer] = React.useState('');

  const updateAnswer = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setAnswer(val);
  };


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const [userDataNew, setUserData] = useState({
    TutorFName: 'chamika',
    TutorLName: '',
    TutorAge: '',
    TutorAddress: '',
    TutorEmail: '',
        TutorPhone: '',
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
      TutorFName: userData.data.TutorFName,
      TutorLName: userData.data.TutorLName,
      TutorAge: userData.data.TutorAge,
      TutorAddress: userData.data.TutorAddress,
      TutorEmail: userData.data.TutorEmail,
      TutorPhone: userData.data.TutorPhone,
    });
  }

  


  // Define the API endpoint
  const apiUrl = 'http://localhost:3200/api/questions/';

  // Make an HTTP GET request to the API
  axios.get(apiUrl)
    .then((response) => {
      // If the request is successful, set the data in the state
      setTutorSchedules(response.data);
      console.log("this is data: ",response.data )
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
  

  const navigateToAnswerQuestion =(schedule)=>{
    console.log(schedule);
    const userData = location.state && location.state.userData;

    const apiUrl = 'http://localhost:3200/api/questions/'+schedule._id;
    const data = {
      answer: answer,
    };

    axios
    .put(apiUrl, data)
    .then((response) => {
      // Handle the response here
      console.log('Answer updated successfully:', response.data);
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'Answer Sent!',
        showConfirmButton: false,
        timer: 3500,
      },5000);
      
      window.location.reload();
    })
    .catch((error) => {
      // Handle errors here
      console.error('Error updating answer:', error);
    });




  }
  

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Tutor Profile
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
              {userDataNew.TutorFName} {userDataNew.TutorLName}
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
        <ListItemText primary="Home Address" secondary={userDataNew.TutorAddress} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocalPhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Phone Number" secondary={userDataNew.TutorPhone} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CakeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Age" secondary={userDataNew.TutorAge} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AttachEmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email" secondary={userDataNew.TutorEmail} />
      </ListItem>
    </List>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
              <Button onClick={handleRefreshClick} variant="outlined">Press for the latest Questions by students</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        {loading ? (
        <p>Loading...</p>
      ) : cards.length > 0 ? (
          <Grid container spacing={4}>
            {cards.map((schedule) => (
              <Grid item key={schedule._id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: schedule.status == "Awaing Answer" || schedule.answer == "" ?red[500]: lightGreen[500] }} aria-label="recipe">
            Q
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={schedule.answer == "" ?schedule.status == "Awaing Answer":schedule.status}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://executive.mit.edu/dw/image/v2/BFHZ_PRD/on/demandware.static/-/Sites-master-catalog-msee/default/dwa0897f02/images/QUE.jpg?sw=400&sh=300"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {schedule.question}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <SendIcon onClick ={()=>navigateToAnswerQuestion(schedule)}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>


         

          <TextField
          id="outlined-multiline-static"
          label="Answe here"
          multiline
          rows={4}
          defaultValue={schedule.answer}
          onChange={updateAnswer}
        />



        </CardContent>
      </Collapse>
    </Card>
              </Grid>
            ))}
          </Grid>) : (
        <p>No  questions found.</p>
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