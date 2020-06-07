// User reducer types
const ActionTypes = {
  AUTHENTICATE_USER_REQUEST: 'AUTHENTICATE_USER_REQUEST',
  AUTHENTICATE_USER_SUCCESS: 'AUTHENTICATE_USER_SUCCESS',
  AUTHENTICATE_USER_FAILURE: 'AUTHENTICATE_USER_FAILURE',

  UNAUTHENTICATE_USER: 'UNAUTHENTICATE_USER',

  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',

  SIGNUP_USER_REQUEST: 'SIGNUP_USER_REQUEST',
  SIGNUP_USER_SUCCESS: 'SIGNUP_USER_SUCCESS',
  SIGNUP_USER_FAILURE: 'SIGNUP_USER_FAILURE',

  UPLOAD_IMAGE_REQUEST: 'UPLOAD_IMAGE_REQUEST',
  UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
  UPLOAD_IMAGE_FAILURE: 'UPLOAD_IMAGE_FAILURE',

  EDIT_USER_DETAILS_REQUEST: 'EDIT_USER_DETAILS_REQUEST',
  EDIT_USER_DETAILS_SUCCESS: 'EDIT_USER_DETAILS_SUCCESS',
  EDIT_USER_DETAILS_FAILURE: 'EDIT_USER_DETAILS_FAILURE',

  GET_SCREAMS_REQUEST: 'GET_SCREAMS_REQUEST',
  GET_SCREAMS_SUCCESS: 'GET_SCREAMS_SUCCESS',
  GET_SCREAMS_FAILURE: 'GET_SCREAMS_FAILURE',

  LIKE_SCREAM_REQUEST: 'LIKE_SCREAM_REQUEST',
  LIKE_SCREAM_SUCCESS: 'LIKE_SCREAM_SUCCESS',
  LIKE_SCREAM_FAILURE: 'LIKE_SCREAM_FAILURE',

  UNLIKE_SCREAM_REQUEST: 'UNLIKE_SCREAM_REQUEST',
  UNLIKE_SCREAM_SUCCESS: 'UNLIKE_SCREAM_SUCCESS',
  UNLIKE_SCREAM_FAILURE: 'UNLIKE_SCREAM_FAILURE',

  DELETE_SCREAM_REQUEST: 'DELETE_SCREAM_REQUEST',
  DELETE_SCREAM_SUCCESS: 'DELETE_SCREAM_SUCCESS',
  DELETE_SCREAM_FAILURE: 'DELETE_SCREAM_FAILURE',

  POST_SCREAM_REQUEST: 'POST_SCREAM_REQUEST',
  POST_SCREAM_SUCCESS: 'POST_SCREAM_SUCCESS',
  POST_SCREAM_FAILURE: 'POST_SCREAM_FAILURE',

  GET_SCREAM_REQUEST: 'GET_SCREAM_REQUEST',
  GET_SCREAM_SUCCESS: 'GET_SCREAM_SUCCESS',
  GET_SCREAM_FAILURE: 'GET_SCREAM_FAILURE',

  SUBMIT_COMMENT_REQUEST: 'SUBMIT_COMMENT_REQUEST',
  SUBMIT_COMMENT_SUCCESS: 'SUBMIT_COMMENT_SUCCESS',
  SUBMIT_COMMENT_FAILURE: 'SUBMIT_COMMENT_FAILURE',
};

export default ActionTypes;
