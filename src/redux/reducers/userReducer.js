import { get } from "lodash";
import { createSelector } from "reselect";
import { createLoadingSelector } from "./loadingReducer";
import { createErrorSelector } from "./errorReducer";
import ActionTypes from "../types";

const initialState = {
  authenticated: false,
  credentials: {
    bio: "",
    createdAt: "",
    imageUrl: "",
    location: "",
    handle: "",
    website: ""
  },
  likes: [],
  notifications: [],
  authErrors: {
    email: "",
    password: "",
    general: "",
    error: ""
  },
  signupErrors: {
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  },
  getUserError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_USER_SUCCESS:
    case ActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        authenticated: true
      };
    case ActionTypes.UNAUTHENTICATE_USER:
      return initialState;
    case ActionTypes.GET_USER_SUCCESS: {
      return {
        authenticated: true,
        ...action.data
      };
    }
    case ActionTypes.AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        authErrors: action.err
      };
    case ActionTypes.SIGNUP_USER_FAILURE:
      return {
        ...state,
        signupErrors: action.err
      };
    case ActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        userErrors: action.err
      };
    case ActionTypes.UPLOAD_IMAGE_SUCCESS:
    case ActionTypes.EDIT_USER_DETAILS_SUCCESS:
      return {
        ...state
      };
    case ActionTypes.LIKE_SCREAM_SUCCESS:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.scream.screamId
          }
        ]
      };
    case ActionTypes.UNLIKE_SCREAM_SUCCESS:
      return {
        ...state,
        likes: state.likes.filter(l => l.screamId !== action.scream.screamId)
      };
    default:
      return state;
  }
}

// user selectors
export const userStore = rootState => get(rootState, "user", {});

// authSelector
export const authSelector = createSelector(
  userStore,
  state => get(state, "authenticated", false)
);

// credentials selector
export const credentialsSelector = createSelector(
  userStore,
  state => get(state, "credentials", {})
);

// likes selector
export const likesSelector = createSelector(
  userStore,
  state => get(state, "likes", [])
);

// error selectors
export const authErrors = createSelector(
  userStore,
  state => get(state, "authErrors", {})
);
export const signupErrors = createSelector(
  userStore,
  state => get(state, "signupErrors", {})
);

// loading status selector
export const userLoadingStatus = createLoadingSelector([
  "AUTHENTICATED_USER",
  "SIGNUP_USER",
  "GET_USER",
  "UPLOAD_IMAGE",
  "EDIT_USER"
]);

// error status selector
export const userErrorStatus = createErrorSelector([
  "AUTHENTICATED_USER",
  "SIGNUP_USER",
  "GET_USER",
  "UPLOAD_IMAGE",
  "EDIT_USER"
]);
