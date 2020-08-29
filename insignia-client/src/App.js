import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.less';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Landing } from './components/LandingPage';
import { RootContext } from './services/RootContext';
//import { AuthService } from './services/AuthService';


import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function App() {

  return (
    <Router>
      <Layout className="layout">
        <Header className="header" style={{ backgroundColor: '#F9F9F9', color: 'black' }} >
          Insignia
      </Header>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/overview">Protected Page</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/public">
            <PublicPage />
          </Route>
          <PrivateRoute path="/overview">
            <Dashboard />
          </PrivateRoute>
        </Switch>
        <Footer>footer</Footer>
      </Layout>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function PrivateRoute({ children, ...rest }) {
  const { authenticated } = useContext(RootContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


function AuthButton() {
  let history = useHistory();
  const { authenticated, setAuthenticated } = useContext(RootContext);

  return authenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          setAuthenticated(false);
          //fakeAuth.signout(() => 
          history.push("/")
          //);
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    );
}
function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  const { setAuthenticated } = useContext(RootContext);

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    setAuthenticated(true);
    history.replace(from);
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default App;
