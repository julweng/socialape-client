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
  authSelector,
  dataLoadingStatus,
  dataErrorStatus,
} from '../redux/reducers/selectors';

const styles = (theme) => ({...theme.styles});

const CommentForm = ({
  screamId,
  classes: {button, textField, visibleSeparator},
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleChange = (ev) => {
    setComment(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(submitComment(screamId, {body: comment}));
    setComment('');
  };

  const authenticated = useSelector((state) => authSelector(state));
  const hasError = useSelector((state) => dataErrorStatus(state));

  const renderCommentForm = authenticated ? (
    <Grid item sm={12} style={{textAlign: 'center'}}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={hasError ? true : false}
          helperText={hasError}
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
