import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { roleActions } from "../../redux/role/role.action";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ErrorMessage } from "../../components/common/errorMessage";

//=======================

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
//===============

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

const useStyles = makeStyles({
  table: {
    minWidth: 500
  },
  dialog: {
    minWidth: "600px"
  },
  deleteIcon: {
    color: "red",
    cursor: "pointer"
  },
  tableContainer: {
    maxHeight: "300px"
  }
});

function RolesTable({ roles = [], dispatch }) {
  const classes = useStyles();

  const handleClickDeleteRole = id => {
    dispatch(roleActions.deleteRole(id));
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.authority.substring(5, row.authority.length)}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="center">
                <DeleteIcon
                  className={classes.deleteIcon}
                  onClick={() => handleClickDeleteRole(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const RoleDialog = ({ open, handleClose, roles, dispatch, errorMessage }) => {
  const classes = useStyles();

  const [inputValues, setInputValues] = useState({
    authority: "",
    description: ""
  });

  const handleInputChange = e => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleClickAddRole = () => {
    const { authority, description } = inputValues;
    const roleName = `ROLE_${authority.replace(" ", "")}`;
    dispatch(
      roleActions.createRole({ authority: roleName, description: description })
    );
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Roles
          <ErrorMessage />
        </DialogTitle>
        <DialogContent dividers>
          <Box mb={2}>
            <TextField
              autoFocus
              margin="dense"
              id="authority"
              label="Role name"
              type="text"
              fullWidth
              onChange={handleInputChange}
              value={inputValues.name}
              name="authority"
            />
          </Box>
          <Box mb={2}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              onChange={handleInputChange}
              value={inputValues.description}
              name="description"
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              variant="contained"
              onClick={handleClickAddRole}
              color="primary"
              disabled={
                inputValues.authority == "" || inputValues.description == ""
              }
            >
              Add
            </Button>
          </Box>
          <Box mb={3}>
            <RolesTable roles={roles} dispatch={dispatch} />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    roles: state.role.roles,
    errorMessage: state.alertInfo.errorMessage
  };
};

const connectLoginPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(RoleDialog)
);

export { connectLoginPage as RoleDialog };
