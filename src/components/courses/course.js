import React from "react";
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

const Course = ({ name, description, photo }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
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

export default Course;
