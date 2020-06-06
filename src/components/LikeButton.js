import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {shape, string, arrayOf} from 'prop-types';
// material UI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// components
import CommonButton from '../util/commonButton';
// redux
import {likeScream, unlikeScream} from '../redux/actions';
import {authSelector} from '../redux/reducers/selectors';
// helper
import isScreamLiked from './functions/isScreamLiked';

const LikeButton = ({likes, screamId}) => {
  const dispatch = useDispatch();

  const screamHasBeenLiked = isScreamLiked(likes, screamId);

  const handleLikeScream = () => dispatch(likeScream(screamId));

  const handleUnlikeScream = () => dispatch(unlikeScream(screamId));

  const authenticated = useSelector((state) => authSelector(state));

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
  screamId: string.isRequired,
  likes: arrayOf(shape({})).isRequired,
};

export default LikeButton;
