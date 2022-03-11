import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tabs, Tab, Button, Typography } from '@material-ui/core';

import TodoList from './TodoList/TodoList';
import { TabPanel, a11yProps } from './Util';
import { useAuth } from '../AuthContext';
import Journal from './Journal/Journal';
import Profile from './Profile/Profile';

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const toggle = (event, newValue) => {
    setValue(newValue);
  };

  const { signOut } = useAuth();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOut();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md">
      <header className="header">
        <Typography variant="h5">myDay</Typography>
        <Button
          style={{ borderRadius: '50px', backgroundColor: '#F88379' }}
          variant="contained"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </header>

      <Tabs
        style={{
          background: 'rgb(34,193,195)',
          borderRadius: '50px',
          margin: '20px auto',
          maxWidth: '45rem',
        }}
        value={value}
        onChange={toggle}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        scrollButtons="on"
        aria-label="fullwidth auto tabs"
      >
        <Tab label="Tasks" {...a11yProps(0)} />
        <Tab label="Journal" {...a11yProps(1)} />
        <Tab label="Profile" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TodoList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Journal />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Profile />
      </TabPanel>
    </Container>
  );
};

export default Dashboard;
