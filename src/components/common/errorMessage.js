import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";

const ErrorMessage = ({ errorMessage, dispatch }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (errorMessage.error) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        dispatch({ type: "REMOVE_ERROR" });
      }, 4000);
    }
  }, [errorMessage]);

  return (
    <div>
      {showMessage && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage.message}
        </Alert>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    errorMessage: state.alertInfo.errorMessage
  };
};

const connectLoginPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(ErrorMessage)
);

export { connectLoginPage as ErrorMessage };
