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
  Fab,
} from "@material-ui/core/";
import { connect } from "react-redux";
import { courseService } from "../../../redux/course/course.service";
import PropTypes from "prop-types";
import CourseInfo from "./courseInfo";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    margin: "50px auto",
    width: "95%",
    maxWidth: "1100px",
    color: "white",
  },
  card: {
    width: "100%",
    height: "100%",
  },
  coursePhoto: {
    width: "100%",
    maxHeight: "200px",
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  boxInfo: {
    width: "100%",
  },
}));

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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CourseDetails = ({ courseId }) => {
  const classes = useStyles();

  const [courseInfo, setCourseInfo] = useState({});

  useEffect(() => {
    courseService.getById("courses", courseId).then((res) => {
      if (res.successful) {
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
  pure: false,
})(CourseDetails);

export { connectUserDetailsPage as CourseDetails };
