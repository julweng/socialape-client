import React, {useState} from 'react';
import {shape, string} from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// redux
import {useDispatch, useSelector} from 'react-redux';
import {submitComment} from '../redux/actions/dataActions';
import {
  authSelector
} from '../redux/reducers/selectors';

const styles = (theme) => ({...theme.styles});

const CommentForm = ({
  screamId,
  classes: {button, textField, visibleSeparator},
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);

  const handleChange = (ev) => {
    setCommentError(false);
    setComment(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (comment.trim().length === 0) {
      setCommentError(true);
    }
    dispatch(submitComment(screamId, {body: comment}));
    setComment('');
  };

  const authenticated = useSelector((state) => authSelector(state));

  const renderCommentForm = authenticated ? (
    <Grid item sm={12} style={{textAlign: 'center'}}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={commentError}
          helperText={commentError}
          value={comment}
          onChange={handleChange}
          fullWidth
          className={textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={button}
        >
          Submit
        </Button>
      </form>
      <hr className={visibleSeparator} />
    </Grid>
  ) : null;

  return renderCommentForm;
};

CommentForm.propTypes = {
  classes: shape({
    button: string,
    textField: string,
    visibleSeparator: string,
  }),
  screamId: string,
};

export default withStyles(styles)(CommentForm);
