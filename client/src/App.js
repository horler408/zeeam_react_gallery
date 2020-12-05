import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
//import AppWrapper from './AppWrapper';
import Dashboard from './pages/Dashboard';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Details from './pages/Details';
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
        <NavBar />
          <Home />
        <Footer />
      </Route>
      <Route exact path="/gallery">
        <Gallery />
      </Route>
      <Route exact path="/gallery/:id">
        <Details />
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
          <div className="container">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
