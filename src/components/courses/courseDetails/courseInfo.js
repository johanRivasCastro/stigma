import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import AddIcon from "@material-ui/icons/Add";
import {
  Box,
  CardMedia,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Fab
} from "@material-ui/core/";

import courseImg from "../../../assets/course.png";

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

export default CourseInfo;
