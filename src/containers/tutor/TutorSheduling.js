import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import toast from 'react-hot-toast';

const TutorSheduling = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [tutorDetails, setTutorDetails] = useState([]);
  const [showTutors, setShowTutors] = useState(false);
  const [noTutorsAvailable,setNoTutorAvailable]=useState(true);

  const columns = [
    {
      name: 'Session Name',
      selector: (row) => row.sessionName,
    },
    {
        name: 'Session Subject',
        selector: (row) => row.sessionSubject,
      },
    {
      name: 'Start Time',
      selector: (row) => row.startTime,
    },
    {
      name: 'End Time',
      selector: (row) => row.endTime,
    },
  ];

  const fetchSessionData = async () => {
    try {
      const response = await axios.get('http://localhost:3200/api/session/all');
      setData(response.data.data);
      console.log("data0,",response.data.data)
    } catch (error) {
      console.error('Error fetching session data', error);
    }
  };

  const fetchTutorDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3200/api/tutordetails/getAll');
      setTutorDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching tutor details', error);
    }
  };

  useEffect(() => {
      // Call fetchSessionData when the component is loaded
    fetchSessionData();
     // Call fetchTutorDetails when the component is loaded
     fetchTutorDetails();
  }, []);

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    setShowTutors(false); // Hide tutors when a new session is selected
  };

  const formatDateTime = (dateTimeString) => {
    const isTimeAM = dateTimeString.includes('AM');
    const formattedTime = dateTimeString.replace('AM', '').replace('PM', '');
    const [datePart, timePart] = formattedTime.split('T');

    let [hourPart, minutePart] = timePart.split(':');
    if (isTimeAM && hourPart === '12') {
      hourPart = '00'; // Handle midnight
    } else if (!isTimeAM && hourPart !== '12') {
      hourPart = (parseInt(hourPart, 10) + 12).toString(); // Handle PM time (except 12:00PM)
    }

    const formattedDateTime = `${datePart}T${hourPart}:${minutePart}`;
    const parsedDate = parseISO(formattedDateTime);
    const formattedDate = format(parsedDate, 'yyyy-MM-dd hh:mm a');
    return formattedDate;
  };

  const showAvailableTutors = () => {
    setShowTutors(true);
   

    const matchingTutors = tutorDetails.filter((tutor) => {
        return (
          data.sessionSubject &&
          data.sessionSubject.some((subject) => tutor.TutorSubjects.includes(subject)) &&
          new Date(data.endTime) <= new Date(tutor.AvailableDateTimeTo) &&
          new Date(data.startTime) >= new Date(tutor.AvailableDateTimeFrom)
        );
      });
    
      console.log('Matching Tutors', matchingTutors);
    
      if (matchingTutors.length === 0) {
        setNoTutorAvailable(true)
        toast.error('No tutors are available for this session.');
      }else{
        setNoTutorAvailable(false)
      }

  };

  return (
    <div>
      <div>
        <DataTable
          onRowClicked={handleRowClick}
          columns={columns}
          data={data}
        />
      </div>

      <div style={{ marginTop: '5%' }}>
        <hr />
        <h3>Available Tutors</h3>
        <p style={{ marginTop: '1%' }}>
          Please Click on a Session to See Details Of the Session
        </p>

        {selectedRowData && (
          <Card sx={{ minWidth: 275, maxWidth: '300px' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {selectedRowData.sessionName}
              </Typography>
              <Typography variant="h5" component="div">
                FROM: {formatDateTime(selectedRowData.startTime)} TO: {formatDateTime(selectedRowData.endTime)}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Session Subject: {selectedRowData.sessionSubject}
              </Typography>
              <Typography variant="body2">
                Maximum Participants: {selectedRowData.maximumParticipants}
                <br />
                Status: {selectedRowData.status ? 'Active' : 'Inactive'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" onClick={showAvailableTutors}>Show Available Tutors for this Session</Button>
            </CardActions>
          </Card>
        )}
      </div>
{console.log('tutorDetails.length',tutorDetails.length,"tutorDetails",tutorDetails)}
      {!noTutorsAvailable && showTutors && tutorDetails.length > 0 && (
        <div>
          <h3>Available Tutors for this Session:</h3>
          {tutorDetails
            .filter((tutor) => tutor.TutorSubjects.includes(selectedRowData.sessionSubject))
            .map((tutor) => (
              <Card key={tutor._id}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {tutor.TutorName}
                  </Typography>
                  <Typography variant="body2">
                    Available FROM: {formatDateTime(tutor.AvailableDateTimeFrom)} TO: {formatDateTime(tutor.AvailableDateTimeTo)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="medium">Assign</Button>
                </CardActions>
              </Card>
            ))}
        </div>
      )}

      {/* {showTutors && tutorDetails.length === 0 && (
        toast.error('No tutors are available for this session.')
      )} */}
    </div>
  );
};

export default TutorSheduling;