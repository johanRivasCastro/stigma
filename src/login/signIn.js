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
  Grid
} from "@material-ui/core/";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import userImg from "../assets/user.jfif";

import { connect } from "react-redux";
import { loginActions } from "../redux/auth/auth.action";
import { withRouter } from "react-router-dom";
import { ErrorMessage } from "../components/common/errorMessage";

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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatar: {
    width: "150px",
    height: "150px"
  },
  userPhoto: {
    width: "100%",
    height: "auto"
  }
}));

const SignIn = ({ dispatch, loggedIn, history }) => {
  const classes = useStyles();

  useEffect(() => {
    if (loggedIn) {
      history.push("/users");
    }
  }, [loggedIn]);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLoginOnClick = e => {
    e.preventDefault();
    dispatch(loginActions.login(credentials));
  };

  const handleFieldsOnChange = e => {
    const {
      target: { name, value }
    } = e;

    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ErrorMessage />
        <Avatar className={classes.avatar}>
          <CardMedia>
            <img className={classes.userPhoto} src={userImg} />
          </CardMedia>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLoginOnClick}>
          <Box mb={3}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleFieldsOnChange}
            />
          </Box>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFieldsOnChange}
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
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

const mapStateToProps = state => {
  return {
    loggedIn: state.authentication.loggedIn
  };
};

const connectLoginPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(SignIn)
);

export { connectLoginPage as SignIn };
