import React, { useState } from "react";
import { Grid, TextField, Typography, InputLabel, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const AddTutor = () => {
  const [tutorName, setTutorName] = useState("");
  const [subject, setSubject] = useState([]);
  const [dateTime, setDateTime] = useState("");

  const onHandleName = (e) => {
    setTutorName(e.target.value);
  };

  const onHandleSubject = (e) => {
    setSubject(e.target.value);
  };

  const onHandleDate = (e) => {
    setDateTime(e.target.value);
  };

  const validateForm = () => {
    if (!tutorName || subject.length === 0 || !dateTime) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };

  const sendApiRequest = () => {
    axios
      .post("http://localhost:3200/api/tutordetails/create", {
        TutorName: tutorName,
        TutorSubjects: subject,
        AvailableDateTIme: dateTime,
      })
      .then((response) => {
        toast.success("Tutor details inserted successfully");
      })
      .catch((error) => {
        toast.error("Error creating tutor");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sendApiRequest();
      // Clear input fields
    setTutorName("");
    setSubject([]);
    setDateTime("");
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
            <TextField
              size="medium"
              fullWidth
              label="Tutor Name"
              name="name"
              value={tutorName}
              onChange={onHandleName}
            />
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
            <InputLabel id="demo-select-small-label">Date Available</InputLabel>
            <TextField
              size="medium"
              fullWidth
              label=""
              name="avDate"
              value={dateTime}
              type="datetime-local"
              onChange={onHandleDate}
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