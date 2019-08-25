import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios"
// material UI
import Grid from "@material-ui/core/Grid";
// components
import Scream from "../components/Scream";
import Profile from "../components/Profile";
import { getUser } from "../redux/actions/userActions";

const Home = props => {
  const [screams, setScreams] = useState([]);

  useEffect(() => {
    props.getUser()
    axios
      .get("/screams")
      .then(res => setScreams(res.data))
      .catch(err => console.log(err));
  }, []);

  const recentScreams = screams.length ? (
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

export default connect(null, { getUser })(Home);
