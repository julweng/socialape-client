import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { shape, bool, string, func, arrayOf } from "prop-types";
// material UI
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// components
import CommonButton from "../util/commonButton";
// redux
import { likeScream, unlikeScream } from "../redux/actions";
import { authSelector } from "../redux/reducers/selectors";
// helper
import isScreamLiked from "./functions/isScreamLiked";

const LikeButton = ({
  authenticated,
  screamId,
  likes,
  likeScream,
  unlikeScream
}) => {
  const screamHasBeenLiked = isScreamLiked(likes, screamId)

  const handleLikeScream = () => likeScream(screamId);

  const handleUnlikeScream = () => unlikeScream(screamId);

  return (
    <>
      {!authenticated ? (
        <Link to="/login">
          <CommonButton tip="Like">
            <FavoriteBorder color="primary" />
          </CommonButton>
        </Link>
      ) : screamHasBeenLiked ? (
        <CommonButton tip="Undo like" onClick={handleUnlikeScream}>
          <FavoriteIcon color="primary" />
        </CommonButton>
      ) : (
        <CommonButton tip="Like" onClick={handleLikeScream}>
          <FavoriteBorder color="primary" />
        </CommonButton>
      )}
    </>
  );
};

LikeButton.propTypes = {
  authenticated: bool.isRequired,
  screamId: string.isRequired,
  likeScream: func.isRequired,
  unlikeScream: func.isRequired,
  likes: arrayOf(shape({})).isRequired
};
const mapStateToProps = state => ({
  authenticated: authSelector(state)
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeButton);
