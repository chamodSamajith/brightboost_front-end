import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function CustomizableTable({rows, columns}) {
  return (
    <React.Fragment>
      <Title>Recent Questions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.answer}</TableCell>
                <TableCell>{row.comment}</TableCell>
                <TableCell>{row.subjectId}</TableCell>
                <TableCell>{row.tutorId}</TableCell>
                <TableCell align="right">{`${row.studentId}`}</TableCell>
                <TableCell>{row.sessionId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more questions
      </Link>
    </React.Fragment>
  );
}
