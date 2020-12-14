import React, { useContext } from 'react';
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
import Update from './pages/Update';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import { AuthContext } from './context/AuthContext';

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
        <Register />
      </Route>
      <Route exact path="/">
        <AppWrapper>
          <Home />
        </AppWrapper>
      </Route>
      <Route exact path="/gallery">
        <AppWrapper>
          <Gallery />
        </AppWrapper>
      </Route>
      <Route path="/gallery/:id" render={(props) => <Details {...props}/>}></Route>
      <Route path="/update/:id" render={(props) => <Update {...props}/>}></Route>
      <AuthenticatedRoute exact path="/dashboard">
        <Dashboard />
      </AuthenticatedRoute>
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
    <>
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="container">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;
