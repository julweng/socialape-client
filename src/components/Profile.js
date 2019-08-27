import React, { useEffect } from "react";
import { connect } from "react-redux";
import { shape, bool, func } from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
// component
import EditDetails from "./EditDetails";
import CommonButton from "../util/commonButton";
// action creators
import { getUser, uploadImage, logoutUser } from "../redux/actions";
// selectors
import {
  credentialsSelector,
  authSelector,
  userLoadingStatus
} from "../redux/reducers/selectors";

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: theme.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

const Profile = ({
  classes,
  getUser,
  uploadImage,
  logoutUser,
  loading,
  authenticated,
  credentials: { bio, createdAt, handle, imageUrl, location, website }
} = {}) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleEditPicture = () => {
    const fileInput = document.getElementById("image-upload");
    fileInput.click();
  };

  const handleImageChange = ev => {
    const image = ev.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData);
  };

  const handleLogout = () => logoutUser();

  const profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="image-upload"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <CommonButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </CommonButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <CommonButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </CommonButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="login"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading...</p>
  );
  return profileMarkup;
};

Profile.propTypes = {
  classes: shape({}).isRequired,
  authenticated: bool.isRequired,
  credentials: shape({}).isRequired,
  loading: bool,
  getUser: func.isRequired,
  uploadImage: func.isRequired,
  logoutUser: func.isRequired
};

const mapStateToProps = state => ({
  authenticated: authSelector(state),
  credentials: credentialsSelector(state),
  loading: userLoadingStatus(state)
});

const mapDispatchToProps = {
  getUser,
  logoutUser,
  uploadImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
