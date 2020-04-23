import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import {
  Button,
  TextField,
  Box,
  withStyles,
  Dialog,
  Typography,
  Grid,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { subjectActions } from "../../redux/subject/subject.action";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ErrorMessage } from "../common/errorMessage";
import SubjectTable from "./subjectTable";

import { makeStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles({
  table: {
    boxShadow: "none",
  },
});

const SubjectDialog = ({ open, setOpen, subjects, dispatch, errorMessage }) => {
  const classes = useStyles();

  useEffect(() => {
    setState({ ...state, data: [...subjects] });
  }, [subjects]);

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Description", field: "description" },
      { title: "Credits", field: "credits", type: "numeric" },
    ],
    data: subjects,
  });

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={closeDialog}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle onClose={closeDialog}>
        Subjects
        <ErrorMessage />
      </DialogTitle>
      <DialogContent dividers>
        <MaterialTable
          title=""
          columns={state.columns}
          data={state.data}
          className={classes.table}
          options={{
            actionsColumnIndex: -1,
            headerStyle: {
              fontWeight: "bold",
            },
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  dispatch(subjectActions.createSubject(newData));
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  dispatch(subjectActions.editSubject(newData));
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  dispatch(subjectActions.deleteSubject(oldData.id));
                }, 600);
              }),
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.alertInfo.errorMessage,
    subjects: state.subject.subjects,
  };
};

const connectLoginPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false,
  })(SubjectDialog)
);

export { connectLoginPage as SubjectDialog };
