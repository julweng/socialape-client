import axios from "axios";
import ActionTypes from "../types";

// get user
const getUserRequest = () => {
  return {
    type: ActionTypes.GET_USER_REQUEST
  }
}

const getUserSuccess = res => {
  return {
    type: ActionTypes.GET_USER_SUCCESS,
    data: res.data
  }
}

const getUserFailure = err => {
  return {
    type: ActionTypes.GET_USER_FAILURE,
    err
  }
}
export const getUser = () => dispatch => {
  dispatch(getUserRequest())
  axios
    .get("/user")
    .then(res => {
      dispatch(getUserSuccess(res))
    })
    .catch(err => dispatch(getUserFailure(err)));
};

// login user
const loginUserRequest = () => {
  return {
    type: ActionTypes.AUTHENTICATED_USER_REQUEST
  }
}

const loginUserSuccess = () => {
  return {
    type: ActionTypes.AUTHENTICATED_USER_SUCCESS
  }
}

const loginUserFailure = err => {
  return {
    type: ActionTypes.AUTHENTICATED_USER_FAILURE,
    err
  }
}

export const loginUser = (userData, history) => dispatch => {
  dispatch(loginUserRequest());
  axios
    .post("/login", userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      dispatch(loginUserSuccess());
      dispatch(getUser());
      history.push("/");
    })
    .catch(err => {
      dispatch(loginUserFailure(err.response.data))
    });
};



