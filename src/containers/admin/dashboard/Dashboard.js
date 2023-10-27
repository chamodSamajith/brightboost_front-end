import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chart from './Chart';
import TotalQuestions from './TotalQuestions';
import {useEffect, useState} from "react";
import axios from "axios";
import ReportPDF from "../reportPDF/reportPDF";

function Copyright(props) {
    return (<Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>);
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const defaultTheme = createTheme();

// CustomizableTable columns
const columnData = [
    "Question ID",
    "Question",
    "Answer",
    "Comment",
    "Subject ID",
    "Tutor ID",
    "Student ID",
    "Session ID"
];

const columnWidths = [60, 60, 60, 60, 60, 60, 60, 60];

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Define the state variables for filtering
    const [questions, setQuestions] = useState([]);

    const [sessions, setSessions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [students, setStudents] = useState([]);
    const [questionsCountBySubject, setQuestionsCountBySubject] = useState([])

    const [sessionFilter, setSessionFilter] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('');
    const [tutorFilter, setTutorFilter] = useState('');
    const [studentFilter, setStudentFilter] = useState('');

    // Define the state variable for storing the filtered data
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        // Define the API endpoints you want to fetch
        const apiEndpoints = [
            'http://localhost:3200/api/questions',
            'http://localhost:3200/api/users',
            'http://localhost:3200/api/tutors',
            'http://localhost:3200/api/subjects',
            'http://localhost:3200/api/questions/questions-count-by-subject'
        ];

        // Use Promise.all to fetch data from multiple endpoints in parallel
        Promise.all(apiEndpoints.map((endpoint) => axios
            .get(endpoint)
            .then((response) => response.data)
            .catch((error) => {
                console.error(`Error fetching data from ${endpoint}:`, error);
                return [];
            })))
            .then(([questionsData,
                       studentData,
                       tutorData,
                       subjectData,
                        questionsCountBySubject
                       ]) => {
                setQuestions(questionsData);
                setFilteredQuestions(questionsData);
                setStudents(studentData);
                setTutors(tutorData);
                setSubjects(subjectData);
                setQuestionsCountBySubject(questionsCountBySubject)
            });

        // Make an API request to your server to fetch sessions from MongoDB
        axios.get('http://localhost:3200/api/session/all')
            .then((response) => {
                setSessions(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching sessions:', error);
            });
    }, []);

    useEffect(() => {
        // Filter questions based on selected filters
        const filtered = questions.filter((question) => {
            return ((!sessionFilter || question.sessionId === sessionFilter) &&
                (!subjectFilter || question.subjectId === subjectFilter) &&
                (!tutorFilter || question.tutorId === tutorFilter) &&
                (!studentFilter || question.studentId === studentFilter));
        });

        // If no filters are selected, show all questions
        const filteredQuestions = (sessionFilter || subjectFilter || tutorFilter || studentFilter) ? filtered : questions;

        setFilteredQuestions(filteredQuestions);
    }, [sessionFilter, subjectFilter, tutorFilter, studentFilter]);

    return (<ThemeProvider theme={defaultTheme}>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px', ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2, display: 'flex', flexDirection: 'column', height: 240,
                                }}
                            >
                                <Chart questionsCountBySubject={questionsCountBySubject}/>
                            </Paper>
                        </Grid>
                        {/* Total Questions */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2, display: 'flex', flexDirection: 'column', height: 240,
                                }}
                            >
                                <TotalQuestions totalQuestions={questions.length}/>
                            </Paper>
                        </Grid>
                        {/* Recent CustomizableTable */}
                        <Grid item xs={12}>
                            <select
                                onChange={(e) => setSessionFilter(e.target.value)}
                                value={sessionFilter}
                            >
                                <option value="">All Sessions</option>
                                {sessions.map((session) => (
                                    <option value={session._id}> {session.sessionName} </option>))}
                            </select>

                            <select
                                onChange={(e) => setSubjectFilter(e.target.value)}
                                value={subjectFilter}
                            >
                                <option value="">All Subjects</option>
                                {/* Populate with subject options */}
                                {subjects.map((subject) => (
                                    <option value={subject._id}> {subject.subjectName} </option>))}
                            </select>

                            <select
                                onChange={(e) => setTutorFilter(e.target.value)}
                                value={tutorFilter}
                            >
                                <option value="">All Tutors</option>
                                {/* Populate with tutor options */}
                                {tutors.map((tutor) => (<option
                                    value={tutor._id}> {`${tutor.TutorFName} ${tutor.TutorLName}`} </option>))}
                            </select>

                            <select
                                onChange={(e) => setStudentFilter(e.target.value)}
                                value={studentFilter}
                            >
                                <option value="">All Students</option>
                                {/* Populate with student options */}
                                {students.map((student) => (<option
                                    value={student._id}> {`${student.StudentFName} ${student.StudentLName}`} </option>))}
                            </select>
                            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                {/*<CustomizableTable rows={filteredQuestions} columns={columnData}/>*/}
                                <ReportPDF rows={filteredQuestions} columns={columnData} columnWidths={columnWidths}/>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{pt: 4}}/>
                </Container>
            </Box>
        </Box>
    </ThemeProvider>);
}
