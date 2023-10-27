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

import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { green, lightGreen, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useNavigate } from 'react-router-dom';
import { Schedule } from '@mui/icons-material';
import LeaveSession from '../session/leaveSession/leaveSession';

function Album() {
  const [sessionid, setSessionId] = useState(new URLSearchParams(window.location.search).get(
    "id"
  ));
  const [userDataNew, setUserData] = useState({
  });
  
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const defaultTheme = createTheme();
  useEffect(() => {
    const value = localStorage.getItem('email');
    console.log('valieeeeee'+ value)

  


  // Define the API endpoint
  const apiUrl = 'http://localhost:3200/api/questions/'+value;
  console.log(apiUrl +"url")

  // Make an HTTP GET request to the API
  axios.get(apiUrl)
    .then((response) => {
      // If the request is successful, set the data in the state
      setUserData(response.data.questions);
      console.log("this is data: ",response.data.questions )
      setLoading(false); 
    })
    .catch((error) => {
      // Handle any errors here
      console.error('Error fetching data:', error);
    });

    
  }, []); // An empty dependency array means this effect runs only once, on component mount


  const cards = userDataNew;
//   const navigate = useNavigate();
//   const defaultTheme = createTheme();
//   const handleRefreshClick = () => {
//     // Reload the current page
//     window.location.reload();
//   };
//   const navigateToSession = (id)=>{
//     window.location.replace('http://localhost:3000/join-session/?id='+id);
//     //window.location.replace('http://localhost:3000/login');
//   };

//   const navigateToAskQuestion =(schedule)=>{
//     console.log(schedule);
//     const userData = location.state && location.state.userData;
//     navigate('/question-answers', { state: { sessionData: schedule, studentemail: userDataNew.StudentEmail} });
//     console.log("stud email: "+userDataNew.StudentEmail)
//     localStorage.setItem('email', userDataNew.StudentEmail);
//   }


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
  
  

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Student Questions
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}

        <LeaveSession sessionID={sessionid}/>
    
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
          <Avatar sx={{ bgcolor: schedule.status == "Awaing Answer"?red[500]: lightGreen[500] }} aria-label="recipe">
            Q
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={schedule.status}
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
          <FavoriteIcon />
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
          <Typography paragraph>
          {schedule.answer}
          </Typography>
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