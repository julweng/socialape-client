import ActionTypes from "../types";
import axios from "axios";

// get screams
const getScreamsRequest = () => {
  return {
    type: ActionTypes.GET_SCREAMS_REQUEST
  };
};

const getScreamsSuccess = screams => {
  return {
    type: ActionTypes.GET_SCREAMS_SUCCESS,
    screams
  };
};

const getScreamsFailure = err => {
  return {
    type: ActionTypes.GET_SCREAMS_FAILURE,
    err
  };
};

export const getScreams = () => dispatch => {
  dispatch(getScreamsRequest());
  axios
    .get("/screams")
    .then(res => dispatch(getScreamsSuccess(res.data)))

    .catch(err => {
      console.log(err.response.data);
      dispatch(getScreamsFailure(err.response.data));
    });
};

// like a scream
const likeScreamRequest = () => {
  return {
    type: ActionTypes.LIKE_SCREAM_REQUEST
  };
};

const likeScreamSuccess = scream => {
  return {
    type: ActionTypes.LIKE_SCREAM_SUCCESS,
    scream
  };
};

const likeScreamFailure = err => {
  return {
    type: ActionTypes.LIKE_SCREAM_FAILURE,
    err
  };
};

export const likeScream = screamId => dispatch => {
  dispatch(likeScreamRequest());
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => dispatch(likeScreamSuccess(res.data)))

    .catch(err => {
      console.log(err.response.data);
      dispatch(likeScreamFailure(err.response.data));
    });
};

// unlike a scream
const unlikeScreamRequest = () => {
  return {
    type: ActionTypes.UNLIKE_SCREAM_REQUEST
  };
};

const unlikeScreamSuccess = scream => {
  return {
    type: ActionTypes.UNLIKE_SCREAM_SUCCESS,
    scream
  };
};

const unlikeScreamFailure = err => {
  return {
    type: ActionTypes.UNLIKE_SCREAM_FAILURE,
    err
  };
};

export const unlikeScream = screamId => dispatch => {
  dispatch(unlikeScreamRequest());
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => dispatch(unlikeScreamSuccess(res.data)))

    .catch(err => {
      console.log(err.response.data);
      dispatch(unlikeScreamFailure(err.response.data));
    });
};


