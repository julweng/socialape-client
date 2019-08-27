const isScreamLiked = (likes, screamId) => {
  if (likes.length && likes.find(l => l.screamId === screamId)) {
    return true;
  } else {
    return false;
  }
};

export default isScreamLiked;
