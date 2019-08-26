import axios from "axios";
import ActionTypes from "../types";

const setAuthentication = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", `Bearer ${token}`);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
}

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
    type: ActionTypes.AUTHENTICATE_USER_REQUEST
  }
}

const loginUserSuccess = () => {
  return {
    type: ActionTypes.AUTHENTICATE_USER_SUCCESS
  }
}

const loginUserFailure = err => {
  return {
    type: ActionTypes.AUTHENTICATE_USER_FAILURE,
    err
  }
}

export const loginUser = (userData, history) => dispatch => {
  dispatch(loginUserRequest());
  axios
    .post("/login", userData)
    .then(res => {
      setAuthentication(res.data.token);
      dispatch(loginUserSuccess());
      dispatch(getUser());
      history.push("/");
    })
    .catch(err => {
      dispatch(loginUserFailure(err.response.data))
    });
};

// signup user
const signupUserRequest = () => {
  return {
    type: ActionTypes.SIGNUP_USER_REQUEST
  }
}

const signupUserSuccess = () => {
  return {
    type: ActionTypes.SIGNUP_USER_SUCCESS
  }
}

const signupUserFailure = err => {
  return {
    type: ActionTypes.SIGNUP_USER_FAILURE,
    err
  }
}

export const signupUser = (userData, history) => dispatch => {
  dispatch(signupUserRequest());
  axios
    .post("/signup", userData)
    .then(res => {
      setAuthentication(res.data.token);
      dispatch(signupUserSuccess());
      dispatch(getUser());
      history.push("/");
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch(signupUserFailure(err.response.data))
    });
};

// logout user
export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: ActionTypes.UNAUTHENTICATE_USER })
}

// re-authenticate user if token is not expired
export const reAuthenticateUser = token => dispatch => {
  dispatch(loginUserSuccess());
  axios.defaults.headers.common['Authorization'] = token;
  //dispatch(getUser());
}

// upload image
const uploadImageRequest = () => {
  return {
    type: ActionTypes.UPLOAD_IMAGE_REQUEST
  }
}

const uploadImageSuccess = () => {
  return {
    type: ActionTypes.UPLOAD_IMAGE_SUCCESS
  }
}

const uploadImageFailure = err => {
  return {
    type: ActionTypes.UPLOAD_IMAGE_FAILURE,
    err
  }
}

export const uploadImage = formData => dispatch => {
  dispatch(uploadImageRequest())
  axios.post("/user/image", formData)
    .then(() => {
      dispatch(getUser())
      dispatch(uploadImageSuccess())
    })
    .catch(err => {
      console.log(err)
      dispatch(uploadImageFailure())
    })
}



