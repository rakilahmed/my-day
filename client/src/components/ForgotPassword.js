import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useStyles } from './Util';
import { useAuth } from '../AuthContext';

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [message, setMessage] = useState('');
  const [failedError, setFailedError] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const { resetPassword } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmailStatus(false);
    setEmail('');
    setEmailError('');
    setFailedError('');
    setMessage('');
  };

  const validateEmail = (event) => {
    setEmail(event.target.value);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)) {
      setEmailError('Email is invalid!');
      setEmailStatus(false);
    } else {
      setEmailError('');
      setEmailStatus(true);
    }
  };

  const handleSubmit = async () => {
    try {
      setMessage('');
      setEmailError('');
      await resetPassword(email);
      setMessage('Email reset instructions sent! Check your inbox...');
      setEmail('');
      setEmailStatus(false);
    } catch {
      setFailedError('Failed to reset password! Double check your email...');
    }
  };

  if (open) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your myDay account email and press 'SUBMIT', we will
            send you the instructions on how to reset the password!
          </DialogContentText>
          <Box>
            {emailError && (
              <Alert
                severity="warning"
                style={{
                  marginTop: '8px',
                  borderRadius: '50px',
                }}
              >
                {emailError}
              </Alert>
            )}

            {message && (
              <Alert
                severity="success"
                style={{
                  marginTop: '8px',
                  borderRadius: '50px',
                }}
              >
                {message}
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
              label="Email"
              variant="outlined"
              value={email}
              onChange={validateEmail}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!emailStatus}
            onClick={handleSubmit}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <div>
      <u style={{ color: 'black', cursor: 'pointer' }} onClick={handleOpen}>
        Forgot Password?
      </u>
    </div>
  );
};

export default ForgotPassword;
