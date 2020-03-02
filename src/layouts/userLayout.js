import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Box,
  Menu,
  fade,
  InputBase
} from "@material-ui/core/";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GrainIcon from "@material-ui/icons/Grain";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";

import { withRouter, Route } from "react-router-dom";
import { RoleDialog } from "../components/users/role";
import { connect } from "react-redux";
import GroupIcon from "@material-ui/icons/Group";
import { loginActions } from "../redux/auth/auth.action";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbarBox: {
    width: "100%",
    paddingRight: "20px"
  },
  accountCircle: {
    fontSize: "40px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 150,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const UserLayout = ({
  component: Component,
  container,
  dispatch,
  loggedIn,
  history,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (!loggedIn) {
      history.push("/login");
    }
  }, [loggedIn]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRoleDialogOpen = () => {
    setRoleDialogOpen(!roleDialogOpen);
  };

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateSelected = (selectedIndex, redirectPath) => {
    setSelected(selectedIndex);
    history.push(redirectPath);
  };

  const handleClickLogOut = () => {
    dispatch(loginActions.logOut());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleClickLogOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                className={classes.toolbarBox}
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Box>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, {
                        [classes.hide]: open
                      })}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                  <Box className={classes.search}>
                    <Box className={classes.searchIcon}>
                      <SearchIcon />
                    </Box>
                    <InputBase
                      placeholder="Search for anything"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls=""
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle className={classes.accountCircle} />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <MenuItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </MenuItem>
              ))}

              <MenuItem
                button
                key="Courses"
                onClick={() => updateSelected(1, "/courses")}
                selected={selected === 1}
              >
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </MenuItem>

              <MenuItem
                button
                key="Users"
                onClick={() => updateSelected(0, "/users")}
                selected={selected === 0}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </MenuItem>

              <MenuItem button key="Roles" onClick={handleRoleDialogOpen}>
                <ListItemIcon>
                  <GrainIcon />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </MenuItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Component {...matchProps} />
          </main>
          {roleDialogOpen && (
            <RoleDialog
              open={roleDialogOpen}
              handleClose={handleRoleDialogOpen}
            />
          )}
          {renderMenu}>
        </div>
      )}
    />
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.authentication.loggedIn
  };
};

const connectLayoutPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false
  })(UserLayout)
);

export { connectLayoutPage as UserLayout };
