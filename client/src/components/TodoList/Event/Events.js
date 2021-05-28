import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import Event from './Event';
import { useStyles } from '../../Util';

const Events = ({ events, onAddEvent, onDoneEvent, onDeleteItem }) => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState('');
  const [date, setDate] = useState(new Date());
  const [eventStatus, setEventStauts] = useState(false);

  const validateEvent = (event) => {
    setUserInput(event.target.value);
    event.target.value === '' ? setEventStauts(false) : setEventStauts(true);
  };

  const handleAddEvent = (event) => {
    event.preventDefault();
    onAddEvent(
      userInput,
      moment(date).format('ddd, MMM Do'),
      moment(date).format('LT')
    );
    setUserInput('');
    setDate(new Date());
    setEventStauts(false);
  };

  return (
    <div>
      <form
        onSubmit={handleAddEvent}
        noValidate
        style={{
          maxWidth: '34rem',
          margin: 'auto',
        }}
      >
        <Box
          marginTop={2}
          className={classes.label}
          autoComplete="off"
          style={{ flex: '1' }}
        >
          <TextField
            id="outlined-basic"
            fullWidth
            required
            label="Add An Event"
            variant="outlined"
            value={userInput}
            onChange={validateEvent}
          />
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box marginTop={2} className={classes.label}>
              <DateTimePicker
                label="Date & Time"
                inputVariant="outlined"
                disablePast
                value={date}
                onChange={setDate}
                showTodayButton
              />
            </Box>
          </MuiPickersUtilsProvider>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              marginTop: '20px',
              background: '#90c695',
              borderRadius: '50px',
              flex: '0.6',
            }}
            disabled={!eventStatus}
          >
            Add
          </Button>
        </div>
      </form>
      <div>
        {events.map((event) => {
          return (
            <React.Fragment key={event.id}>
              <Event
                event={event}
                onDoneEvent={onDoneEvent}
                onDeleteItem={onDeleteItem}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
