import React, { useState, useEffect } from "react";
import {
  Container,
  CardMedia,
  makeStyles,
  Typography,
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from "@material-ui/core/";

import { connect } from "react-redux";
import { userActions } from "../redux/user/user.action";
import { withRouter } from "react-router-dom";
import { ErrorMessage } from "../components/common/errorMessage";
import { session } from "../helpers/session";
import { ERROR_MESSAGE } from "../redux/alert.types";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: "150px",
    height: "150px",
  },
  userPhoto: {
    width: "100%",
    height: "auto",
  },
}));

const ResetPassword = ({ dispatch, loggedIn, history, loggedUser }) => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (loggedIn) {
      setCurrentUser(session.getUser());
      if (
        !loggedUser.roles.find((role) => {
          return role.authority === "ROLE_pino";
        })
      ) {
        history.push("/users");
      }
    }
  }, [loggedUser]);

  const [credentials, setCredentials] = useState({
    password1: "",
    password2: "",
  });

  const handleLoginOnClick = (e) => {
    e.preventDefault();
    if (credentials.password1 !== credentials.password2) {
      dispatch({ type: ERROR_MESSAGE, message: "The passwords don't match" });
    } else {
      const fRoles = removeResetRole();
      dispatch(
        userActions.editUser({
          id: currentUser.id,
          roles: fRoles,
          password: credentials.password1,
        })
      );
    }
  };

  const removeResetRole = () => {
    const filtered = currentUser.roles.filter((role) => {
      return role.authority !== "ROLE_pino";
    });
    filtered.forEach((role) => {
      delete role.authority;
      delete role.description;
    });
    return filtered;
  };

  const handleFieldsOnChange = (e) => {
    const {
      target: { name, value },
    } = e;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ErrorMessage />
        <Typography component="h1" variant="h5">
          {`Wellcome ${
            session.getUser().name
          }, you need to reset your asigned password before continue`}
        </Typography>
        <form className={classes.form} onSubmit={handleLoginOnClick}>
          <Box mb={3}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password1"
              label="New Password"
              type="password"
              id="password1"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleFieldsOnChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            />
          </Box>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="password2"
            label="Rewrite your new Password"
            type="password"
            id="password2"
            autoComplete="current-password"
            value={credentials.passwordC}
            onChange={handleFieldsOnChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authentication.loggedIn,
    loggedUser: state.authentication.currentUser,
  };
};

const connectLoginPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false,
  })(ResetPassword)
);

export { connectLoginPage as ResetPassword };
