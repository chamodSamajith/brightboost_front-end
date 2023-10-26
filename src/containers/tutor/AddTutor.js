import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography, InputLabel, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AddTutor = () => {
  const [tutorName, setTutorName] = useState("");
  const [subject, setSubject] = useState([]);
  const [dateTimeFrom, setDateTimeFrom] = useState("");
  const [dateTimeTo, setDateTimeTo] = useState("");
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3200/api/tutors/getAllTutorInfo")
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tutors: ", error);
      });
  }, []);

  const onHandleName = (e) => {
    setTutorName(e.target.value);
  };

  const onHandleSubject = (e) => {
    setSubject(e.target.value);
  };

  const onHandleDateFrom = (e) => {
    setDateTimeFrom(e.target.value);
  };

  const onHandleDateTo = (e) => {
    setDateTimeTo(e.target.value);
  };

  const validateForm = () => {
    if (!tutorName || subject.length === 0 || !dateTimeFrom || !dateTimeTo) {
      toast.error("Please fill in all fields");
      return false;
    }

    // Check if dateTimeFrom is earlier than dateTimeTo
    if (new Date(dateTimeFrom) >= new Date(dateTimeTo)) {
      toast.error("Date and time 'From' must be earlier than 'To'");
      return false;
    }

    return true;
  };

  const sendApiRequest = () => {
    // Format the date and time values
    const formattedDateTimeFrom = new Date(dateTimeFrom).toISOString();
    const formattedDateTimeTo = new Date(dateTimeTo).toISOString();
    console.log(dateTimeFrom,dateTimeTo)
    axios
      .post("http://localhost:3200/api/tutordetails/create", {
        TutorName: tutorName,
        TutorSubjects: subject,
        AvailableDateTimeFrom: dateTimeFrom,
        AvailableDateTimeTo: dateTimeTo,
      })
      .then((response) => {
        toast.success("Tutor details inserted successfully");
        // Clear input fields
        setTutorName("");
        setSubject([]);
        setDateTimeFrom("");
        setDateTimeTo("");
      })
      .catch((error) => {
        toast.error("Error creating tutor");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sendApiRequest();
    }
  };

  return (
    <div>
      <Grid style={{ marginTop: "3%" }} container spacing={2}>
        <Grid item sm={12} xs={12}>
          <Typography variant="h5" color="#60707B">
            Insert Tutor Details
          </Typography>

          <Grid style={{ marginTop: "2%" }} item sm={6} xs={12}>
  <InputLabel>Tutor Name</InputLabel>
  <Select
     fullWidth
    label="Tutor Name"
    value={tutorName}
    onChange={onHandleName}
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
</Grid>

          <Grid style={{ marginTop: "1%" }} item sm={6} xs={12}>
            <InputLabel>Subject Expertise</InputLabel>
            <Select
              multiple
              id="demo-select-small"
              value={subject}
              sx={{ width: "100%" }}
              onChange={onHandleSubject}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="IT">Information Technology</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </Select>
          </Grid>

          <Grid style={{ marginTop: "2%" }} item sm={6} xs={12}>
            <InputLabel>Date Available From</InputLabel>
            <TextField
              size="medium"
              fullWidth
              name="dateTimeFrom"
              value={dateTimeFrom}
              type="datetime-local"
              onChange={onHandleDateFrom}
            />
          </Grid>

          <Grid style={{ marginTop: "2%" }} item sm={6} xs={12}>
            <InputLabel>Date Available To</InputLabel>
            <TextField
              size="medium"
              fullWidth
              name="dateTimeTo"
              value={dateTimeTo}
              type="datetime-local"
              onChange={onHandleDateTo}
            />
          </Grid>

          <Grid style={{ marginTop: "2%" }} item sm={6} xs={12}>
            <Button onClick={handleSubmit} variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddTutor;