import React, { useState } from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core/";

import config from "../../config/config";
import { UserDetails } from "../users/userDetails";

import userImg from "../../assets/user.jfif";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: "20px",
  },
  media: {
    height: 100,
  },
  gridItem: {
    maxWidth: 345,
  },
  icon: {
    fontSize: "100px",
    color: "#3f51b5",
  },
  userPhoto: {
    width: "100%",
    height: "110px",
    objectFit: "cover",
    objectPosition: "50% 50%",
  },
});

const User = ({ user }) => {
  const classes = useStyles();
  const uploadsEndPoint = "uploads/";

  const [openDetails, setOpenDetails] = useState(false);

  return (
    <Grid item xs={12} sm={4} className={classes.gridItem} m={2}>
      <Card className={classes.card}>
        <CardActionArea onClick={() => setOpenDetails(true)}>
          <Grid container>
            <Grid item xs={12} sm={4}>
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
            <Grid item sm={8}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.email}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      {openDetails ? (
        <UserDetails
          open={openDetails}
          setOpen={setOpenDetails}
          userDetails={user}
        />
      ) : null}
    </Grid>
  );
};

export default User;
