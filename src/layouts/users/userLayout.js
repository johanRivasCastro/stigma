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
  InputBase,
  Avatar,
} from "@material-ui/core/";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import GrainIcon from "@material-ui/icons/Grain";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PersonIcon from "@material-ui/icons/Person";
import BorderColorIcon from "@material-ui/icons/BorderColor";

import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";

import { withRouter, Route } from "react-router-dom";
import { RoleDialog } from "../../components/role/role";
import { SubjectDialog } from "../../components/subject/subject";
import { connect } from "react-redux";
import GroupIcon from "@material-ui/icons/Group";
import { loginActions } from "../../redux/auth/auth.action";

import config from "../../config/config";
import { UserDetails } from "../../components/users/userDetails";
import { session } from "../../helpers/session";
import { SuccessMessage } from "../../components/common/succesMessage";
import { useStyles } from "./styles";

const UserLayout = ({
  component: Component,
  container,
  dispatch,
  loggedIn,
  history,
  users,
  currentUser,
  ...rest
}) => {
  const uploadsEndPoint = "uploads/";
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [subjectDialogOpen, setSubejctDialogOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(-1);
  const [openProfile, setOpenProfile] = useState(false);

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
  const handleProfileMenuOpen = (event) => {
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

  const handleClickSeeProfile = () => {
    setAnchorEl(null);
    setOpenProfile(true);
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
      <MenuItem onClick={handleClickSeeProfile}>Profile</MenuItem>
      <MenuItem onClick={handleClickLogOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
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
                        [classes.hide]: open,
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
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Box>
                </Box>
                <Box className={classes.accountCircle}>
                  <Avatar
                    onClick={handleProfileMenuOpen}
                    src={
                      currentUser && currentUser.photo
                        ? `${
                            config.baseUrl + uploadsEndPoint + currentUser.photo
                          }`
                        : null
                    }
                  />
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
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

              <MenuItem button key="Profile" onClick={handleClickSeeProfile}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>

              <MenuItem
                button
                key="Courses"
                onClick={() => updateSelected(1, "/courses")}
                selected={selected === 1}
              >
                <ListItemIcon>
                  <BorderColorIcon />
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

              <MenuItem
                button
                key="Subjects"
                onClick={() => setSubejctDialogOpen(true)}
              >
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Subjects" />
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
            <SuccessMessage />
          </main>
          {roleDialogOpen && (
            <RoleDialog
              open={roleDialogOpen}
              handleClose={handleRoleDialogOpen}
            />
          )}
          {subjectDialogOpen && (
            <SubjectDialog
              open={subjectDialogOpen}
              setOpen={setSubejctDialogOpen}
            />
          )}
          {renderMenu}>
          {openProfile && (
            <UserDetails
              open={openProfile}
              setOpen={setOpenProfile}
              userDetails={currentUser}
            />
          )}
        </div>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authentication.loggedIn,
    users: state.user.users,
    currentUser: state.authentication.currentUser,
  };
};

const connectLayoutPage = withRouter(
  connect(mapStateToProps, null, null, {
    pure: false,
  })(UserLayout)
);

export { connectLayoutPage as UserLayout };
