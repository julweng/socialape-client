import React, {useState} from 'react';
import {shape, string, arrayOf, bool, number} from 'prop-types';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
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
import {credentialsSelector, likesSelector} from '../redux/reducers/selectors';
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
  authenticated,
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

  const [open, setOpen] = useState(false);

  // const [oldPath, setOldPath] = useState(window.location.pathname);

  // const [newPath, setNewPath] = useState('');

  const {handle} = useSelector((state) => credentialsSelector(state));

  const likes = useSelector((state) => likesSelector(state));

  const handleOpen = () => {
   /*
    setNewPath(`/users/${userHandle}/scream/${screamId}`);

    if (oldPath === newPath) {
      setOldPath(`/users/${userHandle}`);
    }
*/
    setOpen(true);

    // window.history.pushState(null, null, newPath);

    //dispatch(getScream(screamId));
  };

  const handleClose = () => {
   // window.history.pushState(null, null, oldPath);
    setOpen(false);
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
  authenticated: bool,
  likes: arrayOf(shape({})),
  credentials: shape({
    handle: string,
  }),
};

export default withStyles(styles)(Scream);
