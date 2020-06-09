import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// material UI
import Grid from '@material-ui/core/Grid';
// components
import Scream from '../components/Scream';
import Profile from '../components/Profile';
// redux
import {getScreams} from '../redux/actions';
import {dataStore, dataLoadingSelector} from '../redux/reducers/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const {screams} = useSelector((state) => dataStore(state));
  const loading = useSelector((state) => dataLoadingSelector(state));

  useEffect(() => {
    dispatch(getScreams());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recentScreams = !loading ? (
    screams.map((s) => <Scream key={s.screamId} scream={s} />)
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

export default Home;
