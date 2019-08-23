import React from "react";
import { shape, string } from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/icon.png";

// material Ui
import Grid from "@material-ui/core/Grid";

const styles = {
  form: {
    textAlign: "center"
  }
};

const login = () => {
  const { classes } = this.props;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} />
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

login.propTypes = {
  classes: shape({
    form: shape({
      textAlign: string
    })
  }).isRequired
};

export default withStyles(styles)(login);
