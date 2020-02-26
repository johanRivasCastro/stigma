import React, { useEffect, useState } from "react";

import {
  makeStyles,
  Box,
  CardMedia,
  Card,
  AppBar,
  Tab,
  Tabs,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Input,
  Fab
} from "@material-ui/core/";
import { connect } from "react-redux";
import { courseService } from "../../redux/course/course.service";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import AddIcon from "@material-ui/icons/Add";

import courseImg from "../../assets/course.png";

const useStyles = makeStyles(theme => ({
  detailsContainer: {
    margin: "50px auto",
    width: "95%",
    maxWidth: "1000px",
    color: "white"
  },
  card: {
    width: "100%",
    height: "100%"
  },
  coursePhoto: {
    width: "100%",
    maxHeight: "200px"
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  boxInfo: {
    width: "100%"
  }
}));

const CourseInfo = ({ classes, photo, courseInf }) => {
  const [courseInfo, setCourseInfo] = useState(courseInf);

  useEffect(() => {
    setCourseInfo(courseInf);
  }, [courseInf]);

  return (
    <Box className={classes.boxInfo}>
      <Grid container direction="row" spacing={3} justify="center">
        <Grid item xs={12} sm={3}>
          <CardMedia>
            <img
              className={classes.coursePhoto}
              src={photo ? photo : courseImg}
            />
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
              />
              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <AddIcon /> Change Photo
              </Fab>
            </label>
          </CardMedia>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                required
                name="name"
                label="Name"
                // onChange={handleInputChange}
                value={courseInfo.name || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box component="fieldset" borderColor="transparent">
                <Typography component="legend">Course Rating</Typography>
                <Rating
                  name="read-only"
                  value={courseInfo.rate || 0}
                  readOnly
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                multiline
                rows="4"
                required
                name="description"
                label="Description"
                value={courseInfo.description || ""}
                //   onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={true}
                      // onChange={handleInputChange}
                      value={true}
                      name="enable"
                    />
                  }
                  label="Active"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                required
                name="description"
                label="Created"
                value={courseInfo.created || ""}
                //   onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button autoFocus color="primary" type="submit">
            Save
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const CourseDetails = ({ courseId }) => {
  const classes = useStyles();

  const [courseInfo, setCourseInfo] = useState({});

  useEffect(() => {
    courseService.getById("courses", courseId).then(res => {
      if (res) {
        const { courseContents, ...courseInf } = res.data;
        setCourseInfo(courseInf);
      }
    });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.detailsContainer}>
      <Card className={classes.card}>
        {/* <CardMedia>
          <img
            className={classes.coursePhoto}
            src={course.photo ? course.photo : courseImg}
          />
        </CardMedia> */}

        <Box className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Course Info" {...a11yProps(0)} />
              <Tab label="Course content" {...a11yProps(1)} />
              <Tab label="Coments" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            {courseInfo && (
              <CourseInfo classes={classes} courseInf={courseInfo} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </Card>
    </Box>
  );
};

const connectUserDetailsPage = connect(null, null, null, {
  pure: false
})(CourseDetails);

export { connectUserDetailsPage as CourseDetails };
