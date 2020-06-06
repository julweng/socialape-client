import React, {Fragment} from 'react';
import {arrayOf, shape} from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
// material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.styles,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
});

const Comments = ({
  classes: {commentImage, commentData, invisibleSeparator, visibleSeparator},
  comments,
}) => {
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const {body, createdAt, userImage, userHandle} = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img src={userImage} alt="comment" className={commentImage} />
                </Grid>
                <Grid item sm={9}>
                  <div className={commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  classes: shape({}),
  comments: arrayOf(shape({})),
};

export default withStyles(styles)(Comments);
