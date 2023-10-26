import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ViewShedules = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editSelectedRow, setEditSelectedRow] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tutorName, setTutorName] = useState('');
  const [tutors, setTutors] = useState([]);
  const [editedTutorName, setEditedTutorName] = useState('');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const columns = [
    {
      name: 'Session Name',
      selector: 'sessionName',
    },
    {
      name: 'Session Subject',
      selector: 'SessionSubject',
    },
    {
      name: 'Tutor',
      selector: 'TutorName',
    },
    {
      name: 'Start Time',
      selector: 'SessionTimePeriodStart',
    },
    {
      name: 'End Time',
      selector: 'SessionTimePeriodEnd',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  const fetchData = () => {
    axios.get('http://localhost:3200/api/tutorshedule/getAll')
      .then((response) => {
        // Update the data state with the fetched data
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:3200/api/tutorshedule/getAll')
      .then((response) => {
        // Update the data state with the fetched data
        setData(response.data.data);
        console.log("table", response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  const handleTutorNameChange = (event) => {
    setEditedTutorName(event.target.value);
  }

  const handleEdit = (row) => {
    console.log("in edit", row)
    setEditSelectedRow(row);
    setTutorName(row.TutorName);
    setIsEditModalOpen(true);

    axios.get("http://localhost:3200/api/tutors/getAllTutorInfo")
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tutors: ", error);
      });
  }

  const confirmEdit = () => {
    const id = editSelectedRow._id;

    axios.put(`http://localhost:3200/api/tutorshedule/update/${id}`, { TutorName: editedTutorName })
      .then((response) => {
        setIsEditModalOpen(false);
        toast.success("Record Updated!");
        fetchData();
      })
      .catch((error) => {
        toast.error('Error updating Sheduled Tute.');
        console.error('Error updating data', error);
      });
  }

  const cancelEdit = () => {
    setIsEditModalOpen(false);
  }

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  }

  const confirmDelete = () => {
    const id = selectedRow._id; 
    axios.delete(`http://localhost:3200/api/tutorshedule/delete/${id}`)
      .then((response) => {
        setIsModalOpen(false);
        toast.success("Record Deleted!");
        fetchData();
      })
      .catch((error) => {
        toast.error('Error deleting Sheduled Tute.');
        console.error('Error deleting data', error);
      });
  }

  const cancelDelete = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        pagination
      />
      <div id="deleteModal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '50%' }}>
        <Modal
          open={isModalOpen}
          onClose={cancelDelete}
          className="center"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '50%', background: 'white', width: '300px', height: '150px' }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this record?
          </Typography>
            <div className="modal-paper">

              <Button onClick={confirmDelete} variant="contained" color="primary">
                Delete
              </Button>
              <Button style={{ marginLeft: '1%' }} onClick={cancelDelete} variant="outlined" color="secondary">
                Cancel
              </Button>
            </div>

          </Box>

        </Modal>
      </div>
      <div id="editModal">

        {editSelectedRow != null && (<Modal open={isEditModalOpen} onClose={cancelEdit}>
          {/* {console.log("editSelectedRow.TutorName", editSelectedRow ? editSelectedRow.TutorName : '')} */}
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Edit Record
          </Typography>
            <Typography>
              Session Name: {editSelectedRow.sessionName}
            </Typography>
            <Typography>
              Session Subject: {editSelectedRow.SessionSubject}
            </Typography>
            <Typography>
              Tutor: {tutorName}
            </Typography>
            <Select
              fullWidth
              label="Tutor Name"
              value={editedTutorName}
              onChange={handleTutorNameChange}
              placeholder="Change Tutor"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tutors.map((tutor) => (
                <MenuItem key={tutor._id} value={tutor.TutorFName}>
                  {tutor.TutorFName} {tutor.TutorLName}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={confirmEdit} variant="contained" color="primary">
              Save
          </Button>
            <Button onClick={cancelEdit} variant="outlined" color="secondary">
              Cancel
          </Button>
          </Box>
        </Modal>)}
      </div>
    </div>
  );
};

export default ViewShedules;