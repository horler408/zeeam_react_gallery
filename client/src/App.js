import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import Dashboard from './pages/Dashboard';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Register';
import Users from './pages/Users';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Signup />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="*">
        <FourOFour />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
