import React, { useState } from 'react';
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

import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();

    const [tutorData, setTutorData] = useState({
        TutorFName: '',
        TutorLName: '',
        TutorAge: '',
        TutorAddress: '',
        TutorEmail: '',
        TutorPassword: '',
        TutorPhone: '',
    });

    const updateTutorData = (key, value) => {
        setTutorData({
            ...tutorData,
            [key]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3200/api/tutors/create', tutorData);
            

            console.log('this is resData status ' + response.data);
            console.log("before");
            if (response.data && response.data.messageCode === 1000) {
                console.log("after");
                navigate('/Dashboard');
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: 'User Registration Successful !',
                    showConfirmButton: false,
                    timer: 3500,
                });
            }
        } catch (error) {
            console.error('API Error:', error);
        }
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
                        Sign up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="TutorFName"
                                    required
                                    fullWidth
                                    id="TutorFName"
                                    label="First Name"
                                    autoFocus
                                    value={tutorData.TutorFName}
                                    onChange={(e) => updateTutorData('TutorFName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="TutorLName"
                                    label="Last Name"
                                    name="TutorLName"
                                    autoComplete="family-name"
                                    value={tutorData.TutorLName}
                                    onChange={(e) => updateTutorData('TutorLName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="TutorAge"
                                    label="Age"
                                    name="TutorAge"
                                    value={tutorData.TutorAge}
                                    onChange={(e) => updateTutorData('TutorAge', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="TutorAddress"
                                    label="Address"
                                    name="TutorAddress"
                                    value={tutorData.TutorAddress}
                                    onChange={(e) => updateTutorData('TutorAddress', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="TutorEmail"
                                    label="Email Address"
                                    name="TutorEmail"
                                    autoComplete="email"
                                    value={tutorData.StudentEmail}
                                    onChange={(e) => updateTutorData('TutorEmail', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="TutorPhone"
                                    label="TutorPhone"
                                    type="text"
                                    value={tutorData.TutorPhone}
                                    onChange={(e) => updateTutorData('TutorPhone', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="TutorPassword"
                                    label="TutorPassword"
                                    type="password"
                                    value={tutorData.TutorPassword}
                                    onChange={(e) => updateTutorData('TutorPassword', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox name="allowExtraEmails" color="primary" checked={tutorData.allowExtraEmails} onChange={(e) => updateTutorData('allowExtraEmails', e.target.checked)} />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}