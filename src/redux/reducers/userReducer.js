import { get } from "lodash";
import { createLoadingSelector } from "./loadingReducer";
import { createErrorSelector } from "./errorReducer";
import ActionTypes from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATED_USER_SUCCESS:
      return {
        ...state,
        authenticated: true
      };
    case ActionTypes.UNAUTHENTICATED_USER_SUCCESS:
      return initialState;
    case ActionTypes.GET_USER_SUCCESS:
      return {
        authenticated: true,
        ...action.data
      };
    default:
      return state;
  }
}

// user selectors
export const userStore = rootState => get(rootState, "user", {});

// loading status selector
export const isLoading = createLoadingSelector(
  [
    "AUTHENTICATED_USER",
    "UNAUTHENTICATED_USER",
    "GET_USER"
  ]
);

// error status selector
export const userErrors = createErrorSelector(
  [
    "AUTHENTICATED_USER",
    "UNAUTHENTICATED_USER",
    "GET_USER"
  ]
);
