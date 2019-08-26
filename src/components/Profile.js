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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
// component
import EditDetails from "./EditDetails"
// action creators
import { getUser, uploadImage, logoutUser } from "../redux/actions";
// selectors
import { userStore, userLoadingStatus } from "../redux/reducers/selectors";

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
  user: {
    authenticated,
    credentials: { bio, createdAt, handle, imageUrl, location, website }
  }
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
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton className="button" onClick={handleEditPicture}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
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
          <Tooltip title="Logout" placement="top">
            <IconButton onClick={handleLogout}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </Tooltip>
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
  user: shape({
    authenticated: bool,
    credentials: shape({})
  }).isRequired,
  loading: bool,
  getUser: func.isRequired,
  uploadImage: func.isRequired,
  logoutUser: func.isRequired
};

const mapStateToProps = state => ({
  user: userStore(state),
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
