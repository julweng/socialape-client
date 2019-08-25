import React, { useState } from "react";
import { shape, string, func, bool } from "prop-types";
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
import { loginUser } from "../redux/actions";
// selectors
import { userLoadingStatus, authErrors } from "../redux/reducers/selectors";
// image
import AppIcon from "../images/icon.png";

const styles = theme => ({ ...theme.styles });

const Login = ({ classes, history, loginUser, loading, errors }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = ev => {
    const { name, value } = ev.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = ev => {
    ev.preventDefault();

    const userData = { email, password };
    loginUser(userData, history);
  };

  const emailErrors =
    errors.error === "auth/invalid-email"
      ? "Invalid email format"
      : errors.email;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            helperText={emailErrors}
            error={emailErrors ? true : false}
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
            Login
            {loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up{" "}
            <Link to="/signup" className="linkColor">
              here
            </Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: shape({
    form: string,
    image: string,
    pageTitle: string,
    textField: string,
    button: string,
    customError: string
  }).isRequired,
  loginUser: func.isRequired,
  loading: bool,
  errors: shape({
    email: string,
    password: string
  })
};

const mapStateToProps = state => ({
  loading: userLoadingStatus(state),
  errors: authErrors(state)
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));
