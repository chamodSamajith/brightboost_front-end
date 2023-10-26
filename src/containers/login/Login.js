
 import { useNavigate } from 'react-router-dom'; 
 import Avatar from '@mui/material/Avatar';
 import Button from '@mui/material/Button';
 import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
 import Typography from '@mui/material/Typography';
 import { createTheme, ThemeProvider } from '@mui/material/styles';
 import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';

import { Navigate } from 'react-router-dom';

 import useAuth from "../../hooks/useAuth"

 function Copyright(props) {
   return (
     <Typography variant="body2" color="text.secondary" align="center" {...props}>
       {'Copyright © '}
       <Link color="inherit" href="https://mui.com/">
         BrightBoost Log
       </Link>{' '}
       {new Date().getFullYear()}
       {'.'}
    </Typography>
  );
}
 const defaultTheme = createTheme();

 const Login = () => {


  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [resData, setResData] = useState('');

  const [user, setUser] = React.useState(''); 

  const handleRadioChange = (event) => {
    setUser(event.target.value);
  };

  const updateUsername = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setStudentEmail(val);
  };

  const updatePassword = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setStudentPassword(val);
  };

   const navigate = useNavigate();

   const handleUser = (event) => {
    event.preventDefault();

    if (user === 'best') {
    } else if (user === 'worst') {
    } else {
    }
  };

   const handleSubmit = (event) => {


    event.preventDefault();
    const loginBody = JSON.stringify({
      StudentEmail: studentEmail,
      StudentPassword: studentPassword,
    });
if(user =='Student'){

  console.log("stydent")
  axios({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'POST',
    url: 'http://localhost:3200/api/users/studentLogin',
    data: loginBody,
  })
    .then((response) => {
      console.log('Arrived to login request');
      if (response.status === 200) {
        setResData(response.data);
        console.log('this is resData status ' + resData.messageCode);
        if (resData.messageCode === '1000') {
          setLoggedin(true);
          window.sessionStorage.setItem("IsLoggedIn", true);
           navigate('/Dashboard')
          Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'User Login Successful !',
            showConfirmButton: false,
            timer: 3500,
          });
        }
        console.log('this is login status 2 ' + loggedin);
      }
    })
    .then(console.log(
      "success!"
    ))
    .catch(() => console.log('ISSUES !'));
    
    

}
else{
  const loginBodyTut = JSON.stringify({
    TutorEmail: studentEmail,
    TutorPassword: studentPassword,
  });
  console.log("tutor type")
  axios({
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'POST',
    url: 'http://localhost:3200/api/tutors/tutorLogin',
    data: loginBodyTut,
  })
    .then((response) => {
      console.log('Arrived to login request');
      if (response.status === 200) {
        setResData(response.data);
        console.log('this is resData status ' + resData.messageCode);
        if (resData.messageCode === '1000') {
          setLoggedin(true);
          window.sessionStorage.setItem("IsLoggedIn", true);
           navigate('/Dashboard')
          Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'User Login Successful !',
            showConfirmButton: false,
            timer: 3500,
          });
        }
        console.log('this is login status 2 ' + loggedin);
      }
    })
    .then(console.log(
      "success!"
    ))
    .catch(() => console.log('ISSUES !'));
}

    




    

   };

   return (
 <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
               alignItems: 'center',
             }}
           >
           <h4>BeightBoost Admin</h4>
             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               <LockOutlinedIcon />
             </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div>
            
            <form onSubmit={handleUser}>
      <FormControl sx={{ m: 3 }}  variant="standard">
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={user}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="Student" control={<Radio />} label="Student" />
          <FormControlLabel value="Tutor" control={<Radio />} label="Tutor" />
        </RadioGroup>
      </FormControl>
    </form>
    </div>         <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={updateUsername}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={updatePassword}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
export default Login