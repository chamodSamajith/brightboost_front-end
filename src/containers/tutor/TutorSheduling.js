import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const TutorSheduling = () => {

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ];

    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    const handleRowClick = (row, event) => {
        console.log(row)//can access values
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

            <div style={{ marginTop: "5%" }}>
                <hr />
                {/* filter and display availabe tutors for session( session displayed in row) */}
                <h3>Avalable Tutors</h3>
                <p style={{ marginTop: "1%" }}>Please Click on a Session to See Available tutors for that Session</p>


                <div>
                    {/* filter and display tutors */}
                    <Card sx={{ minWidth: 275, maxWidth: '300px' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
        </Typography>
                            <Typography variant="h5" component="div">
                                test test st
        </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                adjective
        </Typography>
                            <Typography variant="body2">
                                well meaning and kindly.
          <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="medium">Assign</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TutorSheduling
