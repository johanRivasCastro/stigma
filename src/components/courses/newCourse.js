import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { courseActions } from "../../redux/course/course.action";
import { ErrorMessage } from "../../components/common/errorMessage";
import { REMOVE_NEW_COURSEID } from "../../redux/course/course.types";

import {
  makeStyles,
  withStyles,
  Button,
  Dialog,
  IconButton,
  Typography,
  Box,
  Card,
  Grid,
  TextField
} from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const useStyles = makeStyles({});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const NewCourse = ({
  open,
  history,
  handleClose,
  dispatch,
  currentUser,
  newCourseId
}) => {
  const [newCourse, setNewCourse] = useState({ name: "", description: "" });

  useEffect(() => {
    if (newCourseId) {
      dispatch({ type: REMOVE_NEW_COURSEID });
      history.push(`/courseDetails/${newCourseId}`);
    }
  }, [newCourseId]);

  const handleInputChange = e => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value
    });
  };

  const handleClickCreateCourse = e => {
    dispatch(
      courseActions.createCourse({ ...newCourse, user: { id: currentUser.id } })
    );
    // console.log(newCourseId);
    // if (newCourseId !== null) {
    //   console.log("!!!!!!!!!!!!");
    //   history.push(`/courseDetails/${newCourseId}`);
    //   dispatch({ type: REMOVE_NEW_COURSEID });
    // }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Course
        </DialogTitle>
        <DialogContent dividers>
          <ErrorMessage />
          <Box>
            <Grid container direction="row" justify="center">
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  required
                  name="name"
                  label="Name"
                  onChange={handleInputChange}
                  value={newCourse.name}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  multiline
                  rows="4"
                  required
                  name="description"
                  label="Description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickCreateCourse}
            color="primary"
            type="submit"
            disabled={newCourse.name == "" || newCourse.description == ""}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.authentication.currentUser,
    newCourseId: state.course.newCourseId
  };
};

const connectLoginPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(NewCourse)
);

export { connectLoginPage as NewCourse };
