import React, { useState } from "react";
import { func, shape } from "prop-types";
import { connect } from "react-redux";
// material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
// action creators
import { editUserDetails } from "../redux/actions";
// selectors
import { userStore } from "../redux/reducers/selectors";
// components
import CommonButton from "../util/commonButton";

const styles = theme => ({
  ...theme.styles,
  button: {
    float: "right"
  }
});

const EditDetails = ({ classes, credentials, editUserDetails }) => {
  const userBio = credentials.bio || "";
  const userWebsite = credentials.website || "";
  const userLocation = credentials.location || "";

  const [bio, setBio] = useState(userBio);
  const [website, setWebsite] = useState(userWebsite);
  const [location, setLocation] = useState(userLocation);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onChange = ev => {
    const { name, value } = ev.target;
    if (name === "bio") {
      setBio(value);
    }
    if (name === "website") {
      setWebsite(value);
    }
    if (name === "location") {
      setLocation(value);
    }
  };

  const onSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    };
    editUserDetails(userDetails);
    handleClose();
  };

  return (
    <>
      <CommonButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </CommonButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              row="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={onChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={onChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where do you live?"
              className={classes.textField}
              value={location}
              onChange={onChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  classes: shape({}).isRequired,
  editUserDetails: func.isRequired
};

const mapStateToProps = state => ({
  credentials: userStore(state).credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
