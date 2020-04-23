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
  Switch,
  Fab,
} from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import config from "../../config/config";
import { TextField } from "@material-ui/core";
import userImg from "../../assets/user.jfif";

import { userActions } from "../../redux/user/user.action";
import { session } from "../../helpers/session";

import { ErrorMessage } from "../common/errorMessage";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    cursor: "pointer",
  },
  userPhoto: {
    width: "auto",
    height: "auto",
    maxHeight: "170px",
  },
  detailsContainer: {
    margin: "50px auto",
    width: "90%",
    maxWidth: "1000px",
    color: "white",
  },
  card: {
    width: "100%",
    height: "100%",
    padding: "15px",
  },
  icon: {
    fontSize: "200px",
    color: "#3f51b5",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
  return (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );
};

const UserDetails = ({
  open,
  setOpen,
  userDetails = {},
  dispatch,
  roles,
  successMessage,
}) => {
  const classes = useStyles();
  const uploadsEndPoint = "uploads/";

  const [user, setUser] = useState(userDetails);
  const [edit, setEdit] = useState(false);
  const [userRoles, setUserRoles] = useState(new Map());
  const [changePhoto, setChangePhoto] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (!isThereUser()) {
      setEdit(true);
    } else {
      if (user.id === session.getUser().id) {
        setIsCurrentUser(true);
      }
      setupUserRoles();
    }

    if (successMessage.success) {
      resetForm();
    }
  }, [successMessage]);

  const isThereUser = () => {
    return Object.entries(userDetails).length > 0;
  };

  const setupUserRoles = () => {
    const uRoles = new Map();
    roles.forEach((role) => {
      uRoles.set(
        role.authority,
        user.roles.some((r) => r.authority === role.authority)
      );
    });
    setUserRoles(uRoles);
  };

  const resetForm = () => {
    if (!isThereUser()) {
      setUser({});
    } else {
      setEdit(!edit);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let selectedRoles = filterSelectedRoles();

    if (isThereUser()) {
      dispatch(userActions.editUser({ ...user, roles: selectedRoles }));
    } else {
      const found = selectedRoles.findIndex((r) => {
        return r.id === 1;
      });
      if (found === -1) {
        selectedRoles.push({ id: 1 });
      }

      dispatch(userActions.createUser({ ...user, roles: selectedRoles }));
    }
  };

  const filterSelectedRoles = () => {
    let selectedRoles = [];

    for (let [key, value] of userRoles.entries()) {
      if (value) {
        const matched = roles.find((role) => {
          return role.authority === key;
        });
        if (matched) selectedRoles.push({ id: matched.id });
      }
    }

    return selectedRoles;
  };

  const handleClickEdit = () => {
    setEdit(!edit);
    setChangePhoto(null);
  };

  const handleInputChange = (e) => {
    if (!edit) return;
    const {
      target: { name, value },
    } = e;

    let nValue = value;
    if (name === "enable") {
      nValue = value === "true" ? true : false;
    }

    setUser({
      ...user,
      [name]: nValue,
    });
  };

  const handleCheckRoles = (e) => {
    if (!edit) return;
    userRoles.set(e.target.name, e.target.checked);
    setUserRoles(new Map(userRoles));
  };

  const handleFileChange = (e) => {
    setChangePhoto(e.target.files[0]);
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
            <Box mr={2}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {isThereUser() && (
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
                <ErrorMessage />
                <Grid item xs={12} sm={3}>
                  <CardMedia>
                    <img
                      className={classes.userPhoto}
                      src={
                        isThereUser() && user.photo
                          ? `${config.baseUrl + uploadsEndPoint + user.photo}`
                          : userImg
                      }
                    />
                    {isCurrentUser && (
                      <Box>
                        <Box display="flex" flexDirection="row" mt={1}>
                          <Box>
                            <label htmlFor="upload-photo">
                              <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                disabled={!edit}
                                onChange={handleFileChange}
                              />
                              <Fab
                                color="secondary"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                              >
                                <AddIcon />
                              </Fab>
                            </label>
                          </Box>

                          <Box ml={1}>
                            <Typography>
                              {changePhoto ? changePhoto.name : null}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          {changePhoto && (
                            <Button
                              autoFocus
                              color="primary"
                              onClick={() => {
                                dispatch(
                                  userActions.changeUserPhoto(
                                    user.id,
                                    changePhoto
                                  )
                                );
                                setChangePhoto(null);
                              }}
                            >
                              Save
                            </Button>
                          )}
                        </Box>
                      </Box>
                    )}
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
                        disabled={isThereUser() ? true : false}
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
                        disabled={isThereUser() ? true : false}
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

                    {isThereUser() && (
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
                            disabled
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
                            disabled
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
                      <Box display="flex">
                        <Box marginRight={3}>
                          <strong>Roles:</strong>
                        </Box>
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
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Box display="flex" justifyContent="flex-end">
                        {edit ? (
                          <Button autoFocus color="primary" type="submit">
                            {isThereUser() ? "Save" : "Create"}
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

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    roles: state.role.roles,
    successMessage: state.alertInfo.successMessage,
  };
};

const connectUserDetailsPage = connect(mapStateToProps, null, null, {
  pure: false,
})(UserDetails);

export { connectUserDetailsPage as UserDetails };
