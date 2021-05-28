import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

import { useAuth } from '../../AuthContext';
import { useStyles } from '../Util';
import { auth, db } from '../../firebase';

const URI = 'https://myday-posts.vercel.app/posts/';

const UpdateAccount = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameStatus, setNameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [open, setOpen] = useState(false);
  const [code] = useState('Close myDay');
  const [codeError, setCodeError] = useState('');
  const [failedError, setFailedError] = useState('');
  const [codeStatus, setCodeStatus] = useState(false);
  const { currentUser, updateName, updateEmail, updatePassword, closeAccount } =
    useAuth();

  const validateName = (event) => {
    setName(event.target.value);
    if (event.target.value !== '' && !event.target.value.match(/[a-z]/i)) {
      setName('');
      setNameError('Needs to start with a letter [A-Z]!');
      setNameStatus(false);
    } else if (event.target.value === currentUser.displayName) {
      setNameError(
        'Sorry, new name needs to be different than your current name!'
      );
      setNameStatus(false);
    } else if (event.target.value.length < 3) {
      setNameError('Name length needs to be >= 3!');
      setNameStatus(false);
    } else {
      setNameError('');
      setNameStatus(true);
    }

    if (event.target.value === '') {
      setNameError('');
    }
  };

  const validateEmail = (event) => {
    setEmail(event.target.value);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)) {
      setEmailError('Email is invalid!');
      setEmailStatus(false);
    } else if (event.target.value === currentUser.email) {
      setEmailError(
        'Sorry, new email needs to be different than your current email!'
      );
      setEmailStatus(false);
    } else {
      setEmailError('');
      setEmailStatus(true);
    }

    if (event.target.value === '') {
      setEmailError('');
    }
  };

  const validatePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 6) {
      setPasswordError('Password length needs to be >= 6!');
      setPasswordStatus(false);
    } else if (confirmPassword !== event.target.value) {
      setPasswordError('');
      setConfirmPasswordError('Passwords needs to be matched!');
      setPasswordStatus(false);
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
      setPasswordStatus(true);
    }

    if (event.target.value === '') {
      setPasswordError('');
      setConfirmPasswordError('');
    }
  };

  const validateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    if (password !== event.target.value) {
      setConfirmPasswordError('Passwords needs to be matched!');
      setPasswordStatus(false);
    } else if (event.target.value === '') {
      setPasswordStatus(false);
    } else {
      setConfirmPasswordError('');
      setPasswordStatus(true);
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const promises = [];
    setUpdateError('');

    if (name !== '' && name !== currentUser.displayName) {
      promises.push(updateName(name));
    }
    if (email !== '' && email !== currentUser.email) {
      promises.push(updateEmail(email));
    }
    if (password !== '') {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        setMessage(
          'You successfully updated your account! Please refresh the page...'
        );
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(() => {
        setUpdateError('Failed to update account');
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateCode = (event) => {
    if (event.target.value !== code) {
      setCodeError('Hmm, please enter the code properly!');
      setCodeStatus(false);
    } else {
      setCodeError('');
      setCodeStatus(true);
    }
  };

  const handleCloseAccount = async () => {
    setCodeStatus(false);
    try {
      await axios.delete(URI + `${currentUser.uid}`);
      await closeAccount();
    } catch {
      setFailedError(
        'Something went wrong, please sign out, then sign back in and try again!'
      );
    }
  };

  if (open) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ userSelect: 'none' }}
      >
        <DialogTitle id="form-dialog-title">Close Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure, you want to close your account? Please note, once you
            click 'DELETE' we will delete your account and all the data
            associated with it. This process cannot be undone! Hope you enjoyed
            using myDay, thank you :)
          </DialogContentText>
          <DialogContentText>
            Please type 'Close myDay' below and press 'DELETE' to confirm! If
            you change your mind, click 'CANCEL'.
          </DialogContentText>
          <Box>
            {codeError && (
              <Alert
                severity="warning"
                style={{
                  marginTop: '8px',
                  borderRadius: '50px',
                }}
              >
                {codeError}
              </Alert>
            )}

            {failedError && (
              <Alert
                severity="error"
                style={{
                  marginTop: '8px',
                  borderRadius: '50px',
                }}
              >
                {failedError}
              </Alert>
            )}
          </Box>
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
              label="Code"
              variant="outlined"
              onChange={validateCode}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!codeStatus}
            onClick={handleCloseAccount}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <form
        onSubmit={handleUpdate}
        noValidate
        style={{
          alignItems: 'center',
          maxWidth: '23rem',
          margin: 'auto',
        }}
      >
        <Box marginBottom={3}>
          <Alert
            severity="info"
            style={{
              borderRadius: '50px',
              opacity: '0.8',
            }}
          >
            Only type in the field(s) you want to update! Leave other fields
            empty...
          </Alert>

          {nameError && (
            <Alert
              severity="warning"
              style={{
                marginTop: '8px',
                borderRadius: '50px',
                opacity: '0.8',
              }}
            >
              {nameError}
            </Alert>
          )}

          {emailError && (
            <Alert
              severity="warning"
              style={{
                marginTop: '8px',
                borderRadius: '50px',
                opacity: '0.8',
              }}
            >
              {emailError}
            </Alert>
          )}

          {passwordError && (
            <Alert
              severity="warning"
              style={{
                marginTop: '8px',
                borderRadius: '50px',
                opacity: '0.8',
              }}
            >
              {passwordError}
            </Alert>
          )}

          {confirmPasswordError && (
            <Alert
              severity="warning"
              style={{
                marginTop: '8px',
                borderRadius: '50px',
                opacity: '0.8',
              }}
            >
              {confirmPasswordError}
            </Alert>
          )}

          {message && (
            <Alert
              severity="success"
              style={{
                marginTop: '8px',
                borderRadius: '50px',
                opacity: '0.8',
              }}
            >
              {message}
            </Alert>
          )}

          {updateError && (
            <Alert
              severity="error"
              style={{
                marginTop: '8px',
                borderRadius: '50px',
                opacity: '0.8',
              }}
            >
              {updateError}
            </Alert>
          )}
        </Box>
        <Box className={classes.label} autoComplete="off">
          <TextField
            id="outlined-basic-1"
            fullWidth
            label="Current Name"
            defaultValue={currentUser.displayName}
            variant="outlined"
            disabled
          />
        </Box>
        <Box marginTop={2} className={classes.label} autoComplete="off">
          <TextField
            id="outlined-basic-2"
            fullWidth
            label="Current Email"
            defaultValue={currentUser.email}
            variant="outlined"
            disabled
          />
        </Box>
        <Box marginTop={2} className={classes.label} autoComplete="off">
          <TextField
            id="outlined-basic-3"
            fullWidth
            label="New Name"
            variant="outlined"
            value={name}
            onChange={validateName}
          />
        </Box>
        <Box marginTop={2} className={classes.label} autoComplete="off">
          <TextField
            id="outlined-basic-4"
            fullWidth
            label="New Email"
            variant="outlined"
            value={email}
            onChange={validateEmail}
          />
        </Box>
        <div style={{ display: 'flex' }}>
          <Box
            marginTop={2}
            marginRight={1}
            className={classes.label}
            autoComplete="off"
          >
            <TextField
              type="password"
              id="outlined-basic-5"
              label="New Password"
              variant="outlined"
              value={password}
              onChange={validatePassword}
            />
          </Box>
          <Box marginTop={2} className={classes.label} autoComplete="off">
            <TextField
              type="password"
              id="outlined-basic-6"
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={validateConfirmPassword}
            />
          </Box>
        </div>
        <Box align="center" paddingTop={2}>
          <Button
            type="submit"
            style={{
              background: 'rgb(34,193,195)',
              background:
                'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(255,174,0,1) 100%)',
              borderRadius: '50px',
            }}
            variant="contained"
            size="large"
            fullWidth
            disabled={!nameStatus && !emailStatus && !passwordStatus}
          >
            Update
          </Button>
        </Box>
      </form>

      <Box align="center" paddingTop={2}>
        <Button
          style={{
            borderRadius: '50px',
          }}
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleOpen}
        >
          Close Account ?
        </Button>
      </Box>
    </>
  );
};

export default UpdateAccount;
