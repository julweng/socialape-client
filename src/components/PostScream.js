import React, { useState } from "react";
import { func, shape, bool } from "prop-types";
import { connect } from "react-redux";
// material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// action creators
import { postScream } from "../redux/actions";
// selectors
import {
  dataErrorsSelector,
  dataLoadingStatus
} from "../redux/reducers/selectors";
// components
import CommonButton from "../util/commonButton";

const styles = theme => ({
  ...theme.styles,
  submitButton: {
    position: "relative"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
});

const PostScream = ({ errors, classes, loading, postScream }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [screamError, setScreamError] = useState("")

  const handleOpen = () => setOpen(true);

  const handleClose = () => { 
    if (screamError) setScreamError("")
    if (body) setBody("")
    setOpen(false);
  }

  const handleChange = ev => {
    setBody(ev.target.value);
  };
  const handleSubmit = ev => {
    ev.preventDefault();
    if (!body) { 
      setScreamError("Please type something")
    } else {
      postScream({ body });
      setBody("")
      setScreamError("")
      setOpen(false);
    }
  };

  return (
    <>
      <CommonButton onClick={handleOpen} tip="Post a Scream">
        <AddIcon />
      </CommonButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <CommonButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </CommonButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={(screamError || errors.body) ? true : false}
              helperText={screamError || errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostScream.propTypes = {
  postScream: func.isRequired,
  errors: shape({}),
  loading: bool
};

const mapStateToProps = state => ({
  UI: state.UI,
  errors: dataErrorsSelector(state),
  loading: dataLoadingStatus(state)
});

export default connect(
  mapStateToProps,
  { postScream }
)(withStyles(styles)(PostScream));
