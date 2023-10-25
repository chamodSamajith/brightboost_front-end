import React, { useState } from "react";
import { Tab, Box } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddTutor from './AddTutor';
import TutorSheduling from './TutorSheduling';

const TutorLanding = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tutor details" value="1" />
            <Tab label="Tutor Sheduling" value="2" />
            <Tab label="View Shedules" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><AddTutor /></TabPanel>
        <TabPanel value="2"><TutorSheduling /></TabPanel>
        <TabPanel value="3"><TutorSheduling /></TabPanel>
      </TabContext>
    </Box>
  );
};

export default TutorLanding;