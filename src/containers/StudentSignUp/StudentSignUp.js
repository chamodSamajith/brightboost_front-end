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

    const [studentData, setStudentData] = useState({
        StudentFName: '',
        StudentLName: '',
        StudentAge: '',
        StudentAddress: '',
        StudentEmail: '',
        StudentPhone: '',
        StudentPassword: '',
        allowExtraEmails: false,
    });

    const updateStudentData = (key, value) => {
        setStudentData({
            ...studentData,
            [key]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3200/api/users/create', studentData);
            

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
                                    name="StudentFName"
                                    required
                                    fullWidth
                                    id="StudentFName"
                                    label="First Name"
                                    autoFocus
                                    value={studentData.StudentFName}
                                    onChange={(e) => updateStudentData('StudentFName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="StudentLName"
                                    label="Last Name"
                                    name="StudentLName"
                                    autoComplete="family-name"
                                    value={studentData.StudentLName}
                                    onChange={(e) => updateStudentData('StudentLName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="StudentAge"
                                    label="Age"
                                    name="StudentAge"
                                    value={studentData.StudentAge}
                                    onChange={(e) => updateStudentData('StudentAge', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="StudentAddress"
                                    label="Address"
                                    name="StudentAddress"
                                    value={studentData.StudentAddress}
                                    onChange={(e) => updateStudentData('StudentAddress', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="StudentEmail"
                                    label="Email Address"
                                    name="StudentEmail"
                                    autoComplete="email"
                                    value={studentData.StudentEmail}
                                    onChange={(e) => updateStudentData('StudentEmail', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="StudentPhone"
                                    label="Phone"
                                    type="text"
                                    value={studentData.StudentPhone}
                                    onChange={(e) => updateStudentData('StudentPhone', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="StudentPassword"
                                    label="Password"
                                    type="password"
                                    value={studentData.StudentPassword}
                                    onChange={(e) => updateStudentData('StudentPassword', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox name="allowExtraEmails" color="primary" checked={studentData.allowExtraEmails} onChange={(e) => updateStudentData('allowExtraEmails', e.target.checked)} />}
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
                                <Link href="/" variant="body2">
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