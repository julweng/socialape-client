import React from "react";
import axios from "axios"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux";
// material UI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// redux
import store from "./redux/store";
import { logoutUser, reAuthenticateUser } from "./redux/actions";
// utils
import themeStyles from "./util/theme";
import AuthRoute from "./util/authRoute";
// components
import Navbar from "./components/Navbar";
// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./App.css";

const theme = createMuiTheme(themeStyles);

axios.defaults.baseURL =
  "https://us-central1-socialape-a5789.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch(reAuthenticateUser(token));
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                />
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
