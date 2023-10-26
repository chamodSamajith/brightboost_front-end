import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(questionId, question, answer, comment, subjectId, tutorId, studentId) {
  return { questionId, question, answer, comment, subjectId, tutorId, studentId };
}

const rows = [
  createData(
    1,
    'What is 1 + 1?',
    '2',
    'Silly question',
    '101',
    '201',
    '301'
  ),
  createData(
      1,
      'What is 1 + 1?',
      '2',
      'Silly question',
      '101',
      '201',
      '301'
  ),
  createData(
      1,
      'What is 1 + 1?',
      '2',
      'Silly question',
      '101',
      '201',
      '301'
  ),
  createData(
      1,
      'What is 1 + 1?',
      '2',
      'Silly question',
      '101',
      '201',
      '301'
  ),
  createData(
      1,
      'What is 1 + 1?',
      '2',
      'Silly question',
      '101',
      '201',
      '301'
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Question</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Question ID</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Subject ID</TableCell>
            <TableCell>Tutor ID</TableCell>
            <TableCell align="right">Student ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.questionId}>
              <TableCell>{row.questionId}</TableCell>
              <TableCell>{row.question}</TableCell>
              <TableCell>{row.answer}</TableCell>
              <TableCell>{row.comment}</TableCell>
              <TableCell>{row.subjectId}</TableCell>
              <TableCell>{row.tutorId}</TableCell>
              <TableCell align="right">{`$${row.studentId}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
