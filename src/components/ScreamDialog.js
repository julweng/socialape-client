import React, {useEffect} from 'react';
import {shape, bool, string, arrayOf} from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
// material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

import ChatIcon from '@material-ui/icons/Chat';
// redux
import {getScream} from '../redux/actions';
import {
  dataLoadingStatus,
  singleScreamSelector,
} from '../redux/reducers/selectors';
// components
import CommonButton from '../util/commonButton';
import LikeButton from './LikeButton';

const styles = (theme) => ({
  ...theme.styles,
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 150,
    height: 150,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '5%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

const ScreamDialog = ({
  classes,
  handleClose,
  likes,
  open,
  scream: {
    body,
    commentCount,
    createdAt,
    likeCount,
    screamId,
    userHandle,
    userImage,
  },
}) => {
  const dispatch = useDispatch();
  
  const loading = useSelector((state) => dataLoadingStatus(state));

  const singleScream = useSelector((state) => singleScreamSelector(state));
  
  useEffect(() => {
    const isSingleScreamEmpty = Object.keys(singleScream).length === 0
    
    if (isSingleScreamEmpty) {
      dispatch(getScream(screamId));
    }
    
  }, [dispatch, screamId, singleScream]);

  const {comments} = singleScream

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} thickness={2} />
    </div>
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
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <CommonButton
        tip="Close"
        onClick={handleClose}
        tipClassName={classes.closeButton}
      >
        <CloseIcon />
      </CommonButton>
      <DialogContent className={classes.dialogContent}>
        {dialogMarkup}
      </DialogContent>
    </Dialog>
  );
};

ScreamDialog.propTypes = {
  scream: shape({}),
  loading: bool,
  classes: shape({
    invisibleSeparator: string,
    profileImage: string,
    closeButton: string,
    spinnerDiv: string,
  }).isRequired,
  likes: arrayOf(shape({})).isRequired,
};

export default withStyles(styles)(ScreamDialog);
