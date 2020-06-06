import React from 'react';
import {node} from 'prop-types';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
// selector
import {authSelector} from '../redux/reducers/selectors';

const AuthRoute = ({component: Component, ...children}) => {
  const authenticated = useSelector((state) => authSelector(state));
  return (
    <Route
      {...children}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

AuthRoute.propTypes = {
  Component: node,
};

export default AuthRoute;
