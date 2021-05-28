import React, { useContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { CircularProgress } from '@material-ui/core';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = async (name, email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
    return auth.currentUser.updateProfile({
      displayName: name,
    });
  };

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateName = (name) => {
    return auth.currentUser.updateProfile({
      displayName: name,
    });
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  const closeAccount = () => {
    return auth.currentUser.delete();
  };

  const autoSignOut = (user, mins) => {
    let userSessionTimeout = null;

    if (user === null && userSessionTimeout) {
      clearTimeout(userSessionTimeout);
      userSessionTimeout = null;
    } else {
      user.getIdTokenResult().then((idTokenResult) => {
        const authTime = idTokenResult.claims.auth_time * 1000;
        const sessionDurationInMilliseconds = 60 * mins * 1000;
        const expirationInMilliseconds =
          sessionDurationInMilliseconds - (Date.now() - authTime);
        userSessionTimeout = setTimeout(
          () => auth.signOut(),
          expirationInMilliseconds
        );
      });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setTimeout(() => {
        setLoading(false);
      }, 500);

      autoSignOut(user, 30);
    });
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateName,
    updateEmail,
    updatePassword,
    closeAccount,
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
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
