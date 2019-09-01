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

// post a scream
const postScreamRequest = () => {
  return {
    type: ActionTypes.POST_SCREAM_REQUEST
  };
};

const postScreamSuccess = scream => {
  return {
    type: ActionTypes.POST_SCREAM_SUCCESS,
    scream
  };
};

const postScreamFailure = err => {
  return {
    type: ActionTypes.POST_SCREAM_FAILURE,
    err
  };
};

export const postScream = newScream => dispatch => {
  dispatch(postScreamRequest());
  axios
    .post("/scream", newScream)
    .then(res => dispatch(postScreamSuccess(res.data)))

    .catch(err => {
      console.log(err.response.data);
      dispatch(postScreamFailure(err.response.data));
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

// delete a scream
const deleteScreamRequest = () => {
  return {
    type: ActionTypes.DELETE_SCREAM_REQUEST
  };
};

const deleteScreamSuccess = screamId => {
  return {
    type: ActionTypes.DELETE_SCREAM_SUCCESS,
    screamId
  };
};

const deleteScreamFailure = err => {
  return {
    type: ActionTypes.DELETE_SCREAM_FAILURE,
    err
  };
};

export const deleteScream = screamId => dispatch => {
  dispatch(deleteScreamRequest());
  axios
    .delete(`/scream/${screamId}`)
    .then(() => dispatch(deleteScreamSuccess(screamId)))
    .catch(err => {
      console.log(err.response.data);
      dispatch(deleteScreamFailure());
    });
};

// get one scream
const getScreamRequest = () => {
  return {
    type: ActionTypes.GET_SCREAM_REQUEST
  };
};

const getScreamSuccess = scream => {
  return {
    type: ActionTypes.GET_SCREAM_SUCCESS,
    scream
  };
};

const getScreamFailure = err => {
  return {
    type: ActionTypes.GET_SCREAM_FAILURE,
    err
  };
};

export const getScream = screamId => dispatch => {
  dispatch(getScreamRequest());
  axios
    .get(`/scream/${screamId}`)
    .then(res => dispatch(getScreamSuccess(res.data)))
    .catch(err => {
      console.log(err.response.data);
      dispatch(getScreamFailure(err));
    });
};
