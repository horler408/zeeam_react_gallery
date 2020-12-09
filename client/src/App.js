import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import AppWrapper from './AppWrapper';
import Dashboard from './pages/Dashboard';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Details from './pages/Details';
import Login from './pages/Login';
import Signup from './pages/Register';
import Users from './pages/Users';
import AuthContext from './context/AuthContext';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route {...rest} render={() =>
      authContext.isAuthenticated() ? (
        <AppWrapper>
          {children}
        </AppWrapper>
      ) : (
        <Redirect to="/" />
      )
    } />
  )
}

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
        <AppWrapper>
          <Home />
        </AppWrapper>
      </Route>
      <AuthenticatedRoute exact path="/gallery">
        <Gallery />
      </AuthenticatedRoute>
      <Route exact path="/gallery/:id">
        <Details />
      </Route>
      <Route path="/dashboard" render={() =>
        authContext.isAuthenticated() ? (
          <AppWrapper>
            <Dashboard />
          </AppWrapper>
        ) : (
          <Redirect to="/" />
        )
      }>
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
          <div className="container">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
