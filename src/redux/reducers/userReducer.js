import {get} from 'lodash';
import {createSelector} from 'reselect';
import ActionTypes from '../types';

const initialState = {
  authenticated: false,
  credentials: {
    bio: '',
    createdAt: '',
    imageUrl: '',
    location: '',
    handle: '',
    website: '',
  },
  likes: [],
  notifications: [],
  authErrors: {
    email: '',
    password: '',
    general: '',
    error: '',
  },
  signupErrors: {
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
  },
  getUserError: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_USER_REQUEST:
    case ActionTypes.SIGNUP_USER_REQUEST:
    case ActionTypes.GET_USER_REQUEST:
    case ActionTypes.UPLOAD_IMAGE_REQUEST:
    case ActionTypes.EDIT_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.AUTHENTICATE_USER_SUCCESS:
    case ActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case ActionTypes.UNAUTHENTICATE_USER:
      return initialState;
    case ActionTypes.GET_USER_SUCCESS: {
      return {
        authenticated: true,
        ...action.data,
        loading: false,
      };
    }
    case ActionTypes.AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        authErrors: action.err,
        loading: false,
      };
    case ActionTypes.SIGNUP_USER_FAILURE:
      return {
        ...state,
        signupErrors: action.err,
        loading: false,
      };
    case ActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        userErrors: action.err,
        loading: false,
      };
    case ActionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.EDIT_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.LIKE_SCREAM_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.scream.screamId,
          },
        ],
      };
    case ActionTypes.UNLIKE_SCREAM_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: state.likes.filter((l) => l.screamId !== action.scream.screamId),
      };
    default:
      return state;
  }
}

// user selectors
export const userStore = (rootState) => get(rootState, 'user', {});

// authSelector
export const authSelector = createSelector(userStore, (state) =>
  get(state, 'authenticated', false)
);

// credentials selector
export const credentialsSelector = createSelector(userStore, (state) =>
  get(state, 'credentials', {})
);

// likes selector
export const likesSelector = createSelector(userStore, (state) =>
  get(state, 'likes', [])
);

// error selectors
export const authErrors = createSelector(userStore, (state) =>
  get(state, 'authErrors', {})
);
export const signupErrors = createSelector(userStore, (state) =>
  get(state, 'signupErrors', {})
);

// loading status selector
export const userLoadingSelector = createSelector(userStore, (state) =>
  get(state, 'loading', false)
);
