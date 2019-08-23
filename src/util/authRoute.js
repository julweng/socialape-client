import React from "react";
import { node, bool } from "prop-types";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, authenticated, ...children }) => {
  return (
    <Route
      {...children}
      render=
      {props =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

AuthRoute.propTypes = {
  Component: node,
  authenticated: bool
};

export default AuthRoute;
