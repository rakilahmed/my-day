import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Dashboard from './Dashboard';
import Home from './Home';
import './App.css';
import { AuthProvider } from '../AuthContext';
import PrivateRoute from './PrivateRoute';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['KoHo', 'sans-serif'].join(','),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
