import React from "react";
import { shape, string, arrayOf, bool, number } from "prop-types";
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
// redux
import {
  likesSelector,
  credentialsSelector
} from "../redux/reducers/selectors";
// components
import CommonButton from "../util/commonButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

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
  credentials: { handle },
  likes,
  scream,
  scream: {
    body,
    createdAt,
    commentCount,
    likeCount,
    screamId,
    userHandle,
    userImage
  }
}) => {
  dayjs.extend(relativeTime);

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
        <ScreamDialog scream={scream} likes={likes} />
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
  commentCount: string,
  likeCount: number,
  screamId: string,
  userHandle: string,
  userImage: string,
  scream: shape({}),
  authenticated: bool,
  likes: arrayOf(shape({})),
  credentials: shape({
    handle: string
  })
};

const mapStateToProps = state => ({
  credentials: credentialsSelector(state),
  likes: likesSelector(state)
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Scream));
