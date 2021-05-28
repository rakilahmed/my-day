import { useState, useEffect } from 'react';
import { Tabs, Tab, CircularProgress } from '@material-ui/core';

import Todos from './Todo/Todos';
import Events from './Event/Events';
import CompletedItems from './Completed/CompletedItems';
import { TabPanel, a11yProps } from '../Util';
import { db } from '../../firebase';
import { useAuth } from '../../AuthContext';
import firebase from 'firebase/app';

const TodoList = () => {
  const { currentUser } = useAuth();
  const [value, setValue] = useState(0);
  const toggle = (event, newValue) => {
    setValue(newValue);
  };

  const [todos, setTodos] = useState([]);
  const [events, setEvents] = useState([]);
  const [completedItems, setCompletedItems] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    timeOut(500);
    fetchTodos();
    fetchEvents();
    fetchCompletedItems();
  }, []);

  const timeOut = (time) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const fetchTodos = () => {
    db.collection(`users/${currentUser.uid}/todos`)
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  };

  const fetchEvents = () => {
    db.collection(`users/${currentUser.uid}/events`)
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setEvents(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            event: doc.data().event,
            day: doc.data().day,
            time: doc.data().time,
          }))
        );
      });
  };

  const fetchCompletedItems = () => {
    db.collection(`users/${currentUser.uid}/completedItems`)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setCompletedItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data().item,
          }))
        );
      });
  };

  const addTodo = (userInput) => {
    db.collection(`users/${currentUser.uid}/todos`).add({
      todo: userInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const addEvent = (userInput, day, time) => {
    db.collection(`users/${currentUser.uid}/events`).add({
      event: userInput,
      day: day,
      time: time,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const doneTodo = (item) => {
    db.collection(`users/${currentUser.uid}/completedItems`).add({
      item: item.todo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    db.collection(`users/${currentUser.uid}/todos`).doc(item.id).delete();
  };

  const doneEvent = (item) => {
    db.collection(`users/${currentUser.uid}/completedItems`).add({
      item: item.event,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    db.collection(`users/${currentUser.uid}/events`).doc(item.id).delete();
  };

  const deleteItem = (group, item) => {
    if (group === 'todo')
      db.collection(`users/${currentUser.uid}/todos`).doc(item.id).delete();
    else if (group === 'event')
      db.collection(`users/${currentUser.uid}/events`).doc(item.id).delete();
    else
      db.collection(`users/${currentUser.uid}/completedItems`)
        .doc(item.id)
        .delete();
  };

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress style={{ color: '#fff' }} />
      </div>
    );
  }

  return (
    <div className="card-container" style={{ userSelect: 'none' }}>
      <Tabs
        style={{
          background: 'rgba(255,174,0)',
          maxWidth: '35rem',
          margin: 'auto',
          borderRadius: '50px',
        }}
        value={value}
        onChange={toggle}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="on"
        aria-label="scrollable auto tabs"
      >
        <Tab label={`To-Dos (${todos.length})`} {...a11yProps(0)} />
        <Tab label={`Events (${events.length})`} {...a11yProps(1)} />
        <Tab label={`Completed (${completedItems.length})`} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Todos
          todos={todos}
          onAddTodo={addTodo}
          onDoneTodo={doneTodo}
          onDeleteItem={deleteItem}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Events
          events={events}
          onAddEvent={addEvent}
          onDoneEvent={doneEvent}
          onDeleteItem={deleteItem}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CompletedItems
          completedItems={completedItems}
          onDeleteItem={deleteItem}
        />
      </TabPanel>
    </div>
  );
};

export default TodoList;
