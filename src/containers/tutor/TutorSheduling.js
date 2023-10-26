import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

const TutorSheduling = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const columns = [
    {
      name: 'Session Name',
      selector: (row) => row.sessionName,
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
    } catch (error) {
      console.error('Error fetching session data', error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  const handleRowClick = (row) => {
    setSelectedRowData(row);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString(); 
    const formattedTime = dateTime.toLocaleTimeString(); 
    return `${formattedDate} ${formattedTime}`;
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
          Please Click on a Session to See Available tutors for that Session
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
              <Button size="medium">Assign</Button>
            </CardActions>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TutorSheduling;