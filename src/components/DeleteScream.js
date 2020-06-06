import React, {useState} from 'react';
import {string, shape} from 'prop-types';
import {useDispatch} from 'react-redux';
// material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
// components
import CommonButton from '../util/commonButton';
// redux
import {deleteScream} from '../redux/actions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
};

const DeleteScream = ({classes, screamId}) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  };

  return (
    <>
      <CommonButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </CommonButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this scream? This action is not
          reversible.
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteScream.propTypes = {
  classes: shape({}).isRequired,
  screamId: string,
};

export default withStyles(styles)(DeleteScream);
