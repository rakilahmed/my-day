import { useState, useCallback } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

import { useStyles } from './Util';
import { useAuth } from '../AuthContext';

const SignUp = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [nameStatus, setNameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const { signUp } = useAuth();
  const history = useHistory();

  const validateName = (event) => {
    setName(event.target.value);
    if (event.target.value !== '' && !event.target.value.match(/[a-z]/i)) {
      setName('');
      setNameError('Needs to start with a letter [A-Z]!');
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
    } else {
      setConfirmPasswordError('');
      setPasswordStatus(true);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      setSignUpError('');
      await signUp(name, email, password);
      history.push('/dashboard');
    } catch {
      setSignUpError('Failed to create an account!');
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <Box marginTop={1}>
        {signUpError && (
          <Alert
            severity="error"
            style={{
              borderRadius: '50px',
              opacity: '0.8',
            }}
          >
            {signUpError}
          </Alert>
        )}

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
              opacity: '0.7',
            }}
          >
            {confirmPasswordError}
          </Alert>
        )}
      </Box>
      <Box marginTop={2} className={classes.label} autoComplete="off">
        <TextField
          id="name"
          fullWidth
          label="Name"
          required
          variant="outlined"
          value={name}
          onChange={validateName}
        />
      </Box>
      <Box marginTop={2} className={classes.label} autoComplete="off">
        <TextField
          type="email"
          id="email"
          fullWidth
          label="Email"
          required
          variant="outlined"
          value={email}
          onChange={validateEmail}
        />
      </Box>
      <Box marginTop={2} className={classes.label} autoComplete="off">
        <TextField
          type="password"
          id="password"
          fullWidth
          label="Password"
          required
          variant="outlined"
          value={password}
          onChange={validatePassword}
        />
      </Box>
      <Box marginTop={2} className={classes.label} autoComplete="off">
        <TextField
          type="password"
          id="confirm-password"
          fullWidth
          label="Confirm Password"
          required
          variant="outlined"
          value={confirmPassword}
          onChange={validateConfirmPassword}
        />
      </Box>
      <Box align="center" paddingTop={2}>
        <Button
          type="submit"
          style={{
            background: '#ffae00',
            borderRadius: '50px',
          }}
          variant="contained"
          size="large"
          fullWidth
          disabled={!nameStatus || !emailStatus || !passwordStatus}
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
