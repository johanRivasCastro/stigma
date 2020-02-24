import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  Box,
  Grid,
  CardMedia,
  Card,
  FormControlLabel,
  Switch
} from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import config from "../../config/config";
import { TextField } from "@material-ui/core";
import userImg from "../../assets/user.jfif";

import { userActions } from "../../redux/user/user.action";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    cursor: "pointer"
  },
  userPhoto: {
    width: "225px",
    height: "auto"
  },
  detailsContainer: {
    margin: "50px auto",
    width: "90%",
    maxWidth: "1000px",
    color: "white"
  },
  card: {
    width: "100%",
    height: "100%",
    padding: "15px"
  },
  icon: {
    fontSize: "200px",
    color: "#3f51b5"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
  return (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );
};

const UserDetails = ({ open, setOpen, id, users, dispatch, roles }) => {
  const classes = useStyles();
  const uploadsEndPoint = "uploads/";

  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [userRoles, setUserRoles] = useState(new Map());

  useEffect(() => {
    if (id) {
      const currentUser = users.filter(user => {
        return user.id === id;
      });
      setUser(...currentUser);
      const uRoles = new Map();
      roles.forEach(role => {
        uRoles.set(
          role.authority,
          currentUser[0].roles.some(r => r.authority === role.authority)
        );
      });
      setUserRoles(uRoles);
    } else {
      setEdit(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    let selectedRoles = [];

    for (let [key, value] of userRoles.entries()) {
      if (value) {
        const matched = roles.find(role => {
          return role.authority === key;
        });
        if (matched) selectedRoles.push({ id: matched.id });
      }
    }

    if (id) {
      dispatch(userActions.editUser({ ...user, roles: selectedRoles }));
    } else {
      dispatch(userActions.createUser({ ...user, roles: selectedRoles }));
    }
    setOpen(false);
  };

  const handleClickEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = e => {
    if (!edit) return;
    const {
      target: { name, value }
    } = e;

    let nValue = value;
    if (name === "enable") {
      nValue = value === "true" ? true : false;
    }

    setUser({
      ...user,
      [name]: nValue
    });
  };

  const handleCheckRoles = e => {
    if (!edit) return;
    userRoles.set(e.target.name, e.target.checked);
    setUserRoles(new Map(userRoles));
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography
              variant="h6"
              className={classes.title}
              onClick={handleClose}
            >
              Cancel
            </Typography> */}

            {id && (
              <Button autoFocus color="inherit" onClick={handleClickEdit}>
                {!edit ? "Edit" : "Cancel"}
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box className={classes.detailsContainer}>
          <form onSubmit={handleOnSubmit}>
            <Card className={classes.card}>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={3}>
                  <CardMedia>
                    <img
                      className={classes.userPhoto}
                      src={
                        user.photo
                          ? `${config.baseUrl + uploadsEndPoint + user.photo}`
                          : userImg
                      }
                    />
                  </CardMedia>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container direction="row" spacing={3} justify="center">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        required
                        name="name"
                        label="Name"
                        onChange={handleInputChange}
                        value={user.name || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        required
                        name="lastname"
                        label="Lastname"
                        value={user.lastname || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        required
                        name="email"
                        label="Email"
                        type="email"
                        value={user.email || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        required
                        pattern=".{13,13}"
                        name="identification"
                        label="Identification"
                        value={user.identification || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        required
                        name="direction"
                        label="Direction"
                        value={user.direction || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    {id && (
                      <>
                        {" "}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            name=""
                            label="Started"
                            value={user.created || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            required
                            name=""
                            label="Last login"
                            value={
                              user.lastLogin || "The user has not logged in yed"
                            }
                            onChange={handleInputChange}
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={user.enable || false}
                            onChange={handleInputChange}
                            value={!user.enable || false}
                            name="enable"
                          />
                        }
                        label="Active"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {roles.map((role, i) => (
                        <FormControlLabel
                          key={i}
                          control={
                            <Checkbox
                              color="secondary"
                              name={role.authority}
                              value={role.authority}
                              checked={userRoles.get(role.authority)}
                              onChange={handleCheckRoles}
                            />
                          }
                          label={role.authority
                            .substring(5, role.authority.length)
                            .replace("_", " ")}
                        />
                      ))}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Box display="flex" justifyContent="flex-end">
                        {edit ? (
                          <Button autoFocus color="primary" type="submit">
                            {id ? "Save" : "Create"}
                          </Button>
                        ) : null}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.user.users,
    roles: state.role.roles
  };
};

const connectUserDetailsPage = connect(mapStateToProps, null, null, {
  pure: false
})(UserDetails);

export { connectUserDetailsPage as UserDetails };
