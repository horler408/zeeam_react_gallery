import React, { useContext, lazy, Suspense } from 'react';
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
import AdminWrapper from './AdminWrapper'
import Preloader from './components/common/Preloader';
import FourOFour from './pages/FourOFour';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Users = lazy(() => import('./pages/Users'));
const Details = lazy(() => import('./pages/Details'));
const Update = lazy(() => import('./pages/Update'));

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

const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route {...rest} render={() =>
      authContext.isAuthenticated() && authContext.isAdmin() ? (
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
    <Suspense fallback={<Preloader />}>
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
        <Route path="/inventory">  
            <Inventory />
        </Route>
        <AdminRoute path="/users">
          <Users />
        </AdminRoute>
        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Suspense>
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
