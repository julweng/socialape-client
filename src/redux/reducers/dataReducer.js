import {get, isEqual} from 'lodash';
import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect';
import ActionTypes from '../types';
import updateScreams from './functions/updateScreams';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  dataErrors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_SCREAMS_REQUEST:
    case ActionTypes.GET_SCREAM_REQUEST:
    case ActionTypes.POST_SCREAMS_REQUEST:
    case ActionTypes.DELETE_SCREAM_REQUEST:
    case ActionTypes.SUBMIT_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_SCREAMS_SUCCESS:
      return {
        ...state,
        screams: action.screams,
        loading: false,
      };

    case ActionTypes.LIKE_SCREAM_SUCCESS:
    case ActionTypes.UNLIKE_SCREAM_SUCCESS:
      return {
        loading: false,
        screams: updateScreams(state.screams, action.scream),
        scream:
          state.scream.screamId === action.scream.screamId
            ? action.scream
            : state.scream,
      };

    case ActionTypes.DELETE_SCREAM_SUCCESS:
      return {
        ...state,
        screams: state.screams.filter((s) => s.screamId !== action.screamId),
        loading: false,
      };

    case ActionTypes.POST_SCREAM_SUCCESS:
      return {
        ...state,
        screams: [action.scream, ...state.screams],
        loading: false,
      };
    case ActionTypes.GET_SCREAM_SUCCESS:
      return {
        ...state,
        scream: action.scream,
        loading: false,
      };
    case ActionTypes.CLOSE_SCREAM:
      return {
        ...state,
        scream: {},
        loading: false,
      };
    case ActionTypes.SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.data, ...state.scream.comments],
        },
        loading: false,
      };
    case ActionTypes.GET_SCREAMS_FAILURE:
    case ActionTypes.GET_SCREAM_FAILURE:
    case ActionTypes.DELETE_SCREAM_FAILURE:
    case ActionTypes.SUBMIT_COMMENT_FAILURE:
    case ActionTypes.POST_SCREAM_FAILURE:
      return {
        ...state,
        dataErrors: action.err,
      };
    default:
      return state;
  }
}

// selectors
export const dataStore = (rootState) => get(rootState, 'data', {});

// screams selector
export const screamsSelector = createSelector(dataStore, (state) =>
  get(state, 'screams', [])
);

// scream selector
const screamSelector = (rootState) => get(rootState, 'data.scream', {});

// deep equal selectors
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

// comments selector
export const commentsSelector = createDeepEqualSelector(
  screamSelector,
  (scream) => scream.comments
);

// loading selector
export const dataLoadingSelector = createSelector(dataStore, (state) =>
  get(state, 'loading', {})
);

// error selector
export const dataErrorsSelector = createSelector(dataStore, (state) =>
  get(state, 'dataErrors', {})
);
