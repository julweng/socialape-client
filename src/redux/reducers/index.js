import { combineReducers } from "redux"

import dataReducer from "./dataReducer"
import uiReducer from "./uiReducer"
import userReducer from "./userReducer"
import loadingReducer from "./loadingReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
  user: userReducer,
  // data: dataReducer,
  // ui: uiReducer,
  requestStatus: combineReducers({
    loading: loadingReducer,
    errors: errorReducer
  })
})