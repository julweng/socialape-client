import React from "react";
import { shape, string, func, arrayOf, bool } from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// material UI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// redux
import { likeScream, unlikeScream } from "../redux/actions";
import {
  authSelector,
  likesSelector,
  credentialsSelector
} from "../redux/reducers/selectors";
// components
import CommonButton from "../util/commonButton";
import DeleteScream from "./DeleteScream"
// helper
import isScreamLiked from "./functions/isScreamLiked";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

const Scream = ({
  classes,
  authenticated,
  credentials: {
    handle
  },
  likes,
  scream: {
    body,
    createdAt,
    commentCount,
    likeCount,
    screamId,
    userHandle,
    userImage
  },
  likeScream,
  unlikeScream
}) => {
  console.log(userHandle, handle)
  dayjs.extend(relativeTime);

  const screamHasBeenLiked = isScreamLiked(likes, screamId);

  const handleLikeScream = () => likeScream(screamId);

  const handleUnlikeScream = () => unlikeScream(screamId);

  const likeButton = !authenticated ? (
    <CommonButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </CommonButton>
  ) : screamHasBeenLiked ? (
    <CommonButton tip="Undo like" onClick={handleUnlikeScream}>
      <FavoriteIcon color="primary" />
    </CommonButton>
  ) : (
    <CommonButton tip="Like" onClick={handleLikeScream}>
      <FavoriteBorder color="primary" />
    </CommonButton>
  );

  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId} />
  ) : null
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
        {likeButton}
        <span>{likeCount} Likes</span>
        <CommonButton tip="comments">
          <ChatIcon color="primary" />
        </CommonButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  classes: shape({
    card: string,
    image: string,
    content: string
  }).isRequired,
  body: string,
  createdAt: string,
  // commentCount,
  // likeCount,
  // screamId,
  userHandle: string,
  userImage: string,
  likeScream: func.isRequired,
  unlikeScream: func.isRequired,
  scream: shape({}),
  authenticated: bool,
  likes: arrayOf(shape({})),
  credentials: shape({
    handle: string
  })
};

const mapStateToProps = state => ({
  credentials: credentialsSelector(state),
  authenticated: authSelector(state),
  likes: likesSelector(state)
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scream));
