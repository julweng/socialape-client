import React, { useEffect } from "react";
import { func, arrayOf, shape, bool } from "prop-types";
import { connect } from "react-redux";
// material UI
import Grid from "@material-ui/core/Grid";
// components
import Scream from "../components/Scream";
import Profile from "../components/Profile";
// redux
import { getScreams } from "../redux/actions";
import { dataStore, dataLoadingStatus } from "../redux/reducers/selectors";

const Home = ({ getScreams, data: { screams }, loading }) => {
  useEffect(() => {
    getScreams();
  }, [getScreams]);
  const recentScreams = !loading ? (
    screams.map(s => <Scream key={s.screamId} scream={s} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentScreams}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: func.isRequired,
  data: shape({
    screams: arrayOf(shape({}))
  }).isRequired,
  loading: bool.isRequired
};

const mapStateToProps = state => ({
  data: dataStore(state),
  loading: dataLoadingStatus(state)
});

export default connect(
  mapStateToProps,
  { getScreams }
)(Home);
