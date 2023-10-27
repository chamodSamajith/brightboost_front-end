import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function TotalQuestions({totalQuestions}) {
  return (
    <React.Fragment>
      <Title>Total questions</Title>
      <Typography component="p" variant="h4">
          {totalQuestions}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 27 October, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all
        </Link>
      </div>
    </React.Fragment>
  );
}
