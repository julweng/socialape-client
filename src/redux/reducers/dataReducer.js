import { get } from "lodash";
import { createSelector } from "reselect";
import { createLoadingSelector } from "./loadingReducer";
import { createErrorSelector } from "./errorReducer";
import ActionTypes from "../types";
import updateLikeCount from "./functions/updateLikeCount";

const initialState = {
  screams: [],
  scream: {},
  dataErrors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_SCREAMS_SUCCESS:
      return {
        ...state,
        screams: action.screams
      };
    case ActionTypes.LIKE_SCREAM_SUCCESS:
    case ActionTypes.UNLIKE_SCREAM_SUCCESS:
      return {
        screams: updateLikeCount(state.screams, action.scream),
        scream:
          state.scream.screamId === action.scream.screamId
            ? action.scream
            : state.scream
      };

    case ActionTypes.DELETE_SCREAM_SUCCESS:
      return {
        ...state,
        screams: state.screams.filter(s => s.screamId !== action.screamId)
      };

    case ActionTypes.POST_SCREAM_SUCCESS:
      return {
        ...state,
        screams: [action.scream, ...state.screams]
      };
    case ActionTypes.POST_SCREAM_FAILURE:
      return {
        ...state,
        dataErrors: action.err
      };
    case ActionTypes.GET_SCREAM_SUCCESS:
      return {
        ...state,
        scream: action.scream
      };
    default:
      return state;
  }
}

// selectors
export const dataStore = rootState => get(rootState, "data", {});

// screams selector
export const screamsSelector = createSelector(
  dataStore,
  state => get(state, "screams", [])
);

// single scream Selector
export const singleScreamSelector = createSelector(
  dataStore,
  state => get(state, "scream", {})
);

// error selector
export const dataErrorsSelector = createSelector(
  dataStore,
  state => get(state, "dataErrors", {})
);
// loading status selector
export const dataLoadingStatus = createLoadingSelector([
  "GET_SCREAMS",
  "POST_SCREAM",
  "GET_SCREAM"
]);

// error status selector
export const dataErrorStatus = createErrorSelector([
  "GET_SCREAMS",
  "UNLIKE_SCREAMS",
  "LIKE_SCREAMS",
  "GET_SCREAM"
]);
