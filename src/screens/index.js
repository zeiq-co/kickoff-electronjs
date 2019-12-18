import React from 'react';
import { useStoreState } from 'easy-peasy';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Error404 from './404';
import Test from './Test';
import Login from './Login';
import Dashboard from './Dashboard';

const PrivateRoute = ({ component: Component, access, ...rest }) => {
  const isLoggedIn = useStoreState(state => state.user.isLoggedIn);

  return (
    <Route
      {...rest}
      render={props => {
        if (!isLoggedIn) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default function Navigation() {
  return (
    <Router>
      {window.location.pathname.includes('index.html') && <Redirect to="/" />}
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/private" component={Test} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
}
