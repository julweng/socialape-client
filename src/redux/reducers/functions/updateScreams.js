const updateScreams = (screams, scream) => {
  const newScreams = screams;
  const index = screams.findIndex((s) => s.screamId === scream.screamId);
  newScreams[index] = scream;
  return newScreams;
};

export default updateScreams;