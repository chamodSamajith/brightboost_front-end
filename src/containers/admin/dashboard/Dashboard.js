import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import CustomizableTable from './CustomizableTable';
import {useEffect, useState} from "react";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

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

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Define the state variables for filtering
  const [questions, setQuestions] = useState([]);
  const [sessionFilter, setSessionFilter] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState([]);
  const [tutorFilter, setTutorFilter] = useState([]);
  const [studentFilter, setStudentFilter] = useState([]);

  // Define the state variable for storing the filtered data
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  // useEffect(() => {
  //   // Make an API request to your server to fetch questions from MongoDB
  //   axios.get('http://localhost:3200/api/questions')
  //       .then((response) => {
  //         setQuestions(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching questions:', error);
  //       });
  //
  //   // Make an API request to your server to fetch students from MongoDB
  //   axios.get('http://localhost:3200/api/users')
  //       .then((response) => {
  //         setStudentFilter(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching users:', error);
  //       });
  //
  //   // Make an API request to your server to fetch tutors from MongoDB
  //   axios.get('http://localhost:3200/api/tutors')
  //       .then((response) => {
  //         setTutorFilter(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching tutors:', error);
  //       });
  //
  //   // Make an API request to your server to fetch subjects from MongoDB
  //   axios.get('http://localhost:3200/api/subjects')
  //       .then((response) => {
  //         setSubjectFilter(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching subjects:', error);
  //       });
  //
  //   // Make an API request to your server to fetch sessions from MongoDB
  //   axios.get('http://localhost:3200/api/session/all')
  //       .then((response) => {
  //         setSessionFilter(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching sessions:', error);
  //     });
  // }, []);

    useEffect(() => {
        // Define the API endpoints you want to fetch
        const apiEndpoints = [
            'http://localhost:3200/api/questions',
            'http://localhost:3200/api/users',
            'http://localhost:3200/api/tutors',
            'http://localhost:3200/api/subjects',
            'http://localhost:3200/api/session/all',
        ];

        // Use Promise.all to fetch data from multiple endpoints in parallel
        Promise.all(
            apiEndpoints.map((endpoint) =>
                axios
                    .get(endpoint)
                    .then((response) => response.data)
                    .catch((error) => {
                        console.error(`Error fetching data from ${endpoint}:`, error);
                        return [];
                    })
            )
        )
            .then(([questionsData, studentData, tutorData, subjectData, sessionData]) => {
                setQuestions(questionsData);
                setStudentFilter(studentData);
                setTutorFilter(tutorData);
                setSubjectFilter(subjectData);
                setSessionFilter(sessionData);
            });
    }, []);


    useEffect(() => {
    // Filter questions based on selected filters
    const filtered = questions.filter((question) => {
      return (
          (!sessionFilter || question.sessionId === sessionFilter) &&
          (!subjectFilter || question.subjectId === subjectFilter) &&
          (!tutorFilter || question.tutorId === tutorFilter) &&
          (!studentFilter || question.studentId === studentFilter)
      );
    });

    setFilteredQuestions(filtered);
  }, [sessionFilter, subjectFilter, tutorFilter, studentFilter]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent CustomizableTable */}
              <Grid item xs={12}>
                <select
                    onChange={(e) => setSessionFilter(e.target.value)}
                    value={sessionFilter}
                >
                  <option value="">All Sessions</option>
                  {/* Populate with session options */}
                </select>

                <select
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    value={subjectFilter}
                >
                  <option value="">All Subjects</option>
                  {/* Populate with subject options */}
                  {subjectFilter.map((subject) => (
                    <option value={subject.subjectName}> {subject.subjectName} </option>
                  ))}
                </select>

                <select
                    onChange={(e) => setTutorFilter(e.target.value)}
                    value={tutorFilter}
                >
                  <option value="">All Tutors</option>
                  {/* Populate with tutor options */}
                    {tutorFilter.map((tutor) => (
                        <option value={`${tutor.TutorFName} ${tutor.TutorLName}`}> {`${tutor.TutorFName} ${tutor.TutorLName}`} </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setStudentFilter(e.target.value)}
                    value={studentFilter}
                >
                  <option value="">All Students</option>
                  {/* Populate with student options */}
                </select>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CustomizableTable rows={questions} columns={columnData} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
