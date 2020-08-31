import React, { useContext } from 'react';
import './App.css';
import './App.less';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { Landing } from './components/LandingPage';
import { RootContext } from './services/RootContext';



import { Layout } from 'antd';


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


export default App;
