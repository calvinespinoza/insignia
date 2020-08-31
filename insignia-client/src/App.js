import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import './App.less';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { Landing } from './components/LandingPage';
import { RootContext } from './services/RootContext';

//import { AuthService } from './services/AuthService';


import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function App() {

  return (
    <Router>
      <Layout className="layout" style={{ height: "100vh" }}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/overview">
            <Dashboard />
          </PrivateRoute>
        </Switch>
        {/* <Footer>footer</Footer> */}
      </Layout>
    </Router>
  );
}

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

export default App;
