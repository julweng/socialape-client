import React from "react";
import { node, bool } from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// selector
import { user } from "../redux/reducers/selectors";

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

const mapStateToProps = state => ({
  authenticated: user(state).authenticated
})

export default connect(mapStateToProps, null)(AuthRoute);
