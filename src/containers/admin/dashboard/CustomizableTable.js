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

export default function CustomizableTable({rows, columns, columnWidths}) {
  return (
    <React.Fragment>
      <Title>Recent Questions</Title>
      <Table size="small" id="report-table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
                <TableCell key={index} style={{ width: columnWidths[index] }}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row._id}>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{row._id}</TableCell>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{row.question}</TableCell>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{row.answer}</TableCell>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{row.comment}</TableCell>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{row.subjectId}</TableCell>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{row.tutorId}</TableCell>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{`${row.studentId}`}</TableCell>
                <TableCell key={index} style={{ width: columnWidths[index] }}>{row.sessionId}</TableCell>
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
