import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  makeStyles,
  fade,
  Button,
  Fab
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { NewCourse } from "./newCourse";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    justifyContent: "start",
    marginBottom: "30px"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    "&:hover": {
      // backgroundColor: fade(theme.palette.common.white, 0.25)
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
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  appBar: {
    // background: "white"
    // maxWidth: "350px"
    width: "100%"
  },
  libraryIcon: {
    fontSize: "1.9rem",
    cursor: "pointer",
    color: "#7cbb00"
  }
}));

const UsersBar = ({ setTerm }) => {
  const classes = useStyles();

  const [filter, setFilter] = useState("");
  const [openNewCourse, setOpenNewCourse] = useState(false);

  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setTerm(filter);
  };

  const handleClickCreateCourse = e => {
    setOpenNewCourse(true);
  };

  const handleOpenNewCourse = () => {
    setOpenNewCourse(!openNewCourse);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        {/* <AppBar position="static" className={classes.appBar}> */}
        <Toolbar>
          <div
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClickCreateCourse}
          >
            <Fab>
              <LibraryAddIcon className={classes.libraryIcon} />
            </Fab>
          </div>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={handleInputChange}
              value={filter}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
        {/* </AppBar> */}
      </form>
      {openNewCourse && (
        <NewCourse open={openNewCourse} handleClose={handleOpenNewCourse} />
      )}
    </div>
  );
};

export default UsersBar;
