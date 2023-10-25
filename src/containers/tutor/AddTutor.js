import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, InputLabel, Select, MenuItem, Button } from "@mui/material";

const AddTutor = () => {

    const [tutorName, setTutorName] = useState("")
    const [subject, setSubject] = useState("")
    const [dateTime, setDateTime] = useState("")

    const onHandleName = (e) => {
        setTutorName(e.target.value)
    }

    const onHandleSubject = (e) => {
        setSubject(e.target.value)
    }

    const onHandleDate = (e) => {
        setDateTime(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("name", tutorName, "sub ", subject, " dateTime", dateTime)
    }

    return (
        <div>
            <Grid sytle={{ marginTop: '3%' }} container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <Typography variant="h5" color="#60707B">
                        Insert Tutor Details
                  </Typography>

                    <Grid style={{ marginTop: '2%' }} item sm={6} xs={12}>
                        <TextField
                            size="medium"
                            fullWidth
                            label="Tutor Name"
                            name="name"
                            value={tutorName}
                            onChange={onHandleName}
                        />
                    </Grid>

                    <Grid style={{ marginTop: '1%' }} item sm={6} xs={12}>
                        <InputLabel>Subject Expertiese</InputLabel>
                        <Select
                            id="demo-select-small"
                            value={subject}
                            label="Subject"
                            sx={{ width: '100%' }}
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

                    <Grid style={{ marginTop: '2%' }} item sm={6} xs={12}>
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

                    <Grid style={{ marginTop: '2%' }} item sm={6} xs={12}>
                        <Button onClick={handleSubmit} variant="contained">Add</Button>
                    </Grid>


                </Grid>
            </Grid>
        </div>
    )
}

export default AddTutor
