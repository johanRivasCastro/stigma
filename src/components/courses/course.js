import React, { useEffect } from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";

import courseImg from "../../assets/course.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 300,
    margin: "10px"
  },
  coursePhoto: {
    width: "100%",
    height: "auto"
  }
});

const Course = ({ name, description, photo, id, history }) => {
  const classes = useStyles();

  const handleClickSeeCourseDetails = id => {
    history.push(`/courseDetails/${id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleClickSeeCourseDetails(id)}>
        <CardMedia>
          <img
            className={classes.coursePhoto}
            src={photo ? photo : courseImg}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// const mapStateToProps = state => {
//   return {
//     courseId: state.course.newCourseId
//   };
// };

const connectUserDetailsPage = withRouter(
  connect(null, null, null, {
    pure: false
  })(Course)
);

export { connectUserDetailsPage as Course };
