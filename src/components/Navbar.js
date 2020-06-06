import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/selectors';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
// component
import CommonButton from '../util/commonButton';
import PostScream from './PostScream';

const Navbar = () => {
  const authenticated = useSelector((state) => authSelector(state));
  return (
    <AppBar>
      <ToolBar className="nav__container">
        {authenticated ? (
          <>
            <PostScream />
            <Link to="/">
              <CommonButton tip="Home">
                <HomeIcon />
              </CommonButton>
            </Link>
            <CommonButton tip="Notifications">
              <Notifications />
            </CommonButton>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </ToolBar>
    </AppBar>
  );
};

export default Navbar;
