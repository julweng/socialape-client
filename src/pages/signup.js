import React, { useState } from "react";
import { shape, string, bool, func } from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// material Ui
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// action creators
import { signupUser } from "../redux/actions";
// selectors
import { userLoadingStatus, signupErrors } from "../redux/reducers/selectors";
// logo
import AppIcon from "../images/icon.png";

const styles = theme => ({ ...theme.styles });

const Signup = ({ classes, history, loading, errors, signupUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const onChange = ev => {
    const { name, value } = ev.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "handle") setHandle(value);
  };

  const onSubmit = ev => {
    ev.preventDefault();
    const userData = {
      email,
      password,
      confirmPassword,
      handle
    };
    signupUser(userData, history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={onChange}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={confirmPassword}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={onChange}
          />
          <TextField
            id="handle"
            name="handle"
            type="handle"
            label="handle"
            className={classes.textField}
            value={handle}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            onChange={onChange}
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Log in{" "}
            <Link to="/login" className="linkColor">
              here
            </Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: shape({
    form: string,
    image: string,
    pageTitle: string,
    textField: string,
    button: string,
    customError: string
  }).isRequired,
  signupUser: func.isRequired,
  loading: bool.isRequired,
  errors: shape({
      email: string,
      password: string,
      confirmPassword: string,
      handle: string
  })
};

const mapStateToProps = state => ({
  loading: userLoadingStatus(state),
  errors: signupErrors(state)
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withStyles(styles)(Signup));
