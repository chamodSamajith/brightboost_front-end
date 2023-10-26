import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { parseISO, format } from 'date-fns';
import toast from 'react-hot-toast';

const TutorSheduling = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [tutorDetails, setTutorDetails] = useState([]);
  const [showTutors, setShowTutors] = useState(false);
  const [noTutorsAvailable, setNoTutorAvailable] = useState(true);
  const [matcingTutor, setMatchingTutor] = useState('');

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
      console.log("data0,", response.data.data)
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

  const convert12HourTo24Hour = (dateTime12h) => {
    const dateTimeParts = dateTime12h.match(/(\d{4}-\d{2}-\d{2})T(\d+):(\d+)([APap][Mm])/);

    if (!dateTimeParts) {
      return null; // Invalid input
    }

    let [, datePart, hours, minutes, period] = dateTimeParts;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (period.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    const formattedTime = `${datePart}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const showAvailableTutors = () => {


    const standardizeDateFormat = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      return formattedDate;
    };

    const formattedSelectedStartTime = convert12HourTo24Hour(selectedRowData.startTime);
    const formattedSelectedEndTime = convert12HourTo24Hour(selectedRowData.endTime);

    const matchingTutor = tutorDetails.find((tutor) => {

      const matchingTutorIndex = tutorDetails.findIndex((tutor, index) => {
        if (
          tutor.TutorSubjects.includes(selectedRowData.sessionSubject) &&
          standardizeDateFormat(tutor.AvailableDateTimeFrom) === formattedSelectedStartTime &&
          standardizeDateFormat(tutor.AvailableDateTimeTo) === formattedSelectedEndTime
        ) {
          return true; // Return the index of the matching tutor
        }
        return false; // Continue searching
      });

      if (matchingTutorIndex !== -1) {
        setShowTutors(true);
        setNoTutorAvailable(true);
        setMatchingTutor(tutorDetails[matchingTutorIndex])
        console.log("matching", tutorDetails[matchingTutorIndex])
      } else {
        toast.error('No tutors are available for this session.');
        console.log("No matching tutor found");
        setNoTutorAvailable(true);
      }

    });

  };

  const assignTutor = () => {
    let sheduledTutorSession = {
      SessionTimePeriodStart: formatDateTime(selectedRowData.startTime),
      SessionTimePeriodEnd: formatDateTime(selectedRowData.endTime),
      TutorName: matcingTutor.TutorName,
      SessionSubject: selectedRowData.sessionSubject,
      sessionName: selectedRowData.sessionName
    }

    // Create Tutor Assigned Shedule
    axios
      .post('http://localhost:3200/api/tutorshedule/create', sheduledTutorSession)
      .then((response) => {
        // If the request is successful
        toast.success('Tutor Scheduled to the Session');
      })
      .catch((error) => {
        // Handle errors 
        toast.error('Error scheduling the tutor: ' + error.message);
      });

  }

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

      {showTutors && (
        <div style={{ marginBottom: '3%' }}>
          <h3>Available Tutors for this Session:</h3>
          {matcingTutor && (
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {matcingTutor.TutorName}
                </Typography>
                <Typography variant="body2">
                  Available FROM: {matcingTutor.AvailableDateTimeFrom.replace('T', ' ')} TO: {matcingTutor.AvailableDateTimeTo.replace('T', ' ')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={assignTutor} size="medium">Assign</Button>
              </CardActions>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorSheduling;