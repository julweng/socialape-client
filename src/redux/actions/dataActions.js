import ActionTypes from '../types';
import axios from 'axios';

// get screams
const getScreamsRequest = () => {
  return {
    type: ActionTypes.GET_SCREAMS_REQUEST,
  };
};

const getScreamsSuccess = (screams) => {
  return {
    type: ActionTypes.GET_SCREAMS_SUCCESS,
    screams,
  };
};

const getScreamsFailure = (err) => {
  return {
    type: ActionTypes.GET_SCREAMS_FAILURE,
    err,
  };
};

export const getScreams = () => (dispatch) => {
  dispatch(getScreamsRequest());
  axios
    .get('/screams')
    .then((res) => dispatch(getScreamsSuccess(res.data)))

    .catch((err) => {
      console.log(err);
      dispatch(getScreamsFailure(err.response.data));
    });
};

// post a scream
const postScreamRequest = () => {
  return {
    type: ActionTypes.POST_SCREAM_REQUEST,
  };
};

const postScreamSuccess = (scream) => {
  return {
    type: ActionTypes.POST_SCREAM_SUCCESS,
    scream,
  };
};

const postScreamFailure = (err) => {
  return {
    type: ActionTypes.POST_SCREAM_FAILURE,
    err,
  };
};

export const postScream = (newScream) => (dispatch) => {
  dispatch(postScreamRequest());
  axios
    .post('/scream', newScream)
    .then((res) => dispatch(postScreamSuccess(res.data)))

    .catch((err) => {
      console.log(err);
      dispatch(postScreamFailure(err.response.data));
    });
};

// like a scream
const likeScreamRequest = () => {
  return {
    type: ActionTypes.LIKE_SCREAM_REQUEST,
  };
};

const likeScreamSuccess = (scream) => {
  return {
    type: ActionTypes.LIKE_SCREAM_SUCCESS,
    scream,
  };
};

const likeScreamFailure = (err) => {
  return {
    type: ActionTypes.LIKE_SCREAM_FAILURE,
    err,
  };
};

export const likeScream = (screamId) => (dispatch) => {
  dispatch(likeScreamRequest());
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => dispatch(likeScreamSuccess(res.data)))

    .catch((err) => {
      console.log(err);
      dispatch(likeScreamFailure(err.response.data));
    });
};

// unlike a scream
const unlikeScreamRequest = () => {
  return {
    type: ActionTypes.UNLIKE_SCREAM_REQUEST,
  };
};

const unlikeScreamSuccess = (scream) => {
  return {
    type: ActionTypes.UNLIKE_SCREAM_SUCCESS,
    scream,
  };
};

const unlikeScreamFailure = (err) => {
  return {
    type: ActionTypes.UNLIKE_SCREAM_FAILURE,
    err,
  };
};

export const unlikeScream = (screamId) => (dispatch) => {
  dispatch(unlikeScreamRequest());
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => dispatch(unlikeScreamSuccess(res.data)))

    .catch((err) => {
      console.log(err);
      dispatch(unlikeScreamFailure(err));
    });
};

// delete a scream
const deleteScreamRequest = () => {
  return {
    type: ActionTypes.DELETE_SCREAM_REQUEST,
  };
};

const deleteScreamSuccess = (screamId) => {
  return {
    type: ActionTypes.DELETE_SCREAM_SUCCESS,
    screamId,
  };
};

const deleteScreamFailure = (err) => {
  return {
    type: ActionTypes.DELETE_SCREAM_FAILURE,
    err,
  };
};

export const deleteScream = (screamId) => (dispatch) => {
  dispatch(deleteScreamRequest());
  axios
    .delete(`/scream/${screamId}`)
    .then(() => dispatch(deleteScreamSuccess(screamId)))
    .catch((err) => {
      console.log(err);
      dispatch(deleteScreamFailure());
    });
};

// get one scream
const getScreamRequest = () => {
  console.log('get scream request')
  return {
    type: ActionTypes.GET_SCREAM_REQUEST,
  };
};

const getScreamSuccess = (scream) => {
  return {
    type: ActionTypes.GET_SCREAM_SUCCESS,
    scream,
  };
};

const getScreamFailure = (err) => {
  return {
    type: ActionTypes.GET_SCREAM_FAILURE,
    err,
  };
};

export const getScream = (screamId) => (dispatch) => {
  dispatch(getScreamRequest());
  axios
    .get(`/scream/${screamId}`)
    .then((res) => dispatch(getScreamSuccess(res.data)))
    .catch((err) => {
      console.log(err);
      dispatch(getScreamFailure(err));
    });
};

// close scream
export const closeScream = () => {
  return {
    type: ActionTypes.CLOSE_SCREAM,
  };
};

// submit comment
const submitCommentRequest = () => {
  return {
    type: ActionTypes.SUBMIT_COMMENT_REQUEST,
  };
};

const submitCommentSuccess = (res) => {
  return {
    type: ActionTypes.SUBMIT_COMMENT_SUCCESS,
    data: res.data,
  };
};

const submitCommentFailure = (err) => {
  return {
    type: ActionTypes.SUBMIT_COMMENT_FAILURE,
    err,
  };
};

export const submitComment = (screamId, commentData) => (dispatch) => {
  dispatch(submitCommentRequest());
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch(submitCommentSuccess(res));
    })
    .catch((err) => {
      console.log('err')
      dispatch(submitCommentFailure(err));
    });
};
