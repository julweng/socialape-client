import React, {useState} from 'react';
import {shape, string, arrayOf, number} from 'prop-types';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// material UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ChatIcon from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import withStyles from '@material-ui/core/styles/withStyles';
// redux
import {closeScream} from '../redux/actions';
import {
  authSelector,
  credentialsSelector,
  likesSelector,
} from '../redux/reducers/selectors';
// components
import CommonButton from '../util/commonButton';
import LikeButton from './LikeButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
};

const Scream = ({
  classes,
  scream,
  scream: {
    body,
    createdAt,
    commentCount,
    likeCount,
    screamId,
    userHandle,
    userImage,
  },
}) => {
  dayjs.extend(relativeTime);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const {handle} = useSelector((state) => credentialsSelector(state));

  const likes = useSelector((state) => likesSelector(state));

  const authenticated = useSelector((state) => authSelector(state));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(closeScream());
  };

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} likes={likes} />
        <span>{likeCount} Likes</span>
        <CommonButton tip="comments">
          <ChatIcon color="primary" />
        </CommonButton>
        <span>{commentCount} Comments</span>
        <CommonButton
          onClick={handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </CommonButton>
        <ScreamDialog
          scream={scream}
          likes={likes}
          handleClose={handleClose}
          open={open}
        />
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  classes: shape({
    card: string,
    image: string,
    content: string,
  }).isRequired,
  body: string,
  createdAt: string,
  commentCount: string,
  likeCount: number,
  screamId: string,
  userHandle: string,
  userImage: string,
  scream: shape({}),
  likes: arrayOf(shape({})),
  credentials: shape({
    handle: string,
  }),
};

export default withStyles(styles)(Scream);
