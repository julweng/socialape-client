import { get } from "lodash";
import { createSelector } from "reselect";
import { createLoadingSelector } from "./loadingReducer";
import { createErrorSelector } from "./errorReducer";
import ActionTypes from "../types";
import updateLikeCount from "./functions/updateLikeCount";

const initialState = {
  screams: [],
  scream: {}
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
        scream: state.scream.screamId === action.scream.screamId ? action.scream : state.scream
      };

    default:
      return state;
  }
}

// screams selectors
export const dataStore = rootState => get(rootState, "data", {});

// authSelector
export const screamsSelector = createSelector(
  dataStore,
  state => get(state, "screams", [])
);

// single scream Selector
export const singleScreamSelector = createSelector(
  dataStore,
  state => get(state, "scream", {})
);

// loading status selector
export const dataLoadingStatus = createLoadingSelector(["GET_SCREAMS"]);

// error status selector
export const dataErrorStatus = createErrorSelector([
  "GET_SCREAMS",
  "UNLIKE_SCREAMS",
  "LIKE_SCREAMS"
]);
