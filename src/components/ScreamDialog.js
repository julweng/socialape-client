import React, {useEffect} from 'react';
import {shape, bool, string, arrayOf} from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs';
import {isEmpty} from 'lodash';
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
import {commentsSelector, dataLoadingSelector} from '../redux/reducers/selectors';
// components
import Comments from './Comments';
import CommentForm from './CommentForm';
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
  classes: {
    closeButton,
    dialogContent,
    invisibleSeparator,
    profileImage,
    spinnerDiv,
    visibleSeparator,
  },
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

  const loading = useSelector((state) => dataLoadingSelector(state));
console.log(loading)
  const comments = useSelector((state) => commentsSelector(state));

  useEffect(() => {
    if (!Array.isArray(comments) && isEmpty(comments))
      dispatch(getScream(screamId));
  }, [comments, dispatch, screamId]);

  const dialogMarkup = loading ? (
    <div className={spinnerDiv}>
      <CircularProgress size={100} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={3}>
        <img src={userImage} alt="Profile" className={profileImage} />
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
        <hr className={invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} likes={likes} />
        <span>{likeCount} Likes</span>
        <CommonButton tip="comments">
          <ChatIcon color="primary" />
        </CommonButton>
        <span>{commentCount} Comments</span>
        <hr className={visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} screamId={screamId} />
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <CommonButton
        tip="Close"
        onClick={handleClose}
        tipClassName={closeButton}
      >
        <CloseIcon />
      </CommonButton>
      <DialogContent className={dialogContent}>{dialogMarkup}</DialogContent>
    </Dialog>
  );
};

ScreamDialog.propTypes = {
  scream: shape({}),
  loading: bool,
  classes: shape({
    invisibleSeparator: string,
    visibleSeparator: string,
    profileImage: string,
    closeButton: string,
    spinnerDiv: string,
    dialogContent: string
  }).isRequired,
  likes: arrayOf(shape({})).isRequired,
};

export default withStyles(styles)(ScreamDialog);
