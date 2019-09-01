import React, { useState } from "react";
import { shape, bool, string, arrayOf } from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// selectors
import { dataLoadingStatus } from "../redux/reducers/selectors";
// components
import CommonButton from "../util/commonButton";
import LikeButton from "./LikeButton"

const styles = theme => ({
  ...theme.styles,
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 150,
    height: 150,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
});

const ScreamDialog = ({
  classes,
  loading,
  likes,
  scream: { body, createdAt, commentCount, screamId, userHandle, userImage, likeCount }
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const renderDialog = loading ? (
   <div className={classes.spinnerDiv}><CircularProgress size={100} thickness={2}/></div>
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={3}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/user/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} likes={likes} />
        <span>{likeCount} Likes</span>
        <CommonButton tip="comments">
          <ChatIcon color="primary" />
        </CommonButton>
        <span>{commentCount} Comments</span>
      </Grid>
    </Grid>
  );

  return (
    <>
      <CommonButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </CommonButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <CommonButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </CommonButton>
        <DialogContent className={classes.dialogContent}>
          {renderDialog}
        </DialogContent>
      </Dialog>
    </>
  );
};

ScreamDialog.propTypes = {
  scream: shape({}),
  loading: bool,
  classes: shape({
    invisibleSeparator: string,
    profileImage: string,
    closeButton: string,
    expandButton: string,
    spinnerDiv: string
  }).isRequired,
  likes: arrayOf(shape({})).isRequired
};

const mapStateToProps = state => ({
  loading: dataLoadingStatus(state)
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(ScreamDialog));
