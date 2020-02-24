import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { REMOVE_SUCCESS_MESSAGE } from "../../redux/alert.types";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const SuccessMessage = ({ successMessage, dispatch }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (successMessage.success) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch({ type: REMOVE_SUCCESS_MESSAGE });
      }, 4000);
    }
  }, [successMessage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Alert severity="success">This is a success message!</Alert>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    successMessage: state.alertInfo.successMessage
  };
};

const connectLoginPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(SuccessMessage)
);

export { connectLoginPage as SuccessMessage };
